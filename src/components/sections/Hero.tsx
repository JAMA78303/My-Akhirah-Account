import Link from "next/link";
import Image from "next/image";
import HeroQuickDonate from "./HeroQuickDonate";

function ArrowRightIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    );
}

function HeroCtas({
    ctaText,
    ctaHref,
    secondaryCtaText,
    secondaryCtaHref,
    className = "",
}: {
    ctaText: string;
    ctaHref: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    className?: string;
}) {
    return (
        <div
            className={`flex max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 ${className}`}
        >
            <Link
                href={ctaHref}
                className="inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-sm bg-akhirah-teal px-5 py-3 text-base font-bold text-purity-white shadow-lg shadow-account-black/20 transition-colors hover:bg-[#034b45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eternal-gold sm:w-fit sm:px-6 sm:py-3.5 md:text-lg"
            >
                {ctaText}
                <ArrowRightIcon className="h-5 w-5 shrink-0" />
            </Link>

            {secondaryCtaText && secondaryCtaHref && (
                <Link
                    href={secondaryCtaHref}
                    className="inline-flex min-h-11 w-fit items-center gap-2 py-2 text-base font-semibold text-purity-white underline-offset-4 transition-colors hover:text-eternal-gold hover:underline md:text-lg"
                >
                    {secondaryCtaText}
                    <ArrowRightIcon className="h-4 w-4 shrink-0" />
                </Link>
            )}
        </div>
    );
}

interface HeroProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaHref?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    backgroundImage?: string;
    showSubtitle?: boolean;
}

export default function Hero({
    title,
    subtitle,
    ctaText = "Give Zakat now",
    ctaHref = "/donate",
    secondaryCtaText = "Giving & Zakat FAQs",
    secondaryCtaHref = "/faq",
    backgroundImage = "/hero-bg.jpg",
    showSubtitle = false,
}: HeroProps) {
    return (
        <section
            className="relative flex min-h-[min(100dvh,56rem)] flex-col overflow-x-clip md:min-h-[min(100dvh,52rem)] max-[480px]:min-h-[min(100dvh,48rem)]"
            aria-labelledby="hero-heading"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt=""
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-account-black/85 via-akhirah-teal/45 to-akhirah-teal/25" />
                <div className="absolute inset-0 bg-account-black/25" />
            </div>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                <div
                    className="container-custom grid min-h-0 w-full max-w-full flex-1 grid-cols-1 content-end gap-6 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-20 max-[480px]:pt-[max(4.5rem,env(safe-area-inset-top,0px))] max-[479px]:gap-5 sm:gap-8 sm:pb-12 sm:pt-24 md:pb-20 md:pt-28 lg:grid-cols-[minmax(0,1fr)_auto] lg:content-stretch lg:items-stretch lg:gap-10 lg:pb-24 lg:pt-32 xl:gap-14 xl:pb-28 xl:pt-36"
                >
                    {/* Copy: on lg, full left column; on smaller screens, title + subtitle only (CTAs move beside form from 480px) */}
                    <div className="flex min-h-0 min-w-0 flex-col justify-end lg:h-full lg:min-h-0">
                        <h1
                            id="hero-heading"
                            className="max-w-4xl text-balance font-bold italic leading-[1.08] text-purity-white text-[clamp(1.625rem,4.2vw+0.85rem,4.5rem)] animate-fade-in"
                        >
                            {title}
                        </h1>

                        {showSubtitle && subtitle && (
                            <p className="mt-4 max-w-xl text-base text-white/90 sm:mt-5 sm:text-lg md:text-xl">
                                {subtitle}
                            </p>
                        )}

                        {/* Large screens & narrow mobile: CTAs under headline */}
                        <div className="mt-6 max-[479px]:block min-[480px]:max-lg:hidden lg:mt-8 lg:block animate-slide-up">
                            <HeroCtas
                                ctaText={ctaText}
                                ctaHref={ctaHref}
                                secondaryCtaText={secondaryCtaText}
                                secondaryCtaHref={secondaryCtaHref}
                            />
                        </div>
                    </div>

                    {/* Form column: beside CTAs (480px–1023px), full-width under CTAs (&lt;480), right column (lg+) */}
                    <div className="flex min-h-0 min-w-0 flex-col gap-5 max-[479px]:mt-5 min-[480px]:max-lg:mt-6 min-[480px]:max-lg:flex-row min-[480px]:max-lg:items-end min-[480px]:max-lg:gap-4 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:flex-row lg:items-end lg:justify-end lg:gap-0 lg:self-stretch">
                        {/* Mid-width band: CTAs share row with form */}
                        <div className="hidden min-[480px]:max-lg:block min-[480px]:max-lg:shrink-0">
                            <HeroCtas
                                ctaText={ctaText}
                                ctaHref={ctaHref}
                                secondaryCtaText={secondaryCtaText}
                                secondaryCtaHref={secondaryCtaHref}
                                className="animate-slide-up"
                            />
                        </div>

                        <div className="min-w-0 flex-1 min-[480px]:max-lg:min-w-0 lg:flex-none">
                            <HeroQuickDonate />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
