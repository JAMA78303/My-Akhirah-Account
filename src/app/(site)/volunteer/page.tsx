import type { Metadata } from "next";
import Link from "next/link";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

export const metadata: Metadata = {
    title: "Volunteer | My Akhirah Account",
    description: "Volunteer with My Akhirah Account — events, distributions, and remote help.",
};

export default function VolunteerPage() {
    return (
        <PublicPageIntro
            title="Volunteer"
            description="From warehouse days to community events, volunteers help us deliver with dignity. Application UX is scheduled for Week 3; the API route exists at /api/volunteer."
        >
            <ul className="list-disc pl-5 space-y-2 text-account-black/85 mb-8">
                <li>Distribution and packing days</li>
                <li>Community events and outreach</li>
                <li>Remote skills (design, translation, comms)</li>
            </ul>
            <Link href="/contact" className="btn btn-secondary font-semibold">
                Contact the team
            </Link>
        </PublicPageIntro>
    );
}
