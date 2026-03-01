import { AppError } from '../../core/types/api';
import { ErrorCatalog, createAppError } from '../../core/constants/errors';
import { Config } from '../../core/config';
import { SecureStorage } from '../security/secureStorage';
import { HttpRequestOptions, HttpResult } from './types';

function classifyHttpError(status: number): AppError {
  if (status === 401) return createAppError('ERR_AUTH_EXPIRED', { statusCode: status });
  if (status === 403) return createAppError('ERR_AUTH_FORBIDDEN', { statusCode: status });
  if (status === 404) return createAppError('ERR_NOT_FOUND', { statusCode: status });
  if (status === 422) return createAppError('ERR_VALIDATION', { statusCode: status });
  if (status >= 400 && status < 500) {
    return createAppError('ERR_VALIDATION', { statusCode: status });
  }
  if (status === 503) return createAppError('ERR_SERVER_DOWN', { statusCode: status });
  if (status >= 500) return createAppError('ERR_SERVER_500', { statusCode: status });
  return createAppError('ERR_SERVER_500', { statusCode: status });
}

export async function httpRequest<T>(options: HttpRequestOptions): Promise<HttpResult<T>> {
  const { method, path, body, headers = {}, timeout } = options;
  const requestTimeout = timeout ?? Config.api.timeout;
  const url = `${Config.api.baseUrl}${path}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeout);

  try {
    const token = await SecureStorage.getToken();
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    };

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = classifyHttpError(response.status);
      try {
        const errorBody = await response.json();
        error.raw = errorBody;
      } catch {
        // Response body is not JSON, ignore
      }
      return { ok: false, error };
    }

    const data = (await response.json()) as T;
    return { ok: true, data, status: response.status };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof DOMException && err.name === 'AbortError') {
      return { ok: false, error: createAppError('ERR_TIMEOUT') };
    }

    if (err instanceof TypeError) {
      return { ok: false, error: createAppError('ERR_NETWORK', { raw: err }) };
    }

    return {
      ok: false,
      error: createAppError('ERR_NETWORK', {
        message: err instanceof Error ? err.message : 'Unknown error',
        raw: err,
      }),
    };
  }
}

export const HttpClient = {
  get<T>(path: string, options?: Partial<HttpRequestOptions>): Promise<HttpResult<T>> {
    return httpRequest<T>({ method: 'GET', path, ...options });
  },

  post<T>(path: string, body?: unknown, options?: Partial<HttpRequestOptions>): Promise<HttpResult<T>> {
    return httpRequest<T>({ method: 'POST', path, body, ...options });
  },

  put<T>(path: string, body?: unknown, options?: Partial<HttpRequestOptions>): Promise<HttpResult<T>> {
    return httpRequest<T>({ method: 'PUT', path, body, ...options });
  },

  delete<T>(path: string, options?: Partial<HttpRequestOptions>): Promise<HttpResult<T>> {
    return httpRequest<T>({ method: 'DELETE', path, ...options });
  },
};
