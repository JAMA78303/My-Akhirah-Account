import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <div className="min-w-0 flex-1 flex flex-col">{children}</div>
            <Footer />
        </>
    );
}
