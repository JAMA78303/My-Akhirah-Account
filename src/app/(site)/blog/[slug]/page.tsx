import type { Metadata } from "next";
import ComingSoonDetail from "../../ComingSoonDetail";

export const metadata: Metadata = {
    title: "Article | My Akhirah Account",
};

type Props = { params: Promise<{ slug: string }> };

export default async function BlogArticlePage({ params }: Props) {
    const { slug } = await params;
    return <ComingSoonDetail kind="Blog post" slug={slug} listHref="/blog" listLabel="All articles" />;
}
