import type { Metadata } from "next";
import ComingSoonDetail from "../../ComingSoonDetail";

export const metadata: Metadata = {
    title: "Event | My Akhirah Account",
};

type Props = { params: Promise<{ slug: string }> };

export default async function EventDetailPage({ params }: Props) {
    const { slug } = await params;
    return <ComingSoonDetail kind="Event" slug={slug} listHref="/events" listLabel="All events" />;
}
