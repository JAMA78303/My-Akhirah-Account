import Link from "next/link";
import Image from "next/image";

interface HeroProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaHref?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    backgroundImage?: string;
}

export default function Hero({
    title,
    subtitle,
    ctaText = "Donate Now",
    ctaHref = "/donate",
    secondaryCtaText,
    secondaryCtaHref,
    backgroundImage = "/hero-bg.jpg",
}: HeroProps) {
    return (
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt=""
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom text-center text-white px-4 py-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-slide-up">
                        {subtitle}
                    </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                    <Link href={ctaHref} className="btn btn-primary text-lg">
                        {ctaText}
                    </Link>
                    {secondaryCtaText && secondaryCtaHref && (
                        <Link
                            href={secondaryCtaHref}
                            className="btn bg-white/20 text-white border border-white/30 hover:bg-white/30 text-lg"
                        >
                            {secondaryCtaText}
                        </Link>
                    )}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                    className="w-6 h-6 text-white/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
