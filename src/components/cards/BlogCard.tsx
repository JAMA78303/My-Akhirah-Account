import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
    title: string;
    category: string;
    excerpt: string;
    imageUrl: string;
    href: string;
    date?: string;
    datetime?: string;
}

export default function BlogCard({
    title,
    category,
    excerpt,
    imageUrl,
    href,
    date,
    datetime,
}: BlogCardProps) {
    return (
        <article className="card group flex h-full min-w-0 flex-col">
            <Link href={href} className="block flex flex-col h-full">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="inline-block px-2.5 py-1 bg-eternal-gold text-account-black text-xs font-bold rounded-sm uppercase tracking-wide">
                            {category}
                        </span>
                    </div>
                </div>
                <div className="p-4 md:p-5 flex flex-col flex-1">
                    {date && (
                        <time dateTime={datetime} className="text-xs font-medium text-akhirah-teal/80 mb-2">
                            {date}
                        </time>
                    )}
                    <h3 className="font-bold text-lg mb-2 text-account-black group-hover:text-akhirah-teal transition-colors line-clamp-2 leading-snug">
                        {title}
                    </h3>
                    <p className="text-account-black/70 text-sm line-clamp-3 mb-4 flex-1">{excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-akhirah-teal group-hover:text-eternal-gold transition-colors">
                        Read more
                        <span aria-hidden>→</span>
                    </span>
                </div>
            </Link>
        </article>
    );
}
