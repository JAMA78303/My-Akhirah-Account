import type { Metadata } from "next";
import Link from "next/link";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

export const metadata: Metadata = {
    title: "Events | My Akhirah Account",
    description: "Community events, clinics, and volunteer days.",
};

export default function EventsPage() {
    return (
        <PublicPageIntro
            title="Events"
            description="Meet the team, join a Zakat clinic, or sign up for a distribution day. Upcoming listings also appear on the homepage."
        >
            <Link href="/" className="btn btn-primary font-bold">
                See homepage events
            </Link>
        </PublicPageIntro>
    );
}
