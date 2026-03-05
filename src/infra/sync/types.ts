export type { SyncJob, SyncJobStatus } from '../../core/types/entities';

export interface JobProcessor {
  (job: { jobType: string; payload: unknown }): Promise<JobResult>;
}

export interface JobResult {
  success: boolean;
  retryable: boolean;
  error?: string;
}
