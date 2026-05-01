interface TrustItem {
    title: string;
    description: string;
}

interface TrustSectionProps {
    title: string;
    subtitle?: string;
    items: TrustItem[];
}

export default function TrustSection({ title, subtitle, items }: TrustSectionProps) {
    return (
        <section className="bg-akhirah-teal text-purity-white py-12 sm:py-14 md:py-20 overflow-x-clip">
            <div className="container-custom max-w-full">
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-balance">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-white/85 text-sm sm:text-base md:text-lg">{subtitle}</p>
                    )}
                </div>
                <div className="mx-auto mb-8 max-w-4xl rounded-sm border border-white/20 bg-white/5 p-5 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-eternal-gold mb-2">
                        Amanah in every donation
                    </h3>
                    <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                        We treat your trust as an amanah. Zakat and Sadaqah are handled with clear governance,
                        accountable partners, and visible delivery updates across our African charity work so donors can
                        see real outcomes with confidence.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {items.map((item, index) => (
                        <div
                            key={item.title}
                            className="min-w-0 bg-purity-white text-account-black p-5 sm:p-6 md:p-8 rounded-sm border border-white/10"
                        >
                            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-sm bg-mercy-mint border border-akhirah-teal/15 mb-3 sm:mb-4 flex items-center justify-center shrink-0">
                                <span className="text-akhirah-teal font-bold text-base sm:text-lg" aria-hidden>
                                    {index + 1}
                                </span>
                            </div>
                            <h3 className="font-bold text-base sm:text-lg mb-2 text-balance">{item.title}</h3>
                            <p className="text-account-black/75 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
