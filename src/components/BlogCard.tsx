import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { GhostPost } from "@/lib/ghostClient";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BlogCardProps {
    post: GhostPost;
    index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-48 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                    {post.feature_image ? (
                        <img
                            src={post.feature_image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">Sin imagen</span>
                        </div>
                    )}
                    {post.primary_tag && (
                        <Badge className="absolute top-4 right-4 z-20 bg-primary/90 hover:bg-primary">
                            {post.primary_tag.name}
                        </Badge>
                    )}
                </Link>

                <CardHeader className="space-y-2 pb-2">
                    <div className="flex items-center text-xs text-muted-foreground space-x-4">
                        <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(post.published_at)}
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.reading_time} min de lectura
                        </div>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
                        <h3 className="font-bold text-xl line-clamp-2 leading-tight">
                            {post.title}
                        </h3>
                    </Link>
                </CardHeader>

                <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                        {post.custom_excerpt || post.excerpt}
                    </p>
                </CardContent>

                <CardFooter className="pt-0">
                    <Button variant="ghost" className="p-0 h-auto font-medium text-primary hover:text-primary/80 hover:bg-transparent group/btn" asChild>
                        <Link to={`/blog/${post.slug}`} className="flex items-center">
                            Leer artículo <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default BlogCard;
