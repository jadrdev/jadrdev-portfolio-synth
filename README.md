# jadrdev.com

Web y portfolio de JadrDev: desarrollo de apps móviles y webs a medida.

- **Stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion.
- **Blog:** los artículos se escriben en Ghost (modo privado) y se leen con la Content API.
- **Despliegue:** Vercel, automático al hacer push a `main`.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

`npm run build` hace tres pasos:

1. `vite build`: build del cliente en `dist/`.
2. `vite build --ssr src/entry-server.tsx --outDir dist-server`: build para renderizar en Node.
3. `node scripts/prerender.js`: genera el HTML estático de cada ruta (home, `/blog`,
   artículos y páginas de servicios) y el `sitemap.xml`.

Las rutas prerenderizadas se sirven como HTML estático (`cleanUrls` en `vercel.json`); el resto
recibe `shell.html` y se renderiza en el navegador. Los artículos publicados después del último
despliegue aparecen igualmente, pero sin prerenderizar hasta el siguiente despliegue.

## Dónde cambiar las cosas

| Qué | Dónde |
|---|---|
| Proyectos del portfolio | `src/data/projects.ts` (iconos en `src/assets/projects/`) |
| Servicios y sus páginas | `src/data/services.ts` |
| WhatsApp | `src/lib/contact.ts` |
| Metadatos SEO por defecto | `src/components/SEO.tsx` e `index.html` |
| Conexión con Ghost | `src/lib/ghostClient.ts` (o variables `VITE_GHOST_API_URL` y `VITE_GHOST_CONTENT_API_KEY`) |
