/**
 * Web fallback for expo-sqlite using localStorage.
 * Simulates a basic SQL-like interface backed by JSON collections.
 * Only for development/preview purposes — NOT for production.
 */

type Row = Record<string, unknown>;

function getCollection(table: string): Row[] {
  const raw = localStorage.getItem(`db_${table}`);
  return raw ? JSON.parse(raw) : [];
}

function setCollection(table: string, rows: Row[]): void {
  localStorage.setItem(`db_${table}`, JSON.stringify(rows));
}

function parseSimpleWhere(sql: string, params: unknown[]): { table: string; key: string; value: unknown } | null {
  const match = sql.match(/FROM\s+(\w+)\s+WHERE\s+(\w+)\s*=\s*\?/i);
  if (match) {
    return { table: match[1], key: match[2], value: params[0] };
  }
  return null;
}

function parseTable(sql: string): string | null {
  const match = sql.match(/(?:FROM|INTO|UPDATE)\s+(\w+)/i);
  return match ? match[1] : null;
}

function parseOrderAndLimit(sql: string): { orderBy?: string; orderDir?: string; limit?: number } {
  const orderMatch = sql.match(/ORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i);
  const limitMatch = sql.match(/LIMIT\s+(\d+|\?)/i);
  return {
    orderBy: orderMatch?.[1],
    orderDir: orderMatch?.[2]?.toUpperCase() ?? 'ASC',
    limit: limitMatch ? (limitMatch[1] === '?' ? undefined : parseInt(limitMatch[1], 10)) : undefined,
  };
}

function sortRows(rows: Row[], orderBy?: string, orderDir?: string): Row[] {
  if (!orderBy) return rows;
  return [...rows].sort((a, b) => {
    const va = a[orderBy] as string ?? '';
    const vb = b[orderBy] as string ?? '';
    const cmp = va < vb ? -1 : va > vb ? 1 : 0;
    return orderDir === 'DESC' ? -cmp : cmp;
  });
}

export interface WebSQLiteDatabase {
  getAllAsync<T>(sql: string, params?: unknown[]): Promise<T[]>;
  getFirstAsync<T>(sql: string, params?: unknown[]): Promise<T | null>;
  runAsync(sql: string, params?: unknown[]): Promise<{ changes: number }>;
  execAsync(sql: string): Promise<void>;
  withTransactionAsync(fn: () => Promise<void>): Promise<void>;
  closeAsync(): Promise<void>;
}

