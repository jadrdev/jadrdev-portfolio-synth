import type { QueryClient } from "@tanstack/react-query";
import { ghost, GhostPost } from "@/lib/ghostClient";

// Shared by the components and by the prerender step, so both fetch the same data
// under the same query keys.

// List views don't need the full article body; dropping it keeps the prerendered
// pages and the dehydrated query state small.
const withoutHtml = (posts: GhostPost[]) => posts.map(({ html: _html, ...post }) => post as GhostPost);

export const latestPostsQuery = {
    queryKey: ["ghost-posts"],
    queryFn: async () =>
        withoutHtml((await ghost.posts.browse({ limit: 3, include: ["tags", "authors"] })) as unknown as GhostPost[]),
};

export const allPostsQuery = {
    queryKey: ["ghost-posts-all"],
    queryFn: async () =>
        withoutHtml((await ghost.posts.browse({ limit: "all", include: ["tags", "authors"] })) as unknown as GhostPost[]),
};

export const postQuery = (slug: string) => ({
    queryKey: ["ghost-post", slug],
    queryFn: async () => (await ghost.posts.read({ slug, include: ["tags", "authors"] })) as unknown as GhostPost,
});

export const prefetchForPath = async (queryClient: QueryClient, pathname: string) => {
    if (pathname === "/") {
        await queryClient.prefetchQuery(latestPostsQuery);
    } else if (pathname === "/blog") {
        await queryClient.prefetchQuery(allPostsQuery);
    } else if (pathname.startsWith("/blog/")) {
        await queryClient.prefetchQuery(postQuery(pathname.slice("/blog/".length)));
    }
};
