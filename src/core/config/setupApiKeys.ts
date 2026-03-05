import { SecureStorage } from '../../infra/security/secureStorage';

interface ApiKeysConfig {
  consumerKey: string;
  consumerSecret: string;
}

export async function setupApiKeys(): Promise<void> {
  const hasKeys = await SecureStorage.hasConsumerKeys();
  if (hasKeys) return;

  try {
    // apiKeys.local.ts is gitignored — contains real credentials
    const { API_KEYS } = require('./apiKeys.local') as { API_KEYS: ApiKeysConfig };
    await SecureStorage.saveConsumerKey(API_KEYS.consumerKey);
    await SecureStorage.saveConsumerSecret(API_KEYS.consumerSecret);
  } catch {
    console.warn(
      'API keys not found. Copy apiKeys.template.ts to apiKeys.local.ts with your credentials.'
    );
  }
}
