import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "FAQ | My Akhirah Account",
    description:
        "Clear answers on donations, receipts, Zakat and Sadaqah, volunteering, contact routes, and how we protect your trust.",
};

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqSection {
    id: string;
    title: string;
    intro: string;
    items: FaqItem[];
}

const faqSections: FaqSection[] = [
    {
        id: "donations",
        title: "Donations",
        intro: "Everything you need to know about giving through My Akhirah Account.",
        items: [
            { question: "How do I make a donation?", answer: "TODO: Mikhail copy" },
            { question: "Can I make a one-off or recurring donation?", answer: "TODO: Mikhail copy" },
            { question: "Can I donate to a specific cause?", answer: "TODO: Mikhail copy" },
            { question: "Is my payment secure?", answer: "TODO: Mikhail copy" },
        ],
    },
    {
        id: "receipts",
        title: "Receipts",
        intro: "Clear records of your giving, honouring the amanah of every donation.",
        items: [
            { question: "Will I receive a donation receipt?", answer: "TODO: Mikhail copy" },
            { question: "How long does it take to receive my receipt?", answer: "TODO: Mikhail copy" },
            { question: "Can I request a copy of a past receipt?", answer: "TODO: Mikhail copy" },
            { question: "There is an error on my receipt — what should I do?", answer: "TODO: Mikhail copy" },
        ],
    },
    {
        id: "zakat-sadaqah",
        title: "Zakat & Sadaqah",
        intro:
            "Your intention matters. We treat every donation as an amanah — a trust placed in our hands — and handle Zakat and Sadaqah with the care and accountability they deserve.",
        items: [
            { question: "Do you accept both Zakat and Sadaqah?", answer: "TODO: Mikhail copy" },
            { question: "How do you ensure Zakat funds are used correctly?", answer: "TODO: Mikhail copy" },
            { question: "Can I specify that my donation is Zakat?", answer: "TODO: Mikhail copy" },
            {
                question: "What is Sadaqah Jariyah and can I give it through your platform?",
                answer: "TODO: Mikhail copy",
            },
        ],
    },
    {
        id: "volunteering",
        title: "Volunteering",
        intro: "Giving your time is a form of sadaqah. Here is how to get involved.",
        items: [
            { question: "How do I register as a volunteer?", answer: "TODO: Mikhail copy" },
            { question: "Do all volunteer roles require background checks?", answer: "TODO: Mikhail copy" },
            { question: "Do I need experience to volunteer?", answer: "TODO: Mikhail copy" },
            { question: "Can I volunteer remotely?", answer: "TODO: Mikhail copy" },
        ],
    },
    {
        id: "contact",
        title: "Contact",
        intro: "We are here to help. Please reach out and we will respond with care.",
        items: [
            { question: "How do I contact your team?", answer: "TODO: Mikhail copy" },
            { question: "Can I raise a concern about how a donation was used?", answer: "TODO: Mikhail copy" },
            { question: "How quickly will you respond?", answer: "TODO: Mikhail copy" },
            { question: "How do I report an urgent safeguarding concern?", answer: "TODO: Mikhail copy" },
        ],
    },
    {
        id: "transparency",
        title: "Transparency",
        intro: "We believe donors deserve to know exactly how their trust is being honoured.",
        items: [
            { question: "How do you decide which projects to fund?", answer: "TODO: Mikhail copy" },
            { question: "How do you keep donors informed about where funds go?", answer: "TODO: Mikhail copy" },
            { question: "How do you vet partner organisations on the ground?", answer: "TODO: Mikhail copy" },
            { question: "Where can I read about your safeguarding approach?", answer: "TODO: Mikhail copy" },
        ],
    },
];

