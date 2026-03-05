export interface TelemetryEvent {
  eventName: string;
  data?: Record<string, unknown>;
}

export interface TelemetryConfig {
  enabled: boolean;
  flushInterval: number;
  maxBatchSize: number;
}
