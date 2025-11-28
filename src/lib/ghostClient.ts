import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
export const ghost = new GhostContentAPI({
    url: import.meta.env.VITE_GHOST_API_URL || "https://jadrdev.digitalpress.blog",
    key: import.meta.env.VITE_GHOST_CONTENT_API_KEY || "1b18ca37c79b3e4ca1be563eb9",
    version: "v5.0"
});

export interface GhostPost {
    id: string;
    uuid: string;
    title: string;
    slug: string;
    html: string;
    comment_id: string;
    feature_image: string;
    featured: boolean;
    visibility: string;
    created_at: string;
    updated_at: string;
    published_at: string;
    custom_excerpt: string;
    codeinjection_head: string | null;
    codeinjection_foot: string | null;
    custom_template: string | null;
    canonical_url: string | null;
    tags: Array<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        feature_image: string | null;
        visibility: string;
        meta_title: string | null;
        meta_description: string | null;
        url: string;
    }>;
    authors: Array<{
        id: string;
        name: string;
        slug: string;
        profile_image: string | null;
        cover_image: string | null;
        bio: string | null;
        website: string | null;
        location: string | null;
        facebook: string | null;
        twitter: string | null;
        meta_title: string | null;
        meta_description: string | null;
        url: string;
    }>;
    primary_author: {
        id: string;
        name: string;
        slug: string;
        profile_image: string | null;
        cover_image: string | null;
        bio: string | null;
        website: string | null;
        location: string | null;
        facebook: string | null;
        twitter: string | null;
        meta_title: string | null;
        meta_description: string | null;
        url: string;
    };
    primary_tag: {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        feature_image: string | null;
        visibility: string;
        meta_title: string | null;
        meta_description: string | null;
        url: string;
    } | null;
    url: string;
    excerpt: string;
    reading_time: number;
    access: boolean;
    og_image: string | null;
    og_title: string | null;
    og_description: string | null;
    twitter_image: string | null;
    twitter_title: string | null;
    twitter_description: string | null;
    meta_title: string | null;
    meta_description: string | null;
    email_subject: string | null;
}
