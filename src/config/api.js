// Where the website sends its backend requests: "/api" on the website's own address.
// - On your computer (npm run dev), the Vite proxy forwards /api to the local backend.
// - On Vercel, vercel.json forwards /api to the backend (https://matekk-website1.vercel.app),
//   so the login cookie belongs to the website's own domain and browsers don't block it.
// VITE_API_URL (set in the hosting settings) overrides this when needed.
const API_URL = (import.meta.env.VITE_API_URL?.trim() || "/api").replace(/\/+$/, "");

export default API_URL;
