import type { Metadata } from "next";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

export const metadata: Metadata = {
    title: "Terms | My Akhirah Account",
    description: "Terms of use for the My Akhirah Account website.",
};

export default function TermsPage() {
    return (
        <PublicPageIntro
            title="Terms of use"
            description="Placeholder structure until legal copy is supplied. This page may later host annual report downloads if marketing prefers a single legal hub."
        >
            <div className="space-y-6 text-account-black/85 text-sm sm:text-base">
                <section>
                    <h2 className="text-lg font-bold text-akhirah-teal mb-2">Using this website</h2>
                    <p>Acceptable use, account behaviour (if any), and limitations — TBD.</p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-akhirah-teal mb-2">Donations</h2>
                    <p>How donations are processed, receipts, refunds, and third-party payment terms — TBD.</p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-akhirah-teal mb-2">Liability</h2>
                    <p>Governing law and limitation of liability — TBD.</p>
                </section>
            </div>
        </PublicPageIntro>
    );
}
