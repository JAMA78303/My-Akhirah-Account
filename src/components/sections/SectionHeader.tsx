import Link from "next/link";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    viewAllHref?: string;
    viewAllText?: string;
    centered?: boolean;
    surface?: "white" | "mint";
}

export default function SectionHeader({
    title,
    subtitle,
    viewAllHref,
    viewAllText = "View all",
    centered = false,
    surface = "white",
}: SectionHeaderProps) {
    const subtitleClass =
        surface === "mint" ? "text-account-black/75" : "text-account-black/65";

    return (
        <div
            className={`mb-6 sm:mb-8 md:mb-10 ${
                centered
                    ? "text-center"
                    : "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4"
            }`}
        >
            <div className={`min-w-0 ${centered ? "mx-auto max-w-2xl" : "flex-1"}`}>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-akhirah-teal mb-1.5 sm:mb-2 text-balance">
                    {title}
                </h2>
                {subtitle && (
                    <p className={`max-w-2xl text-sm sm:text-base ${subtitleClass}`}>{subtitle}</p>
                )}
            </div>
            {viewAllHref && !centered && (
                <Link
                    href={viewAllHref}
                    className="inline-flex shrink-0 items-center gap-2 self-start py-1 text-sm font-semibold text-akhirah-teal hover:text-eternal-gold transition-colors underline-offset-4 hover:underline sm:self-auto sm:text-base"
                >
                    <span className="break-words">{viewAllText}</span>
                    <svg
                        className="h-4 w-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
            )}
        </div>
    );
}
