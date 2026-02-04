import {
  Header,
  Footer,
  Hero,
  SectionHeader,
  Banner,
  Stats,
  BlogCard,
  EventCard,
  ImpactCard,
  CampaignCard,
} from "@/components";
import {
  mockBlogs,
  mockEvents,
  mockCampaigns,
  mockImpacts,
  mockStats,
} from "@/lib/mockData";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <Hero
          title="Zakat is our Sacred Duty"
          subtitle="Transform lives through the power of giving. Join us in building a better future for communities in need around the world."
          ctaText="Donate Now"
          ctaHref="/donate"
          secondaryCtaText="Learn More"
          secondaryCtaHref="/about"
          backgroundImage="/hero-bg.jpg"
        />

        {/* Stats Section */}
        <Stats stats={mockStats} />

        {/* Worldwide Resources Section */}
        <section className="section bg-gray-50">
          <div className="container-custom">
            <SectionHeader
              title="Worldwide Resources"
              subtitle="Explore our educational content and inspiring stories from around the globe."
              viewAllHref="/blog"
              viewAllText="View All Articles"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          </div>
        </section>

        {/* Support Palestine Banner */}
        <Banner
          title="Support Palestine and Sudan"
          description="Help provide urgent humanitarian aid to families affected by conflict. Your donation provides food, clean water, and medical supplies to those who need it most."
          ctaText="Donate Now"
          ctaHref="/campaigns/gaza-relief"
          imageUrl="/hero-bg.jpg"
          variant="gold"
        />

        {/* Selected Sadaqah Types */}
        <section className="section">
          <div className="container-custom">
            <SectionHeader
              title="Selected Sadaqah Types"
              subtitle="Choose how you want to make a difference in the world."
              viewAllHref="/projects"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockImpacts.map((impact) => (
                <ImpactCard key={impact.id} {...impact} />
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="section bg-gray-50">
          <div className="container-custom">
            <SectionHeader
              title="Upcoming Events"
              subtitle="Join us at our upcoming gatherings and make a difference together."
              viewAllHref="/events"
              viewAllText="See All Events"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </section>

        {/* Why participate in collections banner */}
        <Banner
          title="Why Participate in Collections?"
          description="Your contributions, no matter how small, create ripples of change across communities. Every pound raised goes directly towards transforming lives and supporting those in need."
          ctaText="Start Fundraising"
          ctaHref="/fundraise"
          imageUrl="/hero-bg.jpg"
          variant="secondary"
        />

        {/* Active Campaigns */}
        <section className="section">
          <div className="container-custom">
            <SectionHeader
              title="Support Our Upcoming Work"
              subtitle="Help us reach our fundraising goals and create lasting impact."
              viewAllHref="/campaigns"
              viewAllText="View All Campaigns"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} {...campaign} />
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Banner */}
        <Banner
          title="Our Story"
          description="For over 15 years, My Akhirah Account has been dedicated to serving humanity and helping Muslims invest in their hereafter through meaningful charitable work."
          ctaText="About Us"
          ctaHref="/about"
          imageUrl="/hero-bg.jpg"
          variant="primary"
        />
      </main>

      <Footer />
    </>
  );
}
