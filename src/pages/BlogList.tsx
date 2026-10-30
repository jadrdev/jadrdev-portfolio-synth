import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SEO, SITE_URL } from "@/components/SEO";
import { allPostsQuery } from "@/lib/blogQueries";

const BlogList = () => {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data: posts, isLoading, error } = useQuery(allPostsQuery);

    const tags = useMemo(() => {
        const counts = new Map<string, { name: string; count: number }>();
        posts?.forEach((post) => {
            if (!post.primary_tag) return;
            const current = counts.get(post.primary_tag.slug);
            counts.set(post.primary_tag.slug, {
                name: post.primary_tag.name,
                count: (current?.count ?? 0) + 1,
            });
        });
        return [...counts.entries()].sort((a, b) => b[1].count - a[1].count);
    }, [posts]);

    const visiblePosts = activeTag
        ? posts?.filter((post) => post.primary_tag?.slug === activeTag)
        : posts;

    const jsonLd = posts && {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Blog de JadrDev",
        url: `${SITE_URL}/blog`,
        inLanguage: "es",
        author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "JadrDev" },
        blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: `${SITE_URL}/blog/${post.slug}`,
            datePublished: post.published_at,
        })),
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <SEO
                title="Blog de desarrollo de apps y web: Ionic, Angular, Flutter y más"
                description="Artículos y tutoriales sobre desarrollo de apps móviles y web con Ionic, Angular, Flutter, Capacitor y Laravel, escritos por JadrDev desde Canarias."
                url={`${SITE_URL}/blog`}
                jsonLd={jsonLd || undefined}
            />
            <Navbar />

            <main className="flex-grow pt-28 pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Blog de <span className="gradient-text">desarrollo</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground">
                            Tutoriales y experiencias reales sobre desarrollo de apps móviles y web:
                            Ionic, Angular, Flutter, Capacitor, Laravel y más.
                        </p>
                    </header>

                    {tags.length > 1 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            <button
                                onClick={() => setActiveTag(null)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeTag === null
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "border-border text-muted-foreground hover:text-primary hover:border-primary"
                                    }`}
                            >
                                Todos ({posts?.length})
                            </button>
                            {tags.map(([slug, tag]) => (
                                <button
                                    key={slug}
                                    onClick={() => setActiveTag(slug)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeTag === slug
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "border-border text-muted-foreground hover:text-primary hover:border-primary"
                                        }`}
                                >
                                    {tag.name} ({tag.count})
                                </button>
                            ))}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <p className="text-center text-muted-foreground py-20">
                            No se pudieron cargar los artículos. Inténtalo de nuevo más tarde.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visiblePosts?.map((post, index) => (
                                <BlogCard key={post.id} post={post} index={index % 3} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default BlogList;