export function createWebDatabase(): WebSQLiteDatabase {
  return {
    async getAllAsync<T>(sql: string, params: unknown[] = []): Promise<T[]> {
      const table = parseTable(sql);
      if (!table) return [];

      let rows = getCollection(table);
      const where = parseSimpleWhere(sql, params);
      if (where) {
        rows = rows.filter(r => r[where.key] === where.value);
      }
      // Handle status filter in WHERE
      const statusMatch = sql.match(/WHERE\s+status\s*=\s*'(\w+)'/i);
      if (statusMatch) {
        rows = rows.filter(r => r['status'] === statusMatch[1]);
      }

      const { orderBy, orderDir, limit } = parseOrderAndLimit(sql);
      rows = sortRows(rows, orderBy, orderDir);

      // Resolve LIMIT ? from params
      const limitParamMatch = sql.match(/LIMIT\s+\?/i);
      const finalLimit = limit ?? (limitParamMatch ? (params[params.length - 1] as number) : undefined);
      if (finalLimit) {
        rows = rows.slice(0, finalLimit);
      }

      return rows as T[];
    },

    async getFirstAsync<T>(sql: string, params: unknown[] = []): Promise<T | null> {
      const rows = await this.getAllAsync<T>(sql, params);
      return rows[0] ?? null;
    },

    async runAsync(sql: string, params: unknown[] = []): Promise<{ changes: number }> {
      const upperSql = sql.trim().toUpperCase();
      const table = parseTable(sql);
      if (!table) return { changes: 0 };

      if (upperSql.startsWith('INSERT')) {
        const rows = getCollection(table);
        // Extract column names from INSERT
        const colMatch = sql.match(/\(([^)]+)\)\s*VALUES/i);
        if (colMatch) {
          const cols = colMatch[1].split(',').map(c => c.trim());
          const row: Row = {};
          cols.forEach((col, i) => {
            row[col] = params[i] ?? null;
          });
          // OR REPLACE: remove existing with same primary key (id or key)
          if (sql.toUpperCase().includes('OR REPLACE')) {
            const pkCol = cols[0];
            const pkVal = params[0];
            const filtered = rows.filter(r => r[pkCol] !== pkVal);
            filtered.push(row);
            setCollection(table, filtered);
          } else {
            rows.push(row);
            setCollection(table, rows);
          }
        }
        return { changes: 1 };
      }

      if (upperSql.startsWith('UPDATE')) {
        const rows = getCollection(table);
        // Parse SET clause
        const setMatch = sql.match(/SET\s+(.+?)\s+WHERE/i);
        const whereMatch = sql.match(/WHERE\s+(\w+)\s*=\s*\?/i);

        if (setMatch && whereMatch) {
          const setClauses = setMatch[1].split(',').map(s => s.trim());
          const whereCol = whereMatch[1];

          // Count params used in SET
          let paramIdx = 0;
          const updates: { col: string; value: unknown }[] = [];
          for (const clause of setClauses) {
            const eqMatch = clause.match(/(\w+)\s*=\s*(.*)/);
            if (eqMatch) {
              const col = eqMatch[1];
              const valExpr = eqMatch[2].trim();
              if (valExpr === '?') {
                updates.push({ col, value: params[paramIdx++] });
              } else if (valExpr.includes('+ 1')) {
                updates.push({ col, value: 'INCREMENT' });
              } else {
                updates.push({ col, value: valExpr.replace(/'/g, '') });
              }
            }
          }

          const whereVal = params[paramIdx];
          // Handle status = 'VALUE' in WHERE (no param)
          const statusWhereMatch = sql.match(/WHERE\s+status\s*=\s*'(\w+)'/i);

          let changes = 0;
          for (const row of rows) {
            let match = false;
            if (statusWhereMatch) {
              match = row['status'] === statusWhereMatch[1];
            } else {
              match = row[whereCol] === whereVal;
            }
            if (match) {
              for (const u of updates) {
                if (u.value === 'INCREMENT') {
                  row[u.col] = ((row[u.col] as number) ?? 0) + 1;
                } else {
                  row[u.col] = u.value;
                }
              }
              changes++;
            }
          }
          setCollection(table, rows);
          return { changes };
        }
        return { changes: 0 };
      }

      if (upperSql.startsWith('DELETE')) {
        const rows = getCollection(table);
        const where = parseSimpleWhere(sql, params);
        const statusMatch = sql.match(/WHERE\s+status_local\s*=\s*'(\w+)'/i)
          || sql.match(/WHERE\s+status\s*=\s*'(\w+)'/i);

        if (where) {
          const filtered = rows.filter(r => r[where.key] !== where.value);
          const changes = rows.length - filtered.length;
          setCollection(table, filtered);
          return { changes };
        } else if (statusMatch) {
          const col = sql.includes('status_local') ? 'status_local' : 'status';
          const filtered = rows.filter(r => r[col] !== statusMatch[1]);
          const changes = rows.length - filtered.length;
          setCollection(table, filtered);
          return { changes };
        } else if (!sql.includes('WHERE')) {
          // DELETE all
          const changes = rows.length;
          setCollection(table, []);
          return { changes };
        }
        return { changes: 0 };
      }

      return { changes: 0 };
    },

    async execAsync(_sql: string): Promise<void> {
      // CREATE TABLE and other DDL are no-ops on web
    },

    async withTransactionAsync(fn: () => Promise<void>): Promise<void> {
      await fn();
    },

    async closeAsync(): Promise<void> {
      // no-op
    },
  };
}
