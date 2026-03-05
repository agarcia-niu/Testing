import { v4 as uuidv4 } from 'uuid';

let currentSessionId: string | null = null;

export const SessionManager = {
  initSession(): string {
    currentSessionId = uuidv4();
    return currentSessionId;
  },

  getSessionId(): string {
    if (!currentSessionId) {
      return SessionManager.initSession();
    }
    return currentSessionId;
  },

  clearSession(): void {
    currentSessionId = null;
  },
};
