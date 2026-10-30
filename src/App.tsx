import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import ServicePage from "./pages/ServicePage";
import NotFound from "./pages/NotFound";

// The router and the query client are provided by the entry point: BrowserRouter in
// the browser (main.tsx) and StaticRouter when prerendering (entry-server.tsx).
const App = ({ queryClient }: { queryClient: QueryClient }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/servicios/:slug" element={<ServicePage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
