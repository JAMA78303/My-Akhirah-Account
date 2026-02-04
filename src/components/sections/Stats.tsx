interface StatsProps {
    stats: {
        value: string;
        label: string;
    }[];
}

export default function Stats({ stats }: StatsProps) {
    return (
        <section className="bg-akhirah-teal py-12 md:py-16">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-eternal-gold mb-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
                                {stat.value}
                            </div>
                            <div className="text-sm md:text-base text-white/80">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
