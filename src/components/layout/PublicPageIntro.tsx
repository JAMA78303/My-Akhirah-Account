import type { ReactNode } from "react";

type PublicPageIntroProps = {
    title: string;
    description?: string;
    children?: ReactNode;
};

/**
 * Standard intro block for simple public pages (inside `(site)` layout main).
 */
export default function PublicPageIntro({ title, description, children }: PublicPageIntroProps) {
    return (
        <section className="section bg-purity-white border-b border-akhirah-teal/10">
            <div className="container-custom max-w-3xl">
                <h1 className="text-3xl sm:text-4xl font-bold text-akhirah-teal mb-4 text-balance">{title}</h1>
                {description ? (
                    <p className="text-account-black/80 text-base sm:text-lg leading-relaxed mb-8">{description}</p>
                ) : null}
                {children}
            </div>
        </section>
    );
}
