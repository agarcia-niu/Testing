import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_ID: 'user_id',
  CONSUMER_KEY: 'wc_consumer_key',
  CONSUMER_SECRET: 'wc_consumer_secret',
} as const;

// Fallback for web where SecureStore is not available
const webStorage = {
  async getItemAsync(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  },
  async setItemAsync(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  },
  async deleteItemAsync(key: string): Promise<void> {
    localStorage.removeItem(key);
  },
};

const store = Platform.OS === 'web' ? webStorage : SecureStore;

export const SecureStorage = {
  async saveToken(token: string): Promise<void> {
    await store.setItemAsync(KEYS.AUTH_TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    return store.getItemAsync(KEYS.AUTH_TOKEN);
  },

  async saveUserId(userId: string): Promise<void> {
    await store.setItemAsync(KEYS.USER_ID, userId);
  },

  async getUserId(): Promise<string | null> {
    return store.getItemAsync(KEYS.USER_ID);
  },

  async saveConsumerKey(key: string): Promise<void> {
    await store.setItemAsync(KEYS.CONSUMER_KEY, key);
  },

  async getConsumerKey(): Promise<string | null> {
    return store.getItemAsync(KEYS.CONSUMER_KEY);
  },

  async saveConsumerSecret(secret: string): Promise<void> {
    await store.setItemAsync(KEYS.CONSUMER_SECRET, secret);
  },

  async getConsumerSecret(): Promise<string | null> {
    return store.getItemAsync(KEYS.CONSUMER_SECRET);
  },

  async clearAll(): Promise<void> {
    await store.deleteItemAsync(KEYS.AUTH_TOKEN);
    await store.deleteItemAsync(KEYS.USER_ID);
    await store.deleteItemAsync(KEYS.CONSUMER_KEY);
    await store.deleteItemAsync(KEYS.CONSUMER_SECRET);
  },

  async hasSession(): Promise<boolean> {
    const token = await store.getItemAsync(KEYS.AUTH_TOKEN);
    return token !== null;
  },

  async hasConsumerKeys(): Promise<boolean> {
    const key = await store.getItemAsync(KEYS.CONSUMER_KEY);
    return key !== null;
  },
};
