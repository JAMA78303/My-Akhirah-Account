import type { Metadata } from "next";
import Link from "next/link";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

export const metadata: Metadata = {
    title: "Blog | My Akhirah Account",
    description: "News, guides, and stories from our teams and partners.",
};

export default function BlogPage() {
    return (
        <PublicPageIntro
            title="Blog and stories"
            description="Guides on Zakat and Sadaqah, field updates, and volunteer stories. Article pages load from the content system — the homepage shows the latest posts."
        >
            <Link href="/" className="btn btn-primary font-bold">
                Latest on homepage
            </Link>
        </PublicPageIntro>
    );
}
