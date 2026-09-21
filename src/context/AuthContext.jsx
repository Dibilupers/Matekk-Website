import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_URL } from "../config/api";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoading(false);
      return;
    }

    let mounted = true;
    fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then(async (response) => {
        if (!response.ok) {
          localStorage.removeItem("accessToken");
          return;
        }
        if (mounted) setProfile(await response.json());
      })
      .catch(() => localStorage.removeItem("accessToken"))
      .finally(() => mounted && setIsLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  async function login(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) return response;

    const { access_token: token } = await response.json();
    localStorage.setItem("accessToken", token);
    const profileResponse = await fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (!profileResponse.ok) {
      localStorage.removeItem("accessToken");
      throw new Error("Unable to load the signed-in user.");
    }
    setProfile(await profileResponse.json());
    return response;
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setProfile(null);
  }

  const value = useMemo(
    () => ({ profile, isAuthenticated: Boolean(profile), isLoading, login, logout }),
    [isLoading, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
