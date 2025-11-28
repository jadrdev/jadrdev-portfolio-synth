import { useQuery } from "@tanstack/react-query";
import { ghost, GhostPost } from "@/lib/ghostClient";
import BlogCard from "./BlogCard";
import { Button } from "./ui/button";
import { Loader2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const Blog = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["ghost-posts"],
        queryFn: async () => {
            return await ghost.posts.browse({
                limit: 3,
                include: ["tags", "authors"],
            });
        },
    });

    if (error) {
        console.error("Error fetching blog posts:", error);
        return null; // Hide section if API fails
    }

    return (
        <section id="blog" className="py-20 bg-muted/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Últimos Artículos
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Comparto mis conocimientos y experiencias sobre desarrollo web, tecnología y más en mi blog personal.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {posts?.map((post, index) => (
                            <BlogCard key={post.id} post={post as GhostPost} index={index} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-8">
                    <Button asChild size="lg" className="rounded-full px-8">
                        <a href="https://jadrdev.digitalpress.blog" target="_blank" rel="noopener noreferrer">
                            Ver todos los artículos <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Blog;
