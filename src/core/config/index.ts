export const Config = {
  api: {
    baseUrl: '', // Set when connecting to real WooCommerce
    timeout: 15000, // 15 seconds
  },
  sync: {
    maxRetries: 3,
    retryDelays: [2000, 4000, 8000], // Exponential backoff
    processingInterval: 5000, // Check for pending jobs every 5s
  },
  telemetry: {
    enabled: __DEV__, // Enable in dev for testing
    flushInterval: 60000, // Flush every 60s
    maxBatchSize: 50,
  },
  storage: {
    dbName: 'woo-app.db',
    dbVersion: 1,
  },
} as const;
