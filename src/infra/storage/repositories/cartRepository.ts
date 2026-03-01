import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../database';
import { CartItem } from '../../../core/types/entities';

export const CartRepository = {
  async getItems(): Promise<CartItem[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<Record<string, unknown>>(
      'SELECT * FROM cart_items ORDER BY added_at DESC'
    );
    return rows.map(mapRowToCartItem);
  },

  async addItem(productId: string, quantity: number, priceSnapshot: number): Promise<CartItem> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    const id = uuidv4();
    await db.runAsync(
      `INSERT INTO cart_items (id, product_id, quantity, price_snapshot, added_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, productId, quantity, priceSnapshot, now, now]
    );
    return { id, productId, quantity, priceSnapshot, addedAt: now, updatedAt: now };
  },

  async updateQuantity(id: string, quantity: number): Promise<void> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    await db.runAsync(
      'UPDATE cart_items SET quantity = ?, updated_at = ? WHERE id = ?',
      [quantity, now, id]
    );
  },

  async removeItem(id: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM cart_items WHERE id = ?', [id]);
  },

  async clear(): Promise<void> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM cart_items');
  },
};

function mapRowToCartItem(row: Record<string, unknown>): CartItem {
  return {
    id: row['id'] as string,
    productId: row['product_id'] as string,
    quantity: row['quantity'] as number,
    priceSnapshot: row['price_snapshot'] as number,
    addedAt: row['added_at'] as string,
    updatedAt: row['updated_at'] as string,
  };
}
