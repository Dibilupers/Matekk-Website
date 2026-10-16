const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

// Keep API requests same-origin so the browser can send the authentication cookie.
// VITE_API_URL overrides this when a deployment uses a dedicated backend origin.
const API_URL = (configuredApiUrl || "/api").replace(/\/+$/, "");

export default API_URL;
