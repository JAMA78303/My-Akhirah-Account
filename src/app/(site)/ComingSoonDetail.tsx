import Link from "next/link";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

type ComingSoonDetailProps = {
    kind: "Blog post" | "Event" | "Campaign" | "Programme";
    slug: string;
    listHref: string;
    listLabel: string;
};

function titleCaseSlug(slug: string) {
    return slug
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function ComingSoonDetail({ kind, slug, listHref, listLabel }: ComingSoonDetailProps) {
    const readable = titleCaseSlug(slug) || slug;
    return (
        <PublicPageIntro
            title={`${kind}: ${readable}`}
            description="Full content for this page is not published on the preview site yet. You can still browse the main section below."
        >
            <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link href={listHref} className="btn btn-secondary font-semibold">
                    {listLabel}
                </Link>
                <p className="text-sm text-account-black/60">
                    Slug:{" "}
                    <code className="rounded-sm bg-mercy-mint px-2 py-1 text-account-black">{slug}</code>
                </p>
            </div>
        </PublicPageIntro>
    );
}
