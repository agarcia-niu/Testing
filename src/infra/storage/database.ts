import * as SQLite from 'expo-sqlite';
import { Config } from '../../core/config';
import { initialMigration } from './migrations/001_initial';

let db: SQLite.SQLiteDatabase | null = null;

const migrations = [
  { version: 1, migrate: initialMigration },
];

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync(Config.storage.dbName);
  await runMigrations(db);
  return db;
}

async function runMigrations(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS sync_metadata (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  const result = await database.getFirstAsync<{ value: string }>(
    `SELECT value FROM sync_metadata WHERE key = 'db_version'`
  );
  const currentVersion = result ? parseInt(result.value, 10) : 0;

  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      await migration.migrate(database);
      const now = new Date().toISOString();
      await database.runAsync(
        `INSERT OR REPLACE INTO sync_metadata (key, value, updated_at) VALUES ('db_version', ?, ?)`,
        [migration.version.toString(), now]
      );
    }
  }
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
