// Mock data for the website - will be replaced with Convex queries later
// Using hero-bg.jpg as placeholder until proper images are available

export const mockBlogs = [
    {
        id: "1",
        title: "The Importance of Sadaqah Jariyah in Islam",
        category: "Education",
        excerpt: "Learn about the continuous charity that benefits you even after you pass away.",
        imageUrl: "/hero-bg.jpg",
        href: "/blog/sadaqah-jariyah",
        date: "January 15, 2026",
        datetime: "2026-01-15",
    },
    {
        id: "2",
        title: "How Your Zakat Transformed Lives This Year",
        category: "Impact",
        excerpt: "A look back at the incredible impact of your generous contributions.",
        imageUrl: "/hero-bg.jpg",
        href: "/blog/zakat-impact",
        date: "January 10, 2026",
        datetime: "2026-01-10",
    },
    {
        id: "3",
        title: "Building Wells in Remote Communities",
        category: "Projects",
        excerpt: "Our latest water project is bringing clean water to thousands of families.",
        imageUrl: "/hero-bg.jpg",
        href: "/blog/water-wells",
        date: "January 5, 2026",
        datetime: "2026-01-05",
    },
];

export const mockEvents = [
    {
        id: "1",
        title: "Annual Charity Gala Dinner",
        date: "March 15, 2026",
        datetime: "2026-03-15",
        location: "London, UK",
        imageUrl: "/hero-bg.jpg",
        href: "/events/gala-dinner",
        isUpcoming: true,
    },
    {
        id: "2",
        title: "Community Iftar Gathering",
        date: "March 20, 2026",
        datetime: "2026-03-20",
        location: "Birmingham, UK",
        imageUrl: "/hero-bg.jpg",
        href: "/events/community-iftar",
        isUpcoming: true,
    },
    {
        id: "3",
        title: "Volunteer Training Workshop",
        date: "February 28, 2026",
        datetime: "2026-02-28",
        location: "Manchester, UK",
        imageUrl: "/hero-bg.jpg",
        href: "/events/volunteer-training",
        isUpcoming: true,
    },
];

export const mockCampaigns = [
    {
        id: "1",
        title: "Emergency Relief for Gaza",
        description: "Providing urgent food, medical supplies, and shelter to families in need.",
        imageUrl: "/hero-bg.jpg",
        goal: 500000,
        raised: 342500,
        href: "/campaigns/gaza-relief",
    },
    {
        id: "2",
        title: "Build a Mosque in Africa",
        description: "Help us construct a place of worship for a growing Muslim community.",
        imageUrl: "/hero-bg.jpg",
        goal: 150000,
        raised: 98000,
        href: "/campaigns/mosque-africa",
    },
    {
        id: "3",
        title: "Orphan Sponsorship Program",
        description: "Support orphaned children with education, food, and healthcare.",
        imageUrl: "/hero-bg.jpg",
        goal: 200000,
        raised: 145000,
        href: "/campaigns/orphan-sponsorship",
    },
];

export const mockImpacts = [
    {
        id: "1",
        title: "Water Wells Built",
        description: "Clean water access for communities across Africa and Asia.",
        imageUrl: "/hero-bg.jpg",
        stat: "127",
        statLabel: "Wells Constructed",
    },
    {
        id: "2",
        title: "Families Fed",
        description: "Emergency food packages delivered to families in crisis zones.",
        imageUrl: "/hero-bg.jpg",
        stat: "15,000+",
        statLabel: "Families Supported",
    },
    {
        id: "3",
        title: "Children Educated",
        description: "Sponsoring education for orphans and underprivileged children.",
        imageUrl: "/hero-bg.jpg",
        stat: "3,500",
        statLabel: "Children in School",
    },
    {
        id: "4",
        title: "Medical Aid",
        description: "Healthcare support and medical supplies for those in need.",
        imageUrl: "/hero-bg.jpg",
        stat: "8,200",
        statLabel: "Patients Treated",
    },
];

export const mockStats = [
    { value: "£5M+", label: "Raised This Year" },
    { value: "50+", label: "Countries Reached" },
    { value: "100K+", label: "Lives Changed" },
    { value: "15+", label: "Years of Service" },
];
