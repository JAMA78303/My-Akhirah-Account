import type { Metadata } from "next";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

export const metadata: Metadata = {
    title: "About us | My Akhirah Account",
    description: "Learn about My Akhirah Account — mission, values, and how we work with communities.",
};

export default function AboutPage() {
    return (
        <PublicPageIntro
            title="About My Akhirah Account"
            description="We help donors give with clarity — trusted appeals, transparent delivery, and impact you can follow across Africa and beyond."
        >
            <div className="prose prose-neutral max-w-none text-account-black/85 space-y-4">
                <h2 className="text-xl font-bold text-akhirah-teal">Mission</h2>
                <p>
                    Charitable giving, community support, and spiritual growth rooted in faith. This page will expand
                    with leadership bios, governance, and partner stories (see `navigation-map.md` for content
                    owners).
                </p>
                <h2 className="text-xl font-bold text-akhirah-teal">What happens next</h2>
                <p>
                    Week 2 will separate intro, mission, and supporting blocks with clearer layout. Until then, use
                    Campaigns and Programmes from the navigation to explore how giving is deployed.
                </p>
            </div>
        </PublicPageIntro>
    );
}
