// Mock data for the website — replace with Convex queries later

import type {
    EmergencyCardAppeal,
    EmergencyFeatured,
} from "@/components/sections/EmergencyBar";

const img = "/hero-bg.jpg";

export const mockStats = [
    { value: "£2.4M+", label: "Distributed in aid" },
    { value: "40+", label: "Active programmes" },
    { value: "120k+", label: "Lives touched" },
    { value: "15+", label: "Years of service" },
];

export const mockBlogs = [
    {
        id: "1",
        title: "Understanding Zakat: a practical guide for families",
        category: "Resources",
        excerpt: "How to calculate, allocate, and give with confidence this year.",
        imageUrl: img,
        href: "/blog/zakat-guide",
        date: "12 Mar 2026",
        datetime: "2026-03-12",
    },
    {
        id: "2",
        title: "From your community to theirs: where your Sadaqah travels",
        category: "Impact",
        excerpt: "A look at local collections and how they reach those in need.",
        imageUrl: img,
        href: "/blog/sadaqah-journey",
        date: "28 Feb 2026",
        datetime: "2026-02-28",
    },
    {
        id: "3",
        title: "Volunteering that fits your schedule",
        category: "Community",
        excerpt: "Evenings, weekends, or remote — ways to contribute your time.",
        imageUrl: img,
        href: "/blog/volunteering",
        date: "10 Feb 2026",
        datetime: "2026-02-10",
    },
];

export const mockStories = [
    {
        id: "s1",
        title: "Clean water reached another 2,000 households",
        excerpt: "Wells, filtration, and training — delivered with local partners.",
        imageUrl: img,
        href: "/blog/water-programme",
    },
    {
        id: "s2",
        title: "Winter kits: warmth when it matters most",
        excerpt: "Blankets, fuel, and essentials for families facing harsh weather.",
        imageUrl: img,
        href: "/blog/winter-kits",
    },
    {
        id: "s3",
        title: "Scholarships open doors for young learners",
        excerpt: "Supporting tuition and supplies so children can stay in school.",
        imageUrl: img,
        href: "/blog/scholarships",
    },
];

export const mockEvents = [
    {
        id: "e1",
        title: "Community Iftar & fundraiser",
        date: "18 Mar 2026 · 6:30 PM",
        datetime: "2026-03-18T18:30",
        location: "London Community Centre",
        imageUrl: img,
        href: "/events/community-iftar",
        isUpcoming: true,
    },
    {
        id: "e2",
        title: "Zakat clinic (drop-in)",
        date: "22 Mar 2026 · 10:00 AM",
        datetime: "2026-03-22T10:00",
        location: "Birmingham Hub",
        imageUrl: img,
        href: "/events/zakat-clinic",
        isUpcoming: true,
    },
    {
        id: "e3",
        title: "Youth volunteering day",
        date: "5 Apr 2026 · 9:00 AM",
        datetime: "2026-04-05T09:00",
        location: "Manchester Warehouse",
        imageUrl: img,
        href: "/events/youth-day",
        isUpcoming: true,
    },
];

export const mockCampaigns = [
    {
        id: "c1",
        title: "Emergency food & medicine",
        description: "Rapid response for families facing crisis.",
        imageUrl: img,
        goal: 500000,
        raised: 312000,
        href: "/campaigns/emergency-aid",
    },
    {
        id: "c2",
        title: "Rebuild & recover",
        description: "Shelter materials and livelihood support after disaster.",
        imageUrl: img,
        goal: 250000,
        raised: 189000,
        href: "/campaigns/rebuild",
    },
    {
        id: "c3",
        title: "Orphan sponsorship fund",
        description: "Education, nutrition, and care for children in our programme.",
        imageUrl: img,
        goal: 180000,
        raised: 94000,
        href: "/campaigns/orphans",
    },
];

export const mockImpacts = [
    {
        id: "i1",
        title: "Water & sanitation",
        description: "Wells, hygiene training, and safe water for whole villages.",
        imageUrl: img,
        stat: "2.1M",
        statLabel: "Litres/day capacity",
        href: "/projects/water",
    },
    {
        id: "i2",
        title: "Food security",
        description: "Hot meals, parcels, and agricultural support where hunger bites hardest.",
        imageUrl: img,
        href: "/projects/food",
    },
    {
        id: "i3",
        title: "Health & clinics",
        description: "Mobile clinics, vaccines, and maternal health services.",
        imageUrl: img,
        href: "/projects/health",
    },
    {
        id: "i4",
        title: "Education",
        description: "Schools, supplies, and scholarships so children keep learning.",
        imageUrl: img,
        href: "/projects/education",
    },
    {
        id: "i5",
        title: "Shelter & recovery",
        description: "Temporary shelter, repairs, and cash assistance after emergencies.",
        imageUrl: img,
        href: "/projects/shelter",
    },
    {
        id: "i6",
        title: "Livelihoods",
        description: "Skills training, tools, and small grants to rebuild income.",
        imageUrl: img,
        href: "/projects/livelihoods",
    },
];

export const mockTrustItems = [
    {
        title: "Transparent giving",
        description: "We publish what we fund, where programmes run, and how donations are allocated.",
    },
    {
        title: "Local delivery",
        description: "We work with vetted partners on the ground so aid reaches people quickly and safely.",
    },
    {
        title: "Receipts and updates",
        description: "Donors receive confirmations and regular updates as campaigns and programmes progress.",
    },
];

export const mockEmergencyFeatured: EmergencyFeatured = {
    headline: "Lebanon crisis appeal",
    paragraphs: [
        "Families are facing severe shortages of food, clean water, and medical care. Roads and infrastructure are damaged, and children are among the hardest hit.",
        "Together with trusted local partners, we are delivering emergency supplies, supporting clinics, and helping communities survive this crisis.",
    ],
    closingLine: "Donate now to help families in urgent need in Lebanon.",
    ctaText: "Donate now",
    ctaHref: "/donate",
    imageSrc: img,
    imageAlt: "Emergency relief and humanitarian response in a crisis-affected area",
};

export const mockEmergencySecondaryAppeals: [EmergencyCardAppeal, EmergencyCardAppeal] = [
    {
        headline: "Give to Palestine",
        body: "Families need food, medical care, and shelter. Your Sadaqah and Zakat help us reach them quickly through partners on the ground.",
        href: "/donate",
    },
    {
        headline: "Give to Sudan",
        body: "Conflict and displacement have left millions in need. Support emergency food, water, and protection for the most vulnerable.",
        href: "/donate",
    },
];
