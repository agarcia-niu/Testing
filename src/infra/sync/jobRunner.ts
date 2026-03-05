import { SyncQueueRepository } from '../storage/repositories/syncQueueRepository';
import { SyncQueue } from './syncQueue';
import { JobProcessor } from './types';
import { Config } from '../../core/config';

let isRunning = false;
let intervalId: ReturnType<typeof setInterval> | null = null;

const processors: Map<string, JobProcessor> = new Map();

export const JobRunner = {
  registerProcessor(jobType: string, processor: JobProcessor): void {
    processors.set(jobType, processor);
  },

  async processNext(): Promise<boolean> {
    const pendingJobs = await SyncQueue.getPendingJobs();
    if (pendingJobs.length === 0) return false;

    const job = pendingJobs[0];
    if (!job) return false;

    const processor = processors.get(job.jobType);
    if (!processor) {
      await SyncQueue.markFailed(job.id, `No processor for job type: ${job.jobType}`, false);
      return true;
    }

    await SyncQueueRepository.updateStatus(job.id, 'SENDING');

    try {
      const payload = JSON.parse(job.payloadJson);
      const result = await processor({ jobType: job.jobType, payload });

      if (result.success) {
        await SyncQueue.markConfirmed(job.id);
      } else {
        await SyncQueue.markFailed(job.id, result.error ?? 'Unknown error', result.retryable);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown processing error';
      await SyncQueue.markFailed(job.id, errorMsg, true);
    }

    return true;
  },

  start(): void {
    if (isRunning) return;
    isRunning = true;

    // Recover stuck jobs from previous crash
    SyncQueue.recoverFromCrash().then((recovered) => {
      if (recovered > 0) {
        console.log(`[JobRunner] Recovered ${recovered} stuck jobs`);
      }
    });

    intervalId = setInterval(async () => {
      if (!isRunning) return;
      try {
        let hasMore = true;
        while (hasMore && isRunning) {
          hasMore = await JobRunner.processNext();
        }
      } catch (err) {
        console.error('[JobRunner] Error in processing loop:', err);
      }
    }, Config.sync.processingInterval);
  },

  stop(): void {
    isRunning = false;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
};

// Register dummy processor for testing
JobRunner.registerProcessor('DUMMY_JOB', async ({ payload }) => {
  console.log('[JobRunner] Processing DUMMY_JOB:', payload);
  return { success: true, retryable: false };
});
