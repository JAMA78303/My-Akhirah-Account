interface GlobalReachProps {
    title: string;
    subtitle?: string;
}

export default function GlobalReach({ title, subtitle }: GlobalReachProps) {
    return (
        <section className="bg-mercy-mint py-12 sm:py-14 md:py-20 border-y border-akhirah-teal/10 overflow-x-clip">
            <div className="container-custom max-w-full">
                <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 px-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-akhirah-teal mb-2 sm:mb-3 text-balance">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-account-black/75 text-sm sm:text-base">{subtitle}</p>
                    )}
                </div>
                <div
                    className="relative mx-auto w-full max-w-4xl min-h-[12rem] aspect-[4/3] sm:aspect-[2/1] sm:min-h-0 rounded-sm bg-akhirah-teal/5 border border-akhirah-teal/15 overflow-hidden"
                    role="img"
                    aria-label="Stylized map showing regions where we work"
                >
                    <svg
                        viewBox="0 0 800 400"
                        className="absolute inset-0 h-full w-full text-akhirah-teal/25"
                        preserveAspectRatio="xMidYMid slice"
                        fill="currentColor"
                        aria-hidden
                    >
                        <ellipse cx="400" cy="200" rx="320" ry="160" opacity="0.35" />
                        <path
                            opacity="0.45"
                            d="M120 180 Q200 120 280 160 T440 140 T600 180 T720 200 L720 240 Q640 280 520 260 T320 280 T120 240 Z"
                        />
                        <circle cx="220" cy="160" r="8" className="text-eternal-gold" fill="currentColor" />
                        <circle cx="380" cy="200" r="8" className="text-eternal-gold" fill="currentColor" />
                        <circle cx="520" cy="170" r="8" className="text-eternal-gold" fill="currentColor" />
                        <circle cx="600" cy="220" r="8" className="text-eternal-gold" fill="currentColor" />
                    </svg>
                    <p className="absolute bottom-2 left-2 right-2 sm:bottom-4 text-center text-xs sm:text-sm text-akhirah-teal/80 font-medium px-1">
                        Communities supported across multiple regions
                    </p>
                </div>
            </div>
        </section>
    );
}
