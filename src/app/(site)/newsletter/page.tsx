import type { Metadata } from "next";
import Link from "next/link";
import PublicPageIntro from "@/components/layout/PublicPageIntro";
import NewsletterSubscribeForm from "@/components/forms/NewsletterSubscribeForm";

export const metadata: Metadata = {
    title: "Newsletter | My Akhirah Account",
    description: "Occasional updates on impact, events, and ways to give with intention.",
};

export default function NewsletterPage() {
    return (
        <PublicPageIntro
            title="Newsletter"
            description="Occasional updates on impact, events, and ways to give with intention. We never sell your data — see our Privacy page for how we handle information."
        >
            <div className="rounded-sm border border-akhirah-teal/15 bg-mercy-mint/30 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-akhirah-teal mb-4">Sign up</h2>
                <NewsletterSubscribeForm source="newsletter-page" layout="stacked" />
            </div>
            <p className="mt-8 text-sm text-account-black/60">
                You can also subscribe from the{" "}
                <Link href="/#site-newsletter" className="font-semibold text-akhirah-teal underline underline-offset-2">
                    site footer
                </Link>{" "}
                on any page — the same secure endpoint is used.
            </p>
        </PublicPageIntro>
    );
}
