import type { Metadata } from "next";
import { CampaignCard, Footer, Header } from "@/components";
import { mockCampaigns } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Campaigns | My Akhirah Account",
  description:
    "Support active My Akhirah Account appeals funding urgent relief, recovery, and care.",
};

export default function CampaignsPage() {
  return (
    <>
      <Header />

      <main className="min-w-0 flex-1 bg-purity-white">
        <section className="section">
          <div className="container-custom">
            <div className="mb-8 max-w-3xl md:mb-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-akhirah-teal">
                Campaigns
              </p>
              <h1 className="mb-4 text-3xl font-bold text-account-black md:text-5xl">
                Support active appeals
              </h1>
              <p className="text-base leading-relaxed text-account-black/70 md:text-lg">
                Choose a live campaign and help fund urgent relief, recovery, and care for
                communities who need support now.
              </p>
            </div>

            {mockCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
                {mockCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} {...campaign} />
                ))}
              </div>
            ) : (
              <div className="border border-akhirah-teal/10 bg-mercy-mint p-6 text-center md:p-8">
                <h2 className="mb-2 text-xl font-bold text-account-black">
                  No campaigns are live right now
                </h2>
                <p className="mx-auto max-w-xl text-sm leading-relaxed text-account-black/70 md:text-base">
                  Please check back soon for new appeals and ways to give.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
