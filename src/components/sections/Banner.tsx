import Image from "next/image";
import Link from "next/link";

interface BannerProps {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    imageUrl?: string;
    variant?: "primary" | "secondary" | "gold";
}

export default function Banner({
    title,
    description,
    ctaText,
    ctaHref,
    imageUrl,
    variant = "primary",
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
        primary: "bg-eternal-gold text-account-black hover:bg-yellow-400",
        secondary: "bg-akhirah-teal text-white hover:bg-teal-700",
        gold: "bg-account-black text-white hover:bg-gray-800",
    };

    return (
        <section className={`${bgColors[variant]} ${textColors[variant]} overflow-hidden`}>
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-16">
                    <div className="order-2 md:order-1">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                            {title}
                        </h2>
                        <p className={`mb-6 ${variant === "gold" ? "text-gray-700" : "opacity-90"}`}>
                            {description}
                        </p>
                        <Link
                            href={ctaHref}
                            className={`btn ${buttonStyles[variant]}`}
                        >
                            {ctaText}
                        </Link>
                    </div>
                    {imageUrl && (
                        <div className="order-1 md:order-2 relative aspect-video md:aspect-square rounded-lg overflow-hidden">
                            <Image
                                src={imageUrl}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
