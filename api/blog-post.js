// /blog/:slug lands here only when there's no prerendered file for it (see vercel.json),
// i.e. a post published after the last build or a slug that doesn't exist.
// Asks Ghost whether the post exists: if it does, serves the SPA shell (200) and the client
// loads the post; if Ghost says it doesn't, serves the prerendered 404 page with a real 404.
const GHOST_URL = process.env.VITE_GHOST_API_URL || 'https://jadrdev.digitalpress.blog';
const GHOST_KEY = process.env.VITE_GHOST_CONTENT_API_KEY || 'dba7d0fd06d3c0f72ef1266d2c';

const postExists = async (slug) => {
    if (!/^[a-z0-9-]+$/i.test(slug)) return false;
    const url = `${GHOST_URL}/ghost/api/content/posts/slug/${encodeURIComponent(slug)}/?key=${GHOST_KEY}&fields=id`;
    try {
        const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
        if (res.status === 404) return false;
        // Ghost down or erroring: serve the shell rather than hide a real post
        return true;
    } catch {
        return true;
    }
};

export async function GET(request) {
    const { searchParams, origin } = new URL(request.url);
    const slug = searchParams.get('slug') || '';
    const exists = await postExists(slug);

    const page = await fetch(`${origin}/${exists ? "shell" : "404"}`);
    return new Response(await page.text(), {
        status: exists ? 200 : 404,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
        },
    });
}
