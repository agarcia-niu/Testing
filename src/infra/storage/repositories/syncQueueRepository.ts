import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../database';
import { SyncJob, SyncJobStatus } from '../../../core/types/entities';

export const SyncQueueRepository = {
  async enqueue(jobType: string, payload: unknown): Promise<SyncJob> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    const id = uuidv4();
    const payloadJson = JSON.stringify(payload);
    await db.runAsync(
      `INSERT INTO sync_queue (id, job_type, payload_json, status, attempts, max_attempts, created_at, updated_at)
       VALUES (?, ?, ?, 'PENDING', 0, 3, ?, ?)`,
      [id, jobType, payloadJson, now, now]
    );
    return {
      id, jobType, payloadJson, status: 'PENDING',
      attempts: 0, maxAttempts: 3,
      lastAttemptAt: null, errorMessage: null,
      createdAt: now, updatedAt: now,
    };
  },

  async getPending(): Promise<SyncJob[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<Record<string, unknown>>(
      `SELECT * FROM sync_queue WHERE status = 'PENDING' ORDER BY created_at ASC`
    );
    return rows.map(mapRowToSyncJob);
  },

  async updateStatus(id: string, status: SyncJobStatus, errorMessage?: string): Promise<void> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    await db.runAsync(
      `UPDATE sync_queue SET status = ?, last_attempt_at = ?, error_message = ?,
       attempts = attempts + 1, updated_at = ? WHERE id = ?`,
      [status, now, errorMessage ?? null, now, id]
    );
  },

  async getByJobId(id: string): Promise<SyncJob | null> {
    const db = await getDatabase();
    const row = await db.getFirstAsync<Record<string, unknown>>(
      'SELECT * FROM sync_queue WHERE id = ?', [id]
    );
    return row ? mapRowToSyncJob(row) : null;
  },

  async recoverStuckJobs(): Promise<number> {
    const db = await getDatabase();
    const result = await db.runAsync(
      `UPDATE sync_queue SET status = 'PENDING', updated_at = ? WHERE status = 'SENDING'`,
      [new Date().toISOString()]
    );
    return result.changes;
  },

  async clearConfirmed(): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM sync_queue WHERE status = 'CONFIRMED'`);
  },
};

function mapRowToSyncJob(row: Record<string, unknown>): SyncJob {
  return {
    id: row['id'] as string,
    jobType: row['job_type'] as string,
    payloadJson: row['payload_json'] as string,
    status: row['status'] as SyncJobStatus,
    attempts: row['attempts'] as number,
    maxAttempts: row['max_attempts'] as number,
    lastAttemptAt: (row['last_attempt_at'] as string) ?? null,
    errorMessage: (row['error_message'] as string) ?? null,
    createdAt: row['created_at'] as string,
    updatedAt: row['updated_at'] as string,
  };
}
