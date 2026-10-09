import { createContext, useContext, useEffect, useMemo, useState } from "react";
import API_URL from "../config/api";

const AuthContext = createContext(null);
const PROFILE_CACHE_KEY = "matekk-session-profile";

function readCachedProfile() {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const cachedProfile = JSON.parse(sessionStorage.getItem(PROFILE_CACHE_KEY) || "null");
    if (cachedProfile && typeof cachedProfile === "object") return cachedProfile;
  } catch {
    sessionStorage.removeItem(PROFILE_CACHE_KEY);
  }

  try {
    const encodedPayload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(encodedPayload.padEnd(Math.ceil(encodedPayload.length / 4) * 4, "=")));
    return typeof payload.username === "string" && payload.username
      ? { userId: payload.sub, username: payload.username }
      : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(readCachedProfile);
  const [isLoading, setIsLoading] = useState(true);

  async function refreshProfile() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setProfile(null);
      sessionStorage.removeItem(PROFILE_CACHE_KEY);
      return null;
    }

    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (!response.ok) {
      throw new Error("Unable to refresh account approval status.");
    }

    const nextProfile = await response.json();
    setProfile(nextProfile);
    sessionStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(nextProfile));
    return nextProfile;
  }

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
          sessionStorage.removeItem(PROFILE_CACHE_KEY);
          if (mounted) setProfile(null);
          return;
        }
        const nextProfile = await response.json();
        if (mounted) {
          setProfile(nextProfile);
          sessionStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(nextProfile));
        }
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem(PROFILE_CACHE_KEY);
        if (mounted) setProfile(null);
      })
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
    if (!response.ok) return { response, profile: null };

    const { access_token: token } = await response.json();
    localStorage.setItem("accessToken", token);
    let signedInProfile;
    try {
      const profileResponse = await fetch(`${API_URL}/auth/profile`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (!profileResponse.ok) {
        throw new Error("Unable to load the signed-in user.");
      }
      signedInProfile = await profileResponse.json();
    } catch (error) {
      localStorage.removeItem("accessToken");
      throw error;
    }
    setProfile(signedInProfile);
    sessionStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(signedInProfile));
    return { response, profile: signedInProfile };
  }

  function logout() {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem(PROFILE_CACHE_KEY);
    setProfile(null);
  }

  const value = useMemo(
    () => ({ profile, isAuthenticated: Boolean(profile), isLoading, login, logout, refreshProfile }),
    [isLoading, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
