import type { Metadata } from "next";
import Link from "next/link";
import PublicPageIntro from "@/components/layout/PublicPageIntro";

export const metadata: Metadata = {
    title: "Contact | My Akhirah Account",
    description: "Get in touch with My Akhirah Account.",
};

export default function ContactPage() {
    return (
        <PublicPageIntro
            title="Contact us"
            description='We read every message. For volunteering, see the Volunteer page; for media, use the subject line "Media enquiry" when the form ships in Week 3.'
        >
            <div className="rounded-sm border border-akhirah-teal/15 bg-mercy-mint/40 p-6 mb-6">
                <p className="font-semibold text-akhirah-teal mb-2">Contact form</p>
                <p className="text-sm text-account-black/80">
                    The public contact form will be polished in Week 3 (field order, labels, success copy). The API
                    route already exists at <code className="text-xs">/api/contact</code>.
                </p>
            </div>
            <p className="text-sm text-account-black/70 mb-4">
                Until the form is embedded here, reach your team lead on the agreed internal channel for urgent
                enquiries.
            </p>
            <Link href="/volunteer" className="text-akhirah-teal font-semibold underline underline-offset-2">
                Volunteer with us
            </Link>
        </PublicPageIntro>
    );
}
