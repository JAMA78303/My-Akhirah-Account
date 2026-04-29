import Image from "next/image";
import Link from "next/link";
import CampaignProgress from "@/components/campaigns/CampaignProgress";
import { Footer, Header } from "@/components";
import { mockCampaigns } from "@/lib/mockData";

interface CampaignPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getSlugFromHref = (href: string) => href.split("/").filter(Boolean).at(-1);

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params;
  const campaign = mockCampaigns.find((item) => getSlugFromHref(item.href) === slug);

  if (!campaign) {
    return (
      <>
        <Header />

        <main className="min-w-0 flex-1 bg-purity-white">
          <section className="section">
            <div className="container-custom max-w-3xl">
              <Link
                href="/campaigns"
                className="mb-6 inline-flex text-sm font-semibold text-akhirah-teal hover:text-akhirah-teal-dark"
              >
                Back to campaigns
              </Link>
              <div className="border border-akhirah-teal/10 bg-mercy-mint p-6 md:p-8">
                <h1 className="mb-3 text-3xl font-bold text-account-black md:text-4xl">
                  Campaign not found
                </h1>
                <p className="text-base leading-relaxed text-account-black/70">
                  This campaign is not available. Please return to the campaign list to
                  choose an active appeal.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-w-0 flex-1 bg-purity-white">
        <section className="section">
          <div className="container-custom">
            <Link
              href="/campaigns"
              className="mb-6 inline-flex text-sm font-semibold text-akhirah-teal hover:text-akhirah-teal-dark"
            >
              Back to campaigns
            </Link>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.72fr)] lg:gap-10">
              <div>
                <h1 className="mb-4 text-3xl font-bold text-account-black md:text-5xl">
                  {campaign.title}
                </h1>
                <p className="max-w-3xl text-base leading-relaxed text-account-black/70 md:text-lg">
                  {campaign.description}
                </p>
              </div>

              <aside className="border border-akhirah-teal/10 bg-mercy-mint p-5 md:p-6">
                <CampaignProgress
                  title={campaign.title}
                  raised={campaign.raised}
                  goal={campaign.goal}
                  variant="detail"
                  className="mb-5"
                />

                <Link href="/donate" className="btn btn-primary w-full justify-center font-bold">
                  Donate
                </Link>
              </aside>
            </div>

            {campaign.imageUrl ? (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden border border-akhirah-teal/10 md:mt-10">
                <Image
                  src={campaign.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1120px"
                  priority
                />
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
