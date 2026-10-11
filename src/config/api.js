// Where the website sends its backend requests.
// - VITE_API_URL (set in the hosting settings) always wins.
// - On your computer (npm run dev), "/api" goes through the Vite proxy to the local backend.
// - The deployed website talks to the backend deployed on Vercel.
const DEPLOYED_API_URL = "https://matekk-website1.vercel.app";

const API_URL = (import.meta.env.VITE_API_URL?.trim() || (import.meta.env.PROD ? DEPLOYED_API_URL : "/api")).replace(/\/+$/, "");

export default API_URL;
