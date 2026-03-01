import { AppError } from '../../core/types/api';

export interface HttpConfig {
  baseUrl: string;
  timeout: number;
  getToken: () => Promise<string | null>;
}

export interface HttpRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface HttpResponse<T> {
  ok: true;
  data: T;
  status: number;
}

export type HttpResult<T> =
  | HttpResponse<T>
  | { ok: false; error: AppError };
