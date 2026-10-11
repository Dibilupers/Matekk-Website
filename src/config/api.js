const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

if (import.meta.env.PROD && !configuredApiUrl) {
	throw new Error("VITE_API_URL must point to the deployed backend in production.");
}

const API_URL = (configuredApiUrl || "http://localhost:3000").replace(/\/+$/, "");

export default API_URL;