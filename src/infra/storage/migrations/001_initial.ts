import * as SQLite from 'expo-sqlite';

export async function initialMigration(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock_quantity INTEGER DEFAULT 0,
      category TEXT,
      image_url TEXT,
      data_json TEXT,
      updated_at TEXT NOT NULL,
      last_sync_at TEXT,
      status_local TEXT DEFAULT 'synced'
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      price_snapshot REAL NOT NULL,
      added_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      remote_id TEXT,
      client_order_id TEXT UNIQUE NOT NULL,
      status_local TEXT NOT NULL DEFAULT 'DRAFT',
      status_remote TEXT,
      items_json TEXT NOT NULL,
      subtotal REAL,
      discount REAL,
      shipping REAL,
      total REAL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      last_sync_at TEXT
    );

    CREATE TABLE IF NOT EXISTS sync_queue (
      id TEXT PRIMARY KEY,
      job_type TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'PENDING',
      attempts INTEGER DEFAULT 0,
      max_attempts INTEGER DEFAULT 3,
      last_attempt_at TEXT,
      error_message TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS telemetry_events (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      event_name TEXT NOT NULL,
      data_json TEXT,
      created_at TEXT NOT NULL,
      flushed INTEGER DEFAULT 0
    );
  `);
}
