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
        <article className="card group">
            <Link href={href} className="block">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="inline-block px-3 py-1 bg-eternal-gold text-account-black text-xs font-semibold rounded-full">
                            {category}
                        </span>
                    </div>
                </div>
                <div className="p-4">
                    {date && (
                        <time dateTime={datetime} className="text-sm text-gray-500 mb-2 block">{date}</time>
                    )}
                    <h3 className="font-bold text-lg mb-2 text-account-black group-hover:text-akhirah-teal transition-colors line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{excerpt}</p>
                </div>
            </Link>
        </article>
    );
}
