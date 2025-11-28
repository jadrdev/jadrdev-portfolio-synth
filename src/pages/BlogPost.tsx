import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ghost, GhostPost } from "@/lib/ghostClient";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data: post, isLoading, error } = useQuery({
        queryKey: ["ghost-post", slug],
        queryFn: async () => {
            if (!slug) throw new Error("No slug provided");
            return await ghost.posts.read({
                slug,
                include: ["tags", "authors"],
            });
        },
        enabled: !!slug,
    });

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex justify-center items-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex flex-col justify-center items-center p-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
                    <p className="text-muted-foreground mb-8">
                        Lo sentimos, no pudimos encontrar el artículo que buscas.
                    </p>
                    <Button asChild>
                        <Link to="/">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Volver al inicio
                        </Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                            <Link to="/#blog">
                                <ArrowLeft className="mr-2 w-4 h-4" /> Volver al blog
                            </Link>
                        </Button>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            {post.primary_tag && (
                                <span className="flex items-center text-primary font-medium">
                                    <Tag className="w-4 h-4 mr-1" />
                                    {post.primary_tag.name}
                                </span>
                            )}
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(post.published_at)}
                            </span>
                            <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {post.reading_time} min de lectura
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {post.feature_image && (
                            <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
                                <img
                                    src={post.feature_image}
                                    alt={post.title}
                                    className="w-full h-auto object-cover max-h-[500px]"
                                />
                            </div>
                        )}
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border
              prose-img:rounded-lg prose-img:shadow-md
              prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r
              "
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
