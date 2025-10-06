import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CloudFix - Automated AWS Cost Optimization",
  description: "CloudFix automatically finds and fixes AWS issues to reduce your cloud costs and improve efficiency.",
  openGraph: {
    title: "CloudFix - Automated AWS Cost Optimization",
    description: "CloudFix automatically finds and fixes AWS issues to reduce your cloud costs and improve efficiency.",
    url: "https://cloudfix.com",
    siteName: "CloudFix",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@cloudfix",
    title: "CloudFix - Automated AWS Cost Optimization",
    description: "CloudFix automatically finds and fixes AWS issues to reduce your cloud costs and improve efficiency.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <body className="antialiased">
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
