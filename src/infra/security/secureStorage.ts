import * as SecureStore from 'expo-secure-store';

const KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_ID: 'user_id',
  CONSUMER_KEY: 'wc_consumer_key',
  CONSUMER_SECRET: 'wc_consumer_secret',
} as const;

export const SecureStorage = {
  async saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(KEYS.AUTH_TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    return SecureStore.getItemAsync(KEYS.AUTH_TOKEN);
  },

  async saveUserId(userId: string): Promise<void> {
    await SecureStore.setItemAsync(KEYS.USER_ID, userId);
  },

  async getUserId(): Promise<string | null> {
    return SecureStore.getItemAsync(KEYS.USER_ID);
  },

  async saveConsumerKey(key: string): Promise<void> {
    await SecureStore.setItemAsync(KEYS.CONSUMER_KEY, key);
  },

  async getConsumerKey(): Promise<string | null> {
    return SecureStore.getItemAsync(KEYS.CONSUMER_KEY);
  },

  async saveConsumerSecret(secret: string): Promise<void> {
    await SecureStore.setItemAsync(KEYS.CONSUMER_SECRET, secret);
  },

  async getConsumerSecret(): Promise<string | null> {
    return SecureStore.getItemAsync(KEYS.CONSUMER_SECRET);
  },

  async clearAll(): Promise<void> {
    await SecureStore.deleteItemAsync(KEYS.AUTH_TOKEN);
    await SecureStore.deleteItemAsync(KEYS.USER_ID);
    await SecureStore.deleteItemAsync(KEYS.CONSUMER_KEY);
    await SecureStore.deleteItemAsync(KEYS.CONSUMER_SECRET);
  },

  async hasSession(): Promise<boolean> {
    const token = await SecureStore.getItemAsync(KEYS.AUTH_TOKEN);
    return token !== null;
  },

  async hasConsumerKeys(): Promise<boolean> {
    const key = await SecureStore.getItemAsync(KEYS.CONSUMER_KEY);
    return key !== null;
  },
};
