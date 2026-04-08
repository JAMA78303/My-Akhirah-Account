import Image from "next/image";
import Link from "next/link";

interface StoryCardProps {
    title: string;
    excerpt: string;
    imageUrl: string;
    href: string;
}

export default function StoryCard({ title, excerpt, imageUrl, href }: StoryCardProps) {
    return (
        <article className="group relative min-h-[220px] w-full min-w-0 overflow-hidden rounded-sm border border-akhirah-teal/10 sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]">
            <Link href={href} className="block h-full min-h-[inherit]">
                <Image
                    src={imageUrl}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-account-black/90 via-account-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-purity-white sm:p-5 md:p-6">
                    <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 leading-snug text-balance group-hover:text-eternal-gold transition-colors">
                        {title}
                    </h3>
                    <p className="text-xs text-white/85 line-clamp-2 mb-2 sm:text-sm sm:mb-3">{excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-eternal-gold sm:text-sm">
                        Read more
                        <span aria-hidden>→</span>
                    </span>
                </div>
            </Link>
        </article>
    );
}
