import Image from "next/image";
import Link from "next/link";

export interface EmergencyFeatured {
    headline: string;
    paragraphs: string[];
    closingLine: string;
    ctaText: string;
    ctaHref: string;
    imageSrc: string;
    imageAlt: string;
}

export interface EmergencyCardAppeal {
    headline: string;
    body: string;
    href: string;
}

interface EmergencyBarProps {
    featured: EmergencyFeatured;
    secondaryAppeals: [EmergencyCardAppeal, EmergencyCardAppeal];
    secondarySectionTitle: string;
}

export default function EmergencyBar({
    featured,
    secondaryAppeals,
    secondarySectionTitle,
}: EmergencyBarProps) {
    return (
        <section
            className="overflow-x-clip bg-purity-white pt-16 text-account-black sm:pt-20 md:pt-24"
            aria-label="Emergency appeals"
        >
            <div className="container-custom max-w-full">
                <div className="grid overflow-hidden rounded-sm md:grid-cols-2 md:min-h-[min(420px,70vh)]">
                    <div className="flex flex-col justify-center gap-4 bg-akhirah-teal px-6 py-10 text-purity-white sm:px-8 sm:py-12 md:px-10 md:py-14 lg:px-14 lg:py-16">
                        <h2 className="text-balance text-3xl font-bold italic leading-tight sm:text-4xl md:text-[2.25rem] lg:text-5xl">
                            {featured.headline}
                        </h2>
                        <div className="space-y-3 text-sm leading-relaxed text-white/90 sm:text-base md:space-y-4">
                            {featured.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                        <p className="text-sm font-medium leading-snug text-white/95 sm:text-base">
                            {featured.closingLine}
                        </p>
                        <div className="pt-1">
                            <Link
                                href={featured.ctaHref}
                                className="btn btn-primary min-h-11 w-full font-bold sm:w-fit"
                            >
                                {featured.ctaText}
                                <span aria-hidden>→</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative min-h-[220px] w-full md:min-h-0">
                        <Image
                            src={featured.imageSrc}
                            alt={featured.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) min(100vw, 1280px), 50vw"
                            priority
                        />
                    </div>
                </div>
            </div>

            <div className="container-custom max-w-full py-8 sm:py-10 md:py-12">
                <h3 className="mb-6 text-balance text-2xl font-bold italic text-account-black sm:mb-8 sm:text-3xl md:mb-10 md:text-4xl">
                    {secondarySectionTitle}
                </h3>
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
                    {secondaryAppeals.map((item) => (
                        <Link
                            key={item.headline}
                            href={item.href}
                            className="relative block min-h-[200px] rounded-sm bg-eternal-gold p-6 text-account-black shadow-sm shadow-account-black/10 transition-colors hover:bg-[#e09a1f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-akhirah-teal sm:min-h-0 sm:p-8 md:p-10"
                        >
                            <h4 className="mb-3 pr-8 text-lg font-bold italic leading-snug sm:text-xl md:mb-4">
                                {item.headline}
                            </h4>
                            <p className="max-w-prose text-sm leading-relaxed text-account-black/85 sm:text-base">
                                {item.body}
                            </p>
                            <span
                                className="absolute bottom-6 right-6 text-xl font-bold sm:bottom-8 sm:right-8 sm:text-2xl"
                                aria-hidden
                            >
                                →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
