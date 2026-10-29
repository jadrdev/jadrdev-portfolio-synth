import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GHOST_URL = "https://jadrdev.digitalpress.blog";
const GHOST_KEY = "1b18ca37c79b3e4ca1be563eb9";
const SITE_URL = "https://www.jadrdev.com";

async function generateSitemap() {
    try {
        console.log('Fetching posts from Ghost...');
        const response = await fetch(
            `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&limit=all&fields=slug,updated_at`
        );
        const data = await response.json();
        const posts = data.posts;

        console.log(`Found ${posts.length} posts.`);

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${new Date(Math.max(...posts.map((post) => new Date(post.updated_at)))).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${posts
                .map(
                    (post) => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
                )
                .join('')}
</urlset>`;

        // Runs after `vite build`, so write straight into the build output
        const distDir = path.resolve(__dirname, '../dist');
        fs.mkdirSync(distDir, { recursive: true });
        const sitemapPath = path.join(distDir, 'sitemap.xml');

        fs.writeFileSync(sitemapPath, sitemap);
        console.log(`Sitemap generated at ${sitemapPath}`);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
