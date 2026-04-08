interface StatsProps {
    stats: {
        value: string;
        label: string;
    }[];
}

export default function Stats({ stats }: StatsProps) {
    if (stats.length === 0) {
        return null;
    }

    return (
        <section className="bg-mercy-mint border-y border-akhirah-teal/10 py-10 sm:py-12 md:py-16">
            <div className="container-custom max-w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8 text-center sm:gap-x-4 sm:gap-y-10 md:gap-x-6 md:gap-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="min-w-0 px-0.5">
                            <div
                                className="text-2xl font-bold text-akhirah-teal sm:text-3xl md:text-4xl lg:text-5xl mb-1.5 sm:mb-2"
                                style={{ fontVariantNumeric: "tabular-nums" }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-xs font-medium text-account-black/70 sm:text-sm md:text-base leading-snug">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
