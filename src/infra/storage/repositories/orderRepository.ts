import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../database';
import { Order, OrderLocalStatus } from '../../../core/types/entities';

export const OrderRepository = {
  async create(params: {
    clientOrderId: string;
    itemsJson: string;
    subtotal?: number;
    discount?: number;
    shipping?: number;
    total?: number;
  }): Promise<Order> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    const id = uuidv4();
    await db.runAsync(
      `INSERT INTO orders (id, client_order_id, status_local, items_json, subtotal, discount, shipping, total, created_at, updated_at)
       VALUES (?, ?, 'DRAFT', ?, ?, ?, ?, ?, ?, ?)`,
      [id, params.clientOrderId, params.itemsJson,
       params.subtotal ?? null, params.discount ?? null,
       params.shipping ?? null, params.total ?? null, now, now]
    );
    return {
      id, remoteId: null, clientOrderId: params.clientOrderId,
      statusLocal: 'DRAFT', statusRemote: null, itemsJson: params.itemsJson,
      subtotal: params.subtotal ?? null, discount: params.discount ?? null,
      shipping: params.shipping ?? null, total: params.total ?? null,
      createdAt: now, updatedAt: now, lastSyncAt: null,
    };
  },

  async findById(id: string): Promise<Order | null> {
    const db = await getDatabase();
    const row = await db.getFirstAsync<Record<string, unknown>>(
      'SELECT * FROM orders WHERE id = ?', [id]
    );
    return row ? mapRowToOrder(row) : null;
  },

  async findByClientOrderId(clientOrderId: string): Promise<Order | null> {
    const db = await getDatabase();
    const row = await db.getFirstAsync<Record<string, unknown>>(
      'SELECT * FROM orders WHERE client_order_id = ?', [clientOrderId]
    );
    return row ? mapRowToOrder(row) : null;
  },

  async updateStatus(id: string, statusLocal: OrderLocalStatus, remoteId?: string): Promise<void> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    if (remoteId) {
      await db.runAsync(
        'UPDATE orders SET status_local = ?, remote_id = ?, updated_at = ? WHERE id = ?',
        [statusLocal, remoteId, now, id]
      );
    } else {
      await db.runAsync(
        'UPDATE orders SET status_local = ?, updated_at = ? WHERE id = ?',
        [statusLocal, now, id]
      );
    }
  },

  async getRecent(limit: number = 20): Promise<Order[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<Record<string, unknown>>(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT ?', [limit]
    );
    return rows.map(mapRowToOrder);
  },

  async clearDrafts(): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM orders WHERE status_local = 'DRAFT'`);
  },
};

function mapRowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row['id'] as string,
    remoteId: (row['remote_id'] as string) ?? null,
    clientOrderId: row['client_order_id'] as string,
    statusLocal: row['status_local'] as OrderLocalStatus,
    statusRemote: (row['status_remote'] as string) ?? null,
    itemsJson: row['items_json'] as string,
    subtotal: (row['subtotal'] as number) ?? null,
    discount: (row['discount'] as number) ?? null,
    shipping: (row['shipping'] as number) ?? null,
    total: (row['total'] as number) ?? null,
    createdAt: row['created_at'] as string,
    updatedAt: row['updated_at'] as string,
    lastSyncAt: (row['last_sync_at'] as string) ?? null,
  };
}
