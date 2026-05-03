import Link from "next/link";
import { Footer, Header } from "@/components";

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
      {
        question: "How do I make a donation?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "Can I make a one-off or recurring donation?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "Can I donate to a specific cause?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "Is my payment secure?",
        answer: "TODO: Mikhail copy",
      },
    ],
  },
  {
    id: "receipts",
    title: "Receipts",
    intro: "Clear records of your giving, honouring the amanah of every donation.",
    items: [
      {
        question: "Will I receive a donation receipt?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "How long does it take to receive my receipt?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "Can I request a copy of a past receipt?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "There is an error on my receipt — what should I do?",
        answer: "TODO: Mikhail copy",
      },
    ],
  },
  {
    id: "zakat-sadaqah",
    title: "Zakat & Sadaqah",
    intro:
      "Your intention matters. We treat every donation as an amanah — a trust placed in our hands — and handle Zakat and Sadaqah with the care and accountability they deserve.",
    items: [
      {
        question: "Do you accept both Zakat and Sadaqah?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "How do you ensure Zakat funds are used correctly?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "Can I specify that my donation is Zakat?",
        answer: "TODO: Mikhail copy",
      },
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
      {
        question: "How do I register as a volunteer?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "Do all volunteer roles require background checks?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "Do I need experience to volunteer?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "Can I volunteer remotely?",
        answer: "TODO: Mikhail copy",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    intro: "We are here to help. Please reach out and we will respond with care.",
    items: [
      {
        question: "How do I contact your team?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "Can I raise a concern about how a donation was used?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "How quickly will you respond?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "How do I report an urgent safeguarding concern?",
        answer: "TODO: Mikhail copy",
      },
    ],
  },
  {
    id: "transparency",
    title: "Transparency",
    intro: "We believe donors deserve to know exactly how their trust is being honoured.",
    items: [
      {
        question: "How do you decide which projects to fund?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "How do you keep donors informed about where funds go?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "How do you vet partner organisations on the ground?",
        answer: "TODO: Mikhail copy",
      },
      {
        question: "Where can I read about your safeguarding approach?",
        answer: "TODO: Mikhail copy",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="min-w-0 flex-1 bg-purity-white">
        <section className="bg-akhirah-teal text-purity-white border-b border-white/10">
          <div className="container-custom max-w-full py-14 sm:py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-eternal-gold mb-3">Support</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance break-words mb-4">Frequently Asked Questions</h1>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed">
                Clear answers on donations, receipts, Zakat and Sadaqah, volunteering, contact routes, and how we
                protect your trust.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-purity-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              {faqSections.map((section, index) => (
                <article
                  key={section.id}
                  id={section.id}
                  className={`rounded-sm border border-akhirah-teal/15 p-5 sm:p-6 md:p-8 ${index % 2 === 1 ? "bg-mercy-mint/40" : "bg-purity-white"}`}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-akhirah-teal text-balance break-words mb-2">{section.title}</h2>
                  <p className="text-account-black/75 text-sm sm:text-base mb-6">{section.intro}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {section.items.map((item) => (
                      <details key={item.question} className="group rounded-sm border border-akhirah-teal/15 bg-purity-white p-4 sm:p-5">
                        <summary className="min-h-11 cursor-pointer list-none pr-7 text-base sm:text-lg leading-snug font-semibold text-account-black break-words relative">
                          {item.question}
                          <span className="absolute right-0 top-0 text-akhirah-teal/70 group-open:hidden" aria-hidden>
                            +
                          </span>
                          <span className="absolute right-0 top-0 hidden text-akhirah-teal/70 group-open:inline" aria-hidden>
                            −
                          </span>
                        </summary>
                        <p className="mt-3 text-account-black/80 text-sm sm:text-base leading-relaxed">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-akhirah-teal">
          <div className="container-custom">
            <div className="max-w-4xl rounded-sm border border-white/15 bg-white/5 p-5 sm:p-6 md:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-purity-white mb-3">Trust and safeguarding support</h2>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-6">
                We are committed to responsible stewardship, clear accountability, and safe reporting routes for every
                supporter, volunteer, and beneficiary.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <Link href="/safeguarding" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/30 px-4 py-2 text-purity-white hover:text-eternal-gold hover:border-eternal-gold transition-colors">
                  Safeguarding Policy
                </Link>
                <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/30 px-4 py-2 text-purity-white hover:text-eternal-gold hover:border-eternal-gold transition-colors">
                  Contact Us
                </Link>
                <Link href="/volunteer" className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/30 px-4 py-2 text-purity-white hover:text-eternal-gold hover:border-eternal-gold transition-colors">
                  Volunteer With Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
