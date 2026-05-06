import type { Metadata } from "next";
import Link from "next/link";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

export const metadata: Metadata = {
    title: "Donate | My Akhirah Account",
    description: "Support appeals and programmes through My Akhirah Account.",
};

type Props = {
    searchParams: Promise<{ cancelled?: string }>;
};

export default async function DonatePage({ searchParams }: Props) {
    const sp = await searchParams;
    const cancelled = sp.cancelled === "true";

    return (
        <PublicPageIntro
            title="Donate"
            description="Choose an appeal or programme, then complete secure checkout. Checkout behaviour and return URLs are owned by Mikhail — use sandbox credentials until approved for production testing."
        >
            {cancelled ? (
                <p
                    className="mb-6 rounded-sm border border-akhirah-teal/20 bg-mercy-mint/60 px-4 py-3 text-sm text-account-black"
                    role="status"
                >
                    Checkout was cancelled. No payment was taken. You can start again below or browse live appeals.
                </p>
            ) : null}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/campaigns" className="btn btn-primary font-bold text-center">
                    Browse campaigns
                </Link>
                <Link href="/programmes" className="btn btn-secondary font-semibold text-center">
                    Explore programmes
                </Link>
            </div>
            <p className="mt-8 text-sm text-account-black/65">
                Full donation UI and hosted checkout integration will continue to evolve alongside the payments work
                stream — this page keeps CTAs within the approved public route set.
            </p>
        </PublicPageIntro>
    );
}
