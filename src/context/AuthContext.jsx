import { createContext, useContext, useEffect, useMemo, useState } from "react";
import API_URL from "../config/api";

const AuthContext = createContext(null);
const OFFLINE_PROFILE_KEY = "matekkOfflineProfile";

function readOfflineProfile() {
  const serialized = localStorage.getItem(OFFLINE_PROFILE_KEY);
  if (!serialized) return null;

  try {
    const profile = JSON.parse(serialized);
    if (!profile || (typeof profile.userId !== "string" && typeof profile.userId !== "number")) {
      localStorage.removeItem(OFFLINE_PROFILE_KEY);
      return null;
    }
    return profile;
  } catch {
    localStorage.removeItem(OFFLINE_PROFILE_KEY);
    return null;
  }
}

function storeOfflineProfile(profile) {
  if (!profile || (typeof profile.userId !== "string" && typeof profile.userId !== "number")) return;
  localStorage.setItem(OFFLINE_PROFILE_KEY, JSON.stringify({
    userId: profile.userId,
    username: profile.username,
    role: profile.role,
    active_status: profile.active_status,
    first_name: profile.first_name,
    last_name: profile.last_name,
  }));
}

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  async function refreshProfile() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setProfile(null);
      return null;
    }

    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (!response.ok) {
      throw new Error("Unable to refresh account approval status.");
    }

    const nextProfile = await response.json();
    storeOfflineProfile(nextProfile);
    setProfile(nextProfile);
    return nextProfile;
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoading(false);
      return;
    }

    let mounted = true;
    const cachedProfile = readOfflineProfile();
    fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status !== 401 && response.status !== 403) {
            throw new Error("Unable to verify the current session.");
          }
          localStorage.removeItem("accessToken");
          localStorage.removeItem(OFFLINE_PROFILE_KEY);
          return;
        }
        const nextProfile = await response.json();
        storeOfflineProfile(nextProfile);
        if (mounted) setProfile(nextProfile);
      })
      .catch(() => {
        if (mounted && cachedProfile) setProfile(cachedProfile);
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
    storeOfflineProfile(signedInProfile);
    return { response, profile: signedInProfile };
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem(OFFLINE_PROFILE_KEY);
    setProfile(null);
  }

  const value = useMemo(
    () => ({ profile, isAuthenticated: Boolean(profile), isLoading, isOnline, login, logout, refreshProfile }),
    [isLoading, isOnline, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
