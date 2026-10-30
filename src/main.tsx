import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, hydrate } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

declare global {
    interface Window {
        __REACT_QUERY_STATE__?: unknown;
    }
}

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

// Data fetched while prerendering, so the page doesn't show loaders on first paint.
// It is refetched in the background since it was captured at build time.
if (window.__REACT_QUERY_STATE__) {
    hydrate(queryClient, window.__REACT_QUERY_STATE__);
}

const app = (
    <HelmetProvider>
        <BrowserRouter>
            <App queryClient={queryClient} />
        </BrowserRouter>
    </HelmetProvider>
);

const container = document.getElementById("root")!;

// Prerendered routes ship their HTML; anything else (e.g. a post published after the
// last build) is served the empty shell and rendered on the client.
if (container.firstElementChild) {
    hydrateRoot(container, app);
} else {
    createRoot(container).render(app);
}