export default function FaqPage() {
    return (
        <main className="min-w-0 flex-1 bg-purity-white">
            <section className="bg-akhirah-teal text-purity-white border-b border-white/10">
                <div className="container-custom max-w-full py-14 sm:py-16 md:py-20">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-wider text-eternal-gold mb-3">Support</p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance break-words mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-white/85 text-base sm:text-lg leading-relaxed">
                            Clear answers on donations, receipts, Zakat and Sadaqah, volunteering, contact routes, and
                            how we protect your trust.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section bg-purity-white">
                <div className="container-custom">
                    <nav
                        aria-label="Jump to FAQ sections"
                        className="mb-8 rounded-sm border border-akhirah-teal/15 bg-mercy-mint/30 p-3 sm:p-4"
                    >
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-akhirah-teal">
                            Jump to a topic
                        </p>
                        <ul className="flex flex-wrap gap-2 sm:gap-2.5">
                            {faqSections.map((section) => (
                                <li key={section.id}>
                                    <Link
                                        href={`#${section.id}`}
                                        className="inline-flex min-h-11 items-center rounded-sm border border-akhirah-teal/20 bg-purity-white px-3 py-2 text-sm font-semibold text-akhirah-teal transition-colors hover:border-akhirah-teal/40 hover:bg-mercy-mint/50"
                                    >
                                        {section.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="grid grid-cols-1 gap-6 lg:gap-8">
                        {faqSections.map((section, index) => (
                            <article
                                key={section.id}
                                id={section.id}
                                className={`scroll-mt-28 rounded-sm border border-akhirah-teal/15 p-5 sm:p-6 md:p-8 ${
                                    index % 2 === 1 ? "bg-mercy-mint/40" : "bg-purity-white"
                                }`}
                            >
                                <h2 className="text-2xl sm:text-3xl font-bold text-akhirah-teal text-balance break-words mb-2">
                                    {section.title}
                                </h2>
                                <p className="mb-6 break-words text-sm text-account-black/75 sm:text-base">{section.intro}</p>

                                <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                                    {section.items.map((item) => (
                                        <details
                                            key={item.question}
                                            className="group min-w-0 overflow-hidden rounded-sm border border-akhirah-teal/15 bg-purity-white p-4 sm:p-5"
                                        >
                                            <summary className="flex min-h-11 cursor-pointer list-none items-start gap-3 text-base font-semibold leading-snug text-account-black sm:text-lg">
                                                <span className="min-w-0 flex-1 break-words">{item.question}</span>
                                                <span
                                                    className="shrink-0 pt-0.5 text-lg leading-none text-akhirah-teal/70 group-open:hidden"
                                                    aria-hidden
                                                >
                                                    +
                                                </span>
                                                <span
                                                    className="hidden shrink-0 pt-0.5 text-lg leading-none text-akhirah-teal/70 group-open:inline"
                                                    aria-hidden
                                                >
                                                    −
                                                </span>
                                            </summary>
                                            <p className="mt-3 max-w-full break-words text-sm leading-relaxed text-account-black/80 sm:text-base">
                                                {item.answer}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section border-t border-white/10 bg-akhirah-teal">
                <div className="container-custom">
                    <div className="max-w-4xl rounded-sm border border-white/15 bg-white/5 p-6 sm:p-7 md:p-8">
                        <h2 className="mb-3 text-2xl font-bold text-purity-white sm:text-3xl">
                            Trust and safeguarding support
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed text-white/85 sm:text-base">
                            We are committed to responsible stewardship, clear accountability, and safe reporting routes
                            for every supporter, volunteer, and beneficiary.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Link
                                href="/faq#transparency"
                                title="Opens Transparency FAQ until /safeguarding ships"
                                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/30 px-4 py-2 text-purity-white transition-colors hover:border-eternal-gold hover:text-eternal-gold"
                            >
                                Safeguarding policy
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/30 px-4 py-2 text-purity-white hover:text-eternal-gold hover:border-eternal-gold transition-colors"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/volunteer"
                                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/30 px-4 py-2 text-purity-white hover:text-eternal-gold hover:border-eternal-gold transition-colors"
                            >
                                Volunteer With Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
