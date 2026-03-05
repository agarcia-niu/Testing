import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import { Config } from '../../core/config';
import { initialMigration } from './migrations/001_initial';
import { createWebDatabase, WebSQLiteDatabase } from './webDatabase';

type Database = SQLite.SQLiteDatabase | WebSQLiteDatabase;

let db: Database | null = null;

const migrations = [
  { version: 1, migrate: initialMigration },
];

export async function getDatabase(): Promise<Database> {
  if (db) return db;

  if (Platform.OS === 'web') {
    db = createWebDatabase();
    return db;
  }

  const sqliteDb = await SQLite.openDatabaseAsync(Config.storage.dbName);
  await runMigrations(sqliteDb);
  db = sqliteDb;
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
