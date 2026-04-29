import { Footer, Header } from "@/components";

const skeletonCards = ["campaign-card-1", "campaign-card-2", "campaign-card-3"];

export default function CampaignsLoading() {
  return (
    <>
      <Header />

      <main className="min-w-0 flex-1 bg-purity-white">
        <section className="section">
          <div className="container-custom">
            <div className="mb-8 max-w-3xl md:mb-10">
              <div className="mb-3 h-4 w-24 animate-pulse rounded-sm bg-akhirah-teal/15" />
              <div className="mb-4 h-10 w-full max-w-lg animate-pulse rounded-sm bg-account-black/10 md:h-14" />
              <div className="h-5 w-full max-w-2xl animate-pulse rounded-sm bg-account-black/10" />
              <div className="mt-2 h-5 w-3/4 max-w-xl animate-pulse rounded-sm bg-account-black/10" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
              {skeletonCards.map((card) => (
                <article key={card} className="card flex h-full min-w-0 flex-col">
                  <div className="aspect-video animate-pulse bg-mercy-mint" />
                  <div className="flex flex-1 flex-col p-4 md:p-5">
                    <div className="mb-2 h-6 w-3/4 animate-pulse rounded-sm bg-account-black/10" />
                    <div className="mb-4 h-4 w-full animate-pulse rounded-sm bg-account-black/10" />
                    <div className="mb-4 h-4 w-2/3 animate-pulse rounded-sm bg-account-black/10" />
                    <div className="mb-2 h-2 animate-pulse rounded-sm border border-akhirah-teal/10 bg-mercy-mint" />
                    <div className="flex justify-between">
                      <div className="h-4 w-24 animate-pulse rounded-sm bg-akhirah-teal/15" />
                      <div className="h-4 w-20 animate-pulse rounded-sm bg-account-black/10" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
