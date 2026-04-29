import Image from "next/image";
import Link from "next/link";
import CampaignProgress from "@/components/campaigns/CampaignProgress";

interface CampaignCardProps {
  title: string;
  description: string;
  imageUrl: string;
  goal: number;
  raised: number;
  href: string;
}

export default function CampaignCard({
  title,
  description,
  imageUrl,
  goal,
  raised,
  href,
}: CampaignCardProps) {
  return (
    <article className="card group flex h-full min-w-0 flex-col">
      <Link href={href} className="block flex h-full flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-4 md:p-5">
          <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-account-black transition-colors group-hover:text-akhirah-teal">
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 flex-1 text-sm text-account-black/70">
            {description}
          </p>

          <CampaignProgress title={title} raised={raised} goal={goal} />
        </div>
      </Link>
    </article>
  );
}
