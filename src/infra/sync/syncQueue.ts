import { SyncQueueRepository } from '../storage/repositories/syncQueueRepository';
import { SyncJob } from '../../core/types/entities';

export const SyncQueue = {
  async enqueue(jobType: string, payload: unknown): Promise<SyncJob> {
    return SyncQueueRepository.enqueue(jobType, payload);
  },

  async getPendingJobs(): Promise<SyncJob[]> {
    return SyncQueueRepository.getPending();
  },

  async markConfirmed(jobId: string): Promise<void> {
    await SyncQueueRepository.updateStatus(jobId, 'CONFIRMED');
  },

  async markFailed(jobId: string, error: string, retryable: boolean): Promise<void> {
    const job = await SyncQueueRepository.getByJobId(jobId);
    if (!job) return;

    if (retryable && job.attempts < job.maxAttempts) {
      await SyncQueueRepository.updateStatus(jobId, 'FAILED_RETRYABLE', error);
      // After a delay, move back to PENDING for retry
      setTimeout(async () => {
        await SyncQueueRepository.updateStatus(jobId, 'PENDING');
      }, getRetryDelay(job.attempts));
    } else {
      await SyncQueueRepository.updateStatus(jobId, 'FAILED_FINAL', error);
    }
  },

  async recoverFromCrash(): Promise<number> {
    return SyncQueueRepository.recoverStuckJobs();
  },
};

function getRetryDelay(attempt: number): number {
  const delays = [2000, 4000, 8000];
  return delays[Math.min(attempt, delays.length - 1)] ?? 8000;
}
