import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../storage/database';
import { SessionManager } from './sessionManager';
import { Config } from '../../core/config';

let flushIntervalId: ReturnType<typeof setInterval> | null = null;

export const TelemetryService = {
  async track(eventName: string, data?: Record<string, unknown>): Promise<void> {
    if (!Config.telemetry.enabled) return;

    const db = await getDatabase();
    const id = uuidv4();
    const sessionId = SessionManager.getSessionId();
    const now = new Date().toISOString();
    const dataJson = data ? JSON.stringify(data) : null;

    await db.runAsync(
      `INSERT INTO telemetry_events (id, session_id, event_name, data_json, created_at, flushed)
       VALUES (?, ?, ?, ?, ?, 0)`,
      [id, sessionId, eventName, dataJson, now]
    );
  },

  async flush(): Promise<number> {
    const db = await getDatabase();
    const events = await db.getAllAsync<{ id: string; event_name: string; data_json: string | null }>(
      `SELECT id, event_name, data_json FROM telemetry_events WHERE flushed = 0 LIMIT ?`,
      [Config.telemetry.maxBatchSize]
    );

    if (events.length === 0) return 0;

    // In Phase 0, just mark as flushed (no real backend)
    const ids = events.map(e => `'${e.id}'`).join(',');
    await db.runAsync(
      `UPDATE telemetry_events SET flushed = 1 WHERE id IN (${ids})`
    );

    if (__DEV__) {
      console.log(`[Telemetry] Flushed ${events.length} events`);
    }

    return events.length;
  },

  startAutoFlush(): void {
    if (flushIntervalId) return;
    flushIntervalId = setInterval(() => {
      TelemetryService.flush().catch(console.error);
    }, Config.telemetry.flushInterval);
  },

  stopAutoFlush(): void {
    if (flushIntervalId) {
      clearInterval(flushIntervalId);
      flushIntervalId = null;
    }
  },
};
