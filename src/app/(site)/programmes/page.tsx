import type { Metadata } from "next";
import Link from "next/link";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

export const metadata: Metadata = {
    title: "Programmes | My Akhirah Account",
    description: "Long-running programme areas — water, food, health, education, and more.",
};

export default function ProgrammesPage() {
    return (
        <PublicPageIntro
            title="Programmes"
            description="Programmes are how we organise long-term work with communities — wells, clinics, schools, livelihoods, and emergency recovery."
        >
            <ul className="list-disc pl-5 space-y-2 text-account-black/85 mb-8">
                <li>Water &amp; sanitation</li>
                <li>Food security</li>
                <li>Health &amp; clinics</li>
                <li>Education</li>
                <li>Shelter &amp; recovery</li>
                <li>Livelihoods</li>
            </ul>
            <Link href="/" className="btn btn-secondary font-semibold">
                Back to homepage
            </Link>
        </PublicPageIntro>
    );
}
