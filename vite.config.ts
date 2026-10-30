import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // Never inline assets: the prerendered HTML and the client bundle must reference
    // the same image URLs
    assetsInlineLimit: 0,
  },
  ssr: {
    // CommonJS packages without proper ESM named exports; bundle them into the
    // server build instead of importing them from node_modules at prerender time
    noExternal: ["react-helmet-async"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
