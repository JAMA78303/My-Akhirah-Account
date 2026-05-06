import type { Metadata } from "next";
import Link from "next/link";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

export const metadata: Metadata = {
    title: "Thank you | My Akhirah Account",
    description: "Your donation was received.",
};

type Props = {
    searchParams: Promise<{ ref?: string }>;
};

export default async function DonateSuccessPage({ searchParams }: Props) {
    const sp = await searchParams;
    const ref = sp.ref?.trim();

    return (
        <PublicPageIntro
            title="Thank you"
            description="Your payment was submitted successfully. You will receive a confirmation by email when processing completes."
        >
            {ref ? (
                <p className="mb-6 text-sm text-account-black/75">
                    Reference:{" "}
                    <code className="rounded-sm bg-mercy-mint px-2 py-1 text-account-black">{ref}</code>
                </p>
            ) : null}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/" className="btn btn-primary font-bold text-center">
                    Back to home
                </Link>
                <Link href="/campaigns" className="btn btn-secondary font-semibold text-center">
                    More ways to give
                </Link>
            </div>
        </PublicPageIntro>
    );
}
