import { useCallback, useEffect, useMemo, useState } from "react";
import API_URL from "../config/api";
import { AuthContext } from "./auth-context";

const PROFILE_CACHE_KEY = "matekk-session-profile";

// Shows the last known profile instantly on refresh (sessions use a secure cookie, so there is no token
// to read here); the server check below replaces it, or clears it if the session has ended.
function readCachedProfile() {
  try {
    const cachedProfile = JSON.parse(sessionStorage.getItem(PROFILE_CACHE_KEY) || "null");
    return cachedProfile && typeof cachedProfile === "object" ? cachedProfile : null;
  } catch {
    sessionStorage.removeItem(PROFILE_CACHE_KEY);
    return null;
  }
}

// Small copy of the profile kept for offline use (the site can still show who is signed in without internet)
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
  const [profile, setProfile] = useState(readCachedProfile);
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

  const refreshProfile = useCallback(async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Unable to refresh account approval status.");
    }

    const nextProfile = await response.json();
    storeOfflineProfile(nextProfile);
    setProfile(nextProfile);
    sessionStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(nextProfile));
    return nextProfile;
  }, []);

  useEffect(() => {
    localStorage.removeItem("accessToken");

    let mounted = true;
    const cachedProfile = readOfflineProfile();
    fetch(`${API_URL}/auth/profile`, {
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          // Signed out or session expired: forget the saved copies. Other errors (server down) fall through to the offline copy.
          if (response.status !== 401 && response.status !== 403) {
            throw new Error("Unable to verify the current session.");
          }
          sessionStorage.removeItem(PROFILE_CACHE_KEY);
          localStorage.removeItem(OFFLINE_PROFILE_KEY);
          if (mounted) setProfile(null);
          return;
        }
        const nextProfile = await response.json();
        storeOfflineProfile(nextProfile);
        if (mounted) {
          setProfile(nextProfile);
          sessionStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(nextProfile));
        }
      })
      .catch((error) => {
        console.error("Unable to restore the signed-in session.", error);
        if (mounted) setProfile((current) => current ?? cachedProfile);
      })
      .finally(() => mounted && setIsLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const completeLogin = useCallback(async (response) => {
    let signedInProfile;
    try {
      const profileResponse = await fetch(`${API_URL}/auth/profile`, {
        credentials: "include",
      });
      if (!profileResponse.ok) {
        throw new Error("Unable to load the signed-in user.");
      }
      signedInProfile = await profileResponse.json();
    } catch (error) {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      }).catch((logoutError) =>
        console.error("Unable to clear a session after profile loading failed.", logoutError),
      );
      throw error;
    }
    setProfile(signedInProfile);
    sessionStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(signedInProfile));
    storeOfflineProfile(signedInProfile);
    return { response, profile: signedInProfile };
  }, []);

  const login = useCallback(async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) return { response, profile: null };

    const result = await response.json();
    if (result.requiresOtp) {
      return {
        response,
        profile: null,
        requiresOtp: true,
        maskedEmail: result.maskedEmail,
      };
    }
    return completeLogin(response);
  }, [completeLogin]);

  const verifyLoginOtp = useCallback(async (username, code) => {
    const response = await fetch(`${API_URL}/auth/login/verify-otp`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, code }),
    });
    if (!response.ok) return { response, profile: null };
    return completeLogin(response);
  }, [completeLogin]);

  const logout = useCallback(() => {
    sessionStorage.removeItem(PROFILE_CACHE_KEY);
    localStorage.removeItem(OFFLINE_PROFILE_KEY);
    setProfile(null);
    void fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).then((response) => {
      if (!response.ok) throw new Error(`Logout request failed (${response.status}).`);
    }).catch((error) => console.error("Unable to clear the server session.", error));
  }, []);

  const value = useMemo(
    () => ({
      profile,
      isAuthenticated: Boolean(profile),
      isLoading,
      isOnline,
      login,
      verifyLoginOtp,
      logout,
      refreshProfile,
    }),
    [isLoading, isOnline, profile, login, verifyLoginOtp, logout, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
