import Image from "next/image";
import Link from "next/link";

interface BannerProps {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    imageUrl?: string;
    variant?: "primary" | "secondary" | "gold";
    reverse?: boolean;
}

export default function Banner({
    title,
    description,
    ctaText,
    ctaHref,
    imageUrl,
    variant = "primary",
    reverse = false,
}: BannerProps) {
    const bgColors = {
        primary: "bg-akhirah-teal",
        secondary: "bg-account-black",
        gold: "bg-eternal-gold",
    };

    const textColors = {
        primary: "text-white",
        secondary: "text-white",
        gold: "text-account-black",
    };

    const buttonStyles = {
        primary: "btn-primary",
        secondary: "bg-eternal-gold text-account-black hover:bg-[#e09a1f]",
        gold: "btn-secondary",
    };

    const textOrder = reverse ? "md:order-2" : "md:order-1";
    const imageOrder = reverse ? "md:order-1" : "md:order-2";

    return (
        <section className={`${bgColors[variant]} ${textColors[variant]} overflow-x-clip`}>
            <div className="container-custom max-w-full">
                <div className="grid min-w-0 md:grid-cols-2 gap-0 items-stretch">
                    <div
                        className={`flex min-w-0 flex-col justify-center py-10 sm:py-12 md:py-16 lg:py-20 md:pr-6 lg:pr-8 ${textOrder}`}
                    >
                        <h2 className="text-balance text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4">
                            {title}
                        </h2>
                        <p
                            className={`mb-5 sm:mb-6 max-w-xl text-sm leading-relaxed sm:text-base ${
                                variant === "gold" ? "text-account-black/85" : "opacity-90"
                            }`}
                        >
                            {description}
                        </p>
                        <Link
                            href={ctaHref}
                            className={`btn w-full min-h-11 sm:w-fit ${buttonStyles[variant]}`}
                        >
                            {ctaText}
                        </Link>
                    </div>
                    {imageUrl && (
                        <div
                            className={`relative min-h-[200px] w-full min-w-0 sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px] ${imageOrder}`}
                        >
                            <Image
                                src={imageUrl}
                                alt=""
                                fill
                                className="object-cover md:rounded-sm"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
