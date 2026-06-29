import { create } from "zustand";
import type { AuthSession } from "@/types";

interface AuthState {
  session: AuthSession | null;
  isAuthenticated: boolean;
  setSession: (session: AuthSession | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  isAuthenticated: false,
  setSession: (session) =>
    set({ session, isAuthenticated: session !== null }),
  logout: () => set({ session: null, isAuthenticated: false }),
}));
