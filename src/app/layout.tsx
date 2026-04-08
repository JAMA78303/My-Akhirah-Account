import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Akhirah Account | Invest in Your Hereafter",
  description: "My Akhirah Account helps you invest in your hereafter through charitable giving, community support, and spiritual growth.",
  keywords: ["charity", "Islamic", "akhirah", "sadaqah", "zakat", "giving"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <meta name="theme-color" content="#031f1d" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="flex min-h-dvh min-h-screen flex-col overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
