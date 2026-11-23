import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Matekk application render failed.", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-dvh w-full items-center justify-center bg-slate-50 px-6 py-12 text-center">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">We couldn't load this page</h1>
          <p className="mt-3 text-slate-600">
            A display error interrupted the application. Reload the page to try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-[#1775EE] px-5 py-3 font-semibold text-white transition hover:bg-[#1262c9]"
          >
            Reload page
          </button>
        </section>
      </main>
    );
  }
}

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
      .catch((error) => console.error("Unable to register the Matekk offline service worker.", error));
  }, { once: true });
}

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Matekk application root element is missing.");
}

ReactDOM.createRoot(rootElement).render(
  <AppErrorBoundary>
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Analytics />
      <SpeedInsights />
    </React.StrictMode>
  </AppErrorBoundary>,
);
