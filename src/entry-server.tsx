import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import App from "./App";
import { prefetchForPath } from "./lib/blogQueries";
import { ghost } from "./lib/ghostClient";
import { services } from "./data/services";

// Used by scripts/prerender.js at build time to generate static HTML for every route.

export interface RenderResult {
    html: string;
    head: string;
    state: unknown;
}

export const render = async (url: string): Promise<RenderResult> => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    await prefetchForPath(queryClient, url);

    const helmetContext: { helmet?: HelmetServerState } = {};
    const html = renderToString(
        <HelmetProvider context={helmetContext}>
            <StaticRouter location={url}>
                <App queryClient={queryClient} />
            </StaticRouter>
        </HelmetProvider>
    );

    const { helmet } = helmetContext;
    const head = helmet
        ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((tags) => tags.toString()).join("\n    ")
        : "";

    return { html, head, state: dehydrate(queryClient) };
};

export const getRoutes = async () => {
    const staticRoutes = ["/", "/blog", ...services.map((service) => `/servicios/${service.slug}`)];
    try {
        const posts = await ghost.posts.browse({ limit: "all", fields: ["slug", "updated_at"] });
        return {
            staticRoutes,
            posts: posts.map((post) => ({ path: `/blog/${post.slug}`, updatedAt: post.updated_at as string })),
        };
    } catch (error) {
        // Don't fail the deploy if Ghost is unreachable: posts fall back to client rendering
        console.warn("Could not fetch posts from Ghost, skipping post prerendering:", (error as Error).message);
        return { staticRoutes, posts: [] };
    }
};
