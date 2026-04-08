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
    const body = (
        <>
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={imageUrl}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {stat && statLabel && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-account-black/85 to-transparent p-4">
                        <div className="text-purity-white">
                            <span className="text-2xl md:text-3xl font-bold text-eternal-gold">{stat}</span>
                            <span className="block text-xs font-medium text-white/85 uppercase tracking-wide">
                                {statLabel}
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 md:p-5 bg-akhirah-teal text-purity-white flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-2 group-hover:text-eternal-gold transition-colors leading-snug">
                    {title}
                </h3>
                <p className="text-white/85 text-sm line-clamp-3 leading-relaxed flex-1">{description}</p>
                {href && (
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-eternal-gold">
                        Learn more
                        <span aria-hidden>→</span>
                    </span>
                )}
            </div>
        </>
    );

    if (href) {
        return (
            <article className="card group flex h-full min-w-0 flex-col overflow-hidden">
                <Link href={href} className="block flex flex-col h-full">
                    {body}
                </Link>
            </article>
        );
    }

    return (
        <article className="card group flex h-full min-w-0 flex-col overflow-hidden">
            {body}
        </article>
    );
}
