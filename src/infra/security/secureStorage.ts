import * as SecureStore from 'expo-secure-store';

const KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_ID: 'user_id',
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

  async clearAll(): Promise<void> {
    await SecureStore.deleteItemAsync(KEYS.AUTH_TOKEN);
    await SecureStore.deleteItemAsync(KEYS.USER_ID);
  },

  async hasSession(): Promise<boolean> {
    const token = await SecureStore.getItemAsync(KEYS.AUTH_TOKEN);
    return token !== null;
  },
};
