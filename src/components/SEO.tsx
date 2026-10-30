import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://www.jadrdev.com';
const SITE_NAME = 'JadrDev';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
    noindex?: boolean;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const toAbsolute = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

export const SEO = ({
    title,
    description,
    image = '/og-image.jpg',
    url,
    type = 'website',
    noindex = false,
    jsonLd
}: SEOProps) => {
    const { pathname } = useLocation();
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonical = url ?? toAbsolute(pathname);
    const imageUrl = toAbsolute(image);

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <html lang="es" />
            <title>{fullTitle}</title>
            <meta name='description' content={description} />
            {noindex ? (
                <meta name="robots" content="noindex, follow" />
            ) : (
                <link rel="canonical" href={canonical} />
            )}

            {/* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="es_ES" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={canonical} />

            {/* Twitter tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@jadrdevcm" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            {/* Structured data */}
            {jsonLd && (
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            )}
        </Helmet>
    );
};
