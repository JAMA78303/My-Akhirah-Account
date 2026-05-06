import type { Metadata } from "next";
import ComingSoonDetail from "../../ComingSoonDetail";

export const metadata: Metadata = {
    title: "Programme | My Akhirah Account",
};

type Props = { params: Promise<{ slug: string }> };

export default async function ProgrammeDetailPage({ params }: Props) {
    const { slug } = await params;
    return (
        <ComingSoonDetail kind="Programme" slug={slug} listHref="/programmes" listLabel="All programmes" />
    );
}
