import type { Metadata } from "next";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

export const metadata: Metadata = {
    title: "Privacy | My Akhirah Account",
    description: "How we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
    return (
        <PublicPageIntro
            title="Privacy policy"
            description="Placeholder structure until legal copy is supplied (see navigation-map.md — Mikhail / legal owner)."
        >
            <div className="space-y-6 text-account-black/85 text-sm sm:text-base">
                <section>
                    <h2 className="text-lg font-bold text-akhirah-teal mb-2">Who we are</h2>
                    <p>Controller name, registration number, and registered address — TBD.</p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-akhirah-teal mb-2">What we collect</h2>
                    <p>Donor details, payment metadata handled by our provider, website analytics — TBD.</p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-akhirah-teal mb-2">Your rights</h2>
                    <p>Access, correction, erasure, objection — TBD with jurisdiction-specific wording.</p>
                </section>
            </div>
        </PublicPageIntro>
    );
}
