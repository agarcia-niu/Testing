import { getDatabase } from '../database';
import { Product } from '../../../core/types/entities';

export const ProductRepository = {
  async findAll(): Promise<Product[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<Record<string, unknown>>(
      'SELECT * FROM products ORDER BY name ASC'
    );
    return rows.map(mapRowToProduct);
  },

  async findById(id: string): Promise<Product | null> {
    const db = await getDatabase();
    const row = await db.getFirstAsync<Record<string, unknown>>(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    return row ? mapRowToProduct(row) : null;
  },

  async upsert(product: Product): Promise<void> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    await db.runAsync(
      `INSERT OR REPLACE INTO products
       (id, name, price, stock_quantity, category, image_url, data_json, updated_at, last_sync_at, status_local)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [product.id, product.name, product.price, product.stockQuantity,
       product.category, product.imageUrl, product.dataJson,
       product.updatedAt, now, 'synced']
    );
  },

  async upsertBatch(products: Product[]): Promise<void> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    await db.withTransactionAsync(async () => {
      for (const product of products) {
        await db.runAsync(
          `INSERT OR REPLACE INTO products
           (id, name, price, stock_quantity, category, image_url, data_json, updated_at, last_sync_at, status_local)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [product.id, product.name, product.price, product.stockQuantity,
           product.category, product.imageUrl, product.dataJson,
           product.updatedAt, now, 'synced']
        );
      }
    });
  },

  async getLastSyncAt(): Promise<string | null> {
    const db = await getDatabase();
    const result = await db.getFirstAsync<{ value: string }>(
      `SELECT value FROM sync_metadata WHERE key = 'products_last_sync_at'`
    );
    return result?.value ?? null;
  },

  async setLastSyncAt(timestamp: string): Promise<void> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    await db.runAsync(
      `INSERT OR REPLACE INTO sync_metadata (key, value, updated_at) VALUES ('products_last_sync_at', ?, ?)`,
      [timestamp, now]
    );
  },
};

function mapRowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row['id'] as string,
    name: row['name'] as string,
    price: row['price'] as number,
    stockQuantity: row['stock_quantity'] as number,
    category: (row['category'] as string) ?? '',
    imageUrl: (row['image_url'] as string) ?? '',
    dataJson: (row['data_json'] as string) ?? '{}',
    updatedAt: row['updated_at'] as string,
    lastSyncAt: (row['last_sync_at'] as string) ?? null,
    statusLocal: (row['status_local'] as string) ?? 'synced',
  };
}
