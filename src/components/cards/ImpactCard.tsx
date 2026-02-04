import Image from "next/image";
import Link from "next/link";

interface ImpactCardProps {
    title: string;
    description: string;
    imageUrl: string;
    stat?: string;
    statLabel?: string;
    href?: string;
}

export default function ImpactCard({
    title,
    description,
    imageUrl,
    stat,
    statLabel,
    href,
}: ImpactCardProps) {
    const content = (
        <>
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {stat && statLabel && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="text-white">
                            <span className="text-3xl font-bold text-eternal-gold">{stat}</span>
                            <span className="block text-sm text-white/80">{statLabel}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-account-black group-hover:text-akhirah-teal transition-colors">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
            </div>
        </>
    );

    if (href) {
        return (
            <article className="card group">
                <Link href={href} className="block">
                    {content}
                </Link>
            </article>
        );
    }

    return <article className="card group">{content}</article>;
}
