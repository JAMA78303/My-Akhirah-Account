"use client";

import { FormEvent, useState } from "react";

const donationTypes = [
    { value: "one-off", label: "One-off donation" },
    { value: "monthly", label: "Monthly donation" },
];

const funds = [
    { value: "", label: "Select a fund" },
    { value: "general", label: "General fund" },
    { value: "zakat", label: "Zakat" },
    { value: "emergency", label: "Emergency appeal" },
    { value: "orphans", label: "Orphan sponsorship" },
];

export default function HeroQuickDonate() {
    const [donationType, setDonationType] = useState("one-off");
    const [fund, setFund] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.set("type", donationType);
        if (fund) params.set("fund", fund);
        if (amount.trim()) params.set("amount", amount.trim());
        window.location.href = `/donate?${params.toString()}`;
    };

    /* text-base (16px) avoids iOS input zoom; min-h ~44px for touch */
    const fieldClass =
        "min-h-11 w-full rounded-sm border-2 border-akhirah-teal/20 bg-purity-white px-2.5 py-2 text-base font-medium text-account-black focus:border-akhirah-teal focus:outline-none focus:ring-2 focus:ring-eternal-gold/60 lg:min-h-12 lg:px-3.5 lg:py-3 [&>option]:text-account-black";

    return (
        <div className="w-full min-w-0 shrink-0 max-lg:max-w-none lg:max-w-[min(100%,26rem)] xl:max-w-[min(100%,32rem)] 2xl:max-w-[min(100%,36rem)]">
            <form
                onSubmit={handleSubmit}
                className="rounded-sm border border-account-black/10 bg-purity-white/95 p-3 shadow-2xl shadow-account-black/25 backdrop-blur-md max-lg:shadow-lg sm:p-4 md:p-5 lg:p-7 xl:p-8"
                aria-label="Quick donate"
            >
                <p className="mb-2 font-bold italic text-akhirah-teal text-base max-lg:mb-2 sm:text-lg lg:mb-5 lg:text-2xl xl:text-[1.75rem]">
                    Quick donate
                </p>

                <div className="grid grid-cols-1 gap-3 sm:gap-3.5 max-lg:grid-cols-2 max-lg:gap-x-3 max-lg:gap-y-2.5 lg:gap-4 xl:gap-5">
                    <div className="min-w-0">
                        <label
                            htmlFor="quick-donate-type"
                            className="mb-0.5 block text-[0.6875rem] font-semibold uppercase tracking-wide text-account-black/70 max-lg:leading-tight lg:mb-1.5 lg:text-sm"
                        >
                            Donation frequency
                        </label>
                        <select
                            id="quick-donate-type"
                            value={donationType}
                            onChange={(e) => setDonationType(e.target.value)}
                            className={fieldClass}
                        >
                            {donationTypes.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="min-w-0">
                        <label
                            htmlFor="quick-donate-fund"
                            className="mb-0.5 block text-[0.6875rem] font-semibold uppercase tracking-wide text-account-black/70 max-lg:leading-tight lg:mb-1.5 lg:text-sm"
                        >
                            Fund
                        </label>
                        <select
                            id="quick-donate-fund"
                            value={fund}
                            onChange={(e) => setFund(e.target.value)}
                            className={fieldClass}
                        >
                            {funds.map((o) => (
                                <option key={o.value || "placeholder"} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="min-w-0 max-lg:col-span-2">
                        <label
                            htmlFor="quick-donate-amount"
                            className="mb-0.5 block text-[0.6875rem] font-semibold uppercase tracking-wide text-account-black/70 max-lg:leading-tight lg:mb-1.5 lg:text-sm"
                        >
                            Amount (GBP)
                        </label>
                        <input
                            id="quick-donate-amount"
                            type="text"
                            inputMode="decimal"
                            placeholder="e.g. 50"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className={`${fieldClass} placeholder:text-account-black/40`}
                            autoComplete="transaction-amount"
                        />
                    </div>

                    <button
                        type="submit"
                        className="max-lg:col-span-2 mt-0 min-h-11 w-full btn btn-primary font-bold inline-flex items-center justify-center gap-2 py-2.5 text-base lg:mt-2 lg:min-h-12 lg:gap-2.5 lg:py-3.5 lg:text-lg"
                    >
                        Donate
                        <svg
                            className="h-4 w-4 shrink-0 lg:h-5 lg:w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
