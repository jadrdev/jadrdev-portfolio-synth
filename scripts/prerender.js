// Runs after the client and server builds (see "build" in package.json).
// Renders every known route to static HTML so crawlers and link previews get the real
// content and meta tags without running JavaScript, and writes sitemap.xml.
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://www.jadrdev.com';
const distDir = path.resolve(__dirname, '../dist');
const serverEntry = path.resolve(__dirname, '../dist-server/entry-server.js');

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Empty shell for routes that aren't prerendered (vercel.json rewrites to it)
fs.writeFileSync(path.join(distDir, 'shell.html'), template);

// "/" -> index.html, "/blog" -> blog.html, "/blog/x" -> blog/x.html (served by cleanUrls)
const outputPath = (route) =>
    path.join(distDir, route === '/' ? 'index.html' : `${route.slice(1)}.html`);

// Keep "<" out of the inline JSON so post content can't close the script tag
const serializeState = (state) => JSON.stringify(state).replace(/</g, '\\u003c');

const { render, getRoutes } = await import(pathToFileURL(serverEntry).href);
const { staticRoutes, posts } = await getRoutes();
const routes = [...staticRoutes, ...posts.map((post) => post.path)];

for (const route of routes) {
    const { html, head, state } = await render(route);
    const page = template
        .replace(/<!--seo-start-->[\s\S]*<!--seo-end-->/, head)
        .replace('<!--app-html-->', html)
        .replace(
            '<!--app-state-->',
            `<script>window.__REACT_QUERY_STATE__ = ${serializeState(state)}</script>`
        );

    const file = outputPath(route);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page);
}
console.log(`Prerendered ${routes.length} routes.`);

const now = new Date().toISOString();
const latestPostUpdate = posts.length
    ? new Date(Math.max(...posts.map((post) => new Date(post.updatedAt)))).toISOString()
    : now;
const entry = (route, lastmod, priority) => `
  <url>
    <loc>${SITE_URL}${route === '/' ? '/' : route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[
    entry('/', now, '1.0'),
    entry('/blog', latestPostUpdate, '0.9'),
    ...staticRoutes.filter((route) => route.startsWith('/servicios/')).map((route) => entry(route, now, '0.9')),
    ...posts.map((post) => entry(post.path, new Date(post.updatedAt).toISOString(), '0.8')),
].join('')}
</urlset>
`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`Sitemap generated with ${routes.length} URLs.`);
