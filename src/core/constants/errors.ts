import { AppError, ErrorType } from '../types/api';

type ErrorCatalogEntry = Omit<AppError, 'raw' | 'statusCode'>;

export const ErrorCatalog: Record<string, ErrorCatalogEntry> = {
  ERR_NETWORK: {
    code: 'ERR_NETWORK',
    type: 'NETWORK',
    message: 'Network error',
    userMessage: 'No hay conexión a internet',
    cta: 'Revisar conexión',
  },
  ERR_TIMEOUT: {
    code: 'ERR_TIMEOUT',
    type: 'TIMEOUT',
    message: 'Request timeout',
    userMessage: 'La operación tardó demasiado',
    cta: 'Reintentar',
  },
  ERR_SERVER_DOWN: {
    code: 'ERR_SERVER_DOWN',
    type: 'SERVER',
    message: 'Service unavailable',
    userMessage: 'El servicio no está disponible',
    cta: 'Reintentar más tarde',
  },
  ERR_AUTH_INVALID: {
    code: 'ERR_AUTH_INVALID',
    type: 'AUTH',
    message: 'Invalid credentials',
    userMessage: 'Usuario o contraseña incorrectos',
    cta: 'Verificar datos',
  },
  ERR_AUTH_EXPIRED: {
    code: 'ERR_AUTH_EXPIRED',
    type: 'AUTH',
    message: 'Token expired',
    userMessage: 'Tu sesión ha expirado',
    cta: 'Iniciar sesión',
  },
  ERR_AUTH_FORBIDDEN: {
    code: 'ERR_AUTH_FORBIDDEN',
    type: 'AUTH',
    message: 'Forbidden',
    userMessage: 'No tienes permisos para esta acción',
    cta: 'Contactar soporte',
  },
  ERR_NOT_FOUND: {
    code: 'ERR_NOT_FOUND',
    type: 'CLIENT',
    message: 'Not found',
    userMessage: 'El recurso no fue encontrado',
    cta: 'Volver',
  },
  ERR_VALIDATION: {
    code: 'ERR_VALIDATION',
    type: 'CLIENT',
    message: 'Validation error',
    userMessage: 'Datos incorrectos, verifica la información',
    cta: 'Corregir datos',
  },
  ERR_SERVER_500: {
    code: 'ERR_SERVER_500',
    type: 'SERVER',
    message: 'Internal server error',
    userMessage: 'Ocurrió un error inesperado',
    cta: 'Reintentar',
  },
  ERR_SERVER_DEGRADED: {
    code: 'ERR_SERVER_DEGRADED',
    type: 'SERVER',
    message: 'System degraded',
    userMessage: 'El sistema está presentando problemas',
    cta: 'Reintentar más tarde',
  },
  ERR_STOCK_UNAVAILABLE: {
    code: 'ERR_STOCK_UNAVAILABLE',
    type: 'CLIENT',
    message: 'Stock unavailable',
    userMessage: 'Producto sin stock disponible',
    cta: 'Ajustar / Quitar / Reintentar',
  },
  ERR_QUOTE_FAILED: {
    code: 'ERR_QUOTE_FAILED',
    type: 'SERVER',
    message: 'Quote calculation failed',
    userMessage: 'No se pudo calcular el total',
    cta: 'Reintentar',
  },
  ERR_ORDER_FAILED: {
    code: 'ERR_ORDER_FAILED',
    type: 'SERVER',
    message: 'Order creation failed',
    userMessage: 'No se pudo crear el pedido',
    cta: 'Reintentar',
  },
  ERR_SHIPPING_FAILED: {
    code: 'ERR_SHIPPING_FAILED',
    type: 'SERVER',
    message: 'Shipping calculation failed',
    userMessage: 'No se pudo calcular el envío',
    cta: 'Verificar dirección',
  },
};

export function createAppError(
  code: string,
  overrides?: Partial<AppError>
): AppError {
  const entry = ErrorCatalog[code];
  if (entry) {
    return { ...entry, ...overrides };
  }
  return {
    code: 'ERR_UNKNOWN',
    type: 'UNKNOWN' as ErrorType,
    message: 'Unknown error',
    userMessage: 'Ocurrió un error inesperado',
    cta: 'Reintentar',
    ...overrides,
  };
}
