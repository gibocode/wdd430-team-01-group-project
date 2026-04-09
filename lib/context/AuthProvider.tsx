"use client";

import { User } from "@/types/user";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const fetched = useRef<boolean>(false);
  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/user", {
        credentials: "include",
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
