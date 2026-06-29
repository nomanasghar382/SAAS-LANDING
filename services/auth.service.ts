import { signIn, signOut } from "next-auth/react";

export const authService = {
  login: async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return result;
  },

  logout: async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  },
};
