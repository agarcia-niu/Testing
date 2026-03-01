export type ErrorType = 'NETWORK' | 'TIMEOUT' | 'AUTH' | 'CLIENT' | 'SERVER' | 'UNKNOWN';

export interface AppError {
  code: string;
  type: ErrorType;
  message: string;
  userMessage: string;
  cta: string;
  statusCode?: number;
  raw?: unknown;
}

export interface ApiResponse<T> {
  ok: true;
  data: T;
  status: number;
}

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: AppError };
