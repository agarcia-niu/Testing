import { SecureStorage } from './secureStorage';

export interface AuthSession {
  token: string;
  userId: string;
}

export const AuthStorage = {
  async saveSession(session: AuthSession): Promise<void> {
    await SecureStorage.saveToken(session.token);
    await SecureStorage.saveUserId(session.userId);
  },

  async getSession(): Promise<AuthSession | null> {
    const token = await SecureStorage.getToken();
    const userId = await SecureStorage.getUserId();
    if (token && userId) {
      return { token, userId };
    }
    return null;
  },

  async isAuthenticated(): Promise<boolean> {
    return SecureStorage.hasSession();
  },

  async logout(): Promise<void> {
    await SecureStorage.clearAll();
  },
};
