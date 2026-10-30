import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { SEO, SITE_URL } from "@/components/SEO";
import { getService, services } from "@/data/services";
import { projects } from "@/data/projects";
import { WHATSAPP_URL } from "@/lib/contact";
import NotFound from "./NotFound";

const ServicePage = () => {
    const { slug } = useParams<{ slug: string }>();
    const service = slug ? getService(slug) : undefined;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!service) return <NotFound />;

    const url = `${SITE_URL}/servicios/${service.slug}`;
    const relatedProjects = projects.filter((project) => project.services.includes(service.slug));
    const otherServices = services.filter((other) => other.slug !== service.slug);

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.heading,
            description: service.seoDescription,
            url,
            serviceType: service.title,
            provider: { "@id": `${SITE_URL}/#service` },
            areaServed: [
                { "@type": "AdministrativeArea", name: "Canarias" },
                { "@type": "Country", name: "España" },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Servicios", item: `${SITE_URL}/#services` },
                { "@type": "ListItem", position: 3, name: service.title, item: url },
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <SEO title={service.seoTitle} description={service.seoDescription} url={url} jsonLd={jsonLd} />
            <Navbar />

            <main className="flex-grow pt-28">
                {/* Intro */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 max-w-4xl">
                    <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                        <Link to="/#services">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Todos los servicios
                        </Link>
                    </Button>
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-6">
                        <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">{service.heading}</h1>
                    <div className="space-y-4 text-lg sm:text-xl text-muted-foreground leading-relaxed">
                        {service.intro.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-8">
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold">
                            <Link to="/#contact">Pide presupuesto</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold">
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                                Escríbeme por WhatsApp
                            </a>
                        </Button>
                    </div>
                </section>

                {/* What's included */}
                <section className="py-16 sm:py-24 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
                            Qué <span className="gradient-text">incluye</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.includes.map((item) => (
                                <div key={item.title} className="bg-card border border-border rounded-xl p-6">
                                    <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Audience */}
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
                            ¿Para <span className="gradient-text">quién</span> es?
                        </h2>
                        <ul className="space-y-4">
                            {service.audience.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-lg">
                                    <Check className="w-6 h-6 text-primary shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Related projects */}
                {relatedProjects.length > 0 && (
                    <section className="py-16 sm:py-24 bg-muted/30">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
                                Proyectos <span className="gradient-text">relacionados</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedProjects.map((project, index) => (
                                    <ProjectCard key={project.title} project={project} index={index % 3} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ */}
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
                            Preguntas <span className="gradient-text">frecuentes</span>
                        </h2>
                        <div className="space-y-4">
                            {service.faqs.map((faq) => (
                                <details
                                    key={faq.question}
                                    className="group bg-card border border-border rounded-xl px-6 open:border-primary/40"
                                >
                                    <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-left font-semibold text-lg [&::-webkit-details-marker]:hidden">
                                        <h3>{faq.question}</h3>
                                        <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <p className="pb-5 text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA + other services */}
                <section className="py-16 sm:py-24 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                            Hablemos de tu <span className="gradient-text">proyecto</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Cuéntame tu idea y te preparo una propuesta con presupuesto, sin compromiso.
                        </p>
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold">
                            <Link to="/#contact">Pide presupuesto</Link>
                        </Button>

                        <h2 className="text-xl font-semibold mt-16 mb-6">Otros servicios</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {otherServices.map((other) => (
                                <Link
                                    key={other.slug}
                                    to={`/servicios/${other.slug}`}
                                    className="px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                                >
                                    {other.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default ServicePage;
