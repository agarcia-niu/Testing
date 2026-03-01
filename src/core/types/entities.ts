export interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  category: string;
  imageUrl: string;
  dataJson: string;
  updatedAt: string;
  lastSyncAt: string | null;
  statusLocal: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  priceSnapshot: number;
  addedAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  remoteId: string | null;
  clientOrderId: string;
  statusLocal: OrderLocalStatus;
  statusRemote: string | null;
  itemsJson: string;
  subtotal: number | null;
  discount: number | null;
  shipping: number | null;
  total: number | null;
  createdAt: string;
  updatedAt: string;
  lastSyncAt: string | null;
}

export type OrderLocalStatus =
  | 'DRAFT'
  | 'QUEUED'
  | 'SENDING'
  | 'CONFIRMED'
  | 'FAILED_RETRYABLE'
  | 'FAILED_FINAL';

export interface SyncJob {
  id: string;
  jobType: string;
  payloadJson: string;
  status: SyncJobStatus;
  attempts: number;
  maxAttempts: number;
  lastAttemptAt: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SyncJobStatus =
  | 'PENDING'
  | 'SENDING'
  | 'CONFIRMED'
  | 'FAILED_RETRYABLE'
  | 'FAILED_FINAL';

export interface TelemetryEvent {
  id: string;
  sessionId: string;
  eventName: string;
  dataJson: string | null;
  createdAt: string;
  flushed: number;
}

export interface SyncMetadata {
  key: string;
  value: string;
  updatedAt: string;
}
