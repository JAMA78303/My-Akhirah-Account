import Link from "next/link";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    viewAllHref?: string;
    viewAllText?: string;
    centered?: boolean;
}

export default function SectionHeader({
    title,
    subtitle,
    viewAllHref,
    viewAllText = "View All",
    centered = false,
}: SectionHeaderProps) {
    return (
        <div className={`mb-8 ${centered ? "text-center" : "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"}`}>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-account-black mb-2">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-gray-600 max-w-2xl">{subtitle}</p>
                )}
            </div>
            {viewAllHref && !centered && (
                <Link
                    href={viewAllHref}
                    className="inline-flex items-center gap-2 text-akhirah-teal font-medium hover:underline underline-offset-4 whitespace-nowrap"
                >
                    {viewAllText}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            )}
        </div>
    );
}
