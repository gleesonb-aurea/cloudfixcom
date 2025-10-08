// ABOUTME: Root layout with global providers, fonts, header/footer, and metadata
// ABOUTME: Ensures consistent SEO defaults and performance settings site-wide
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceWorkerRegistrar from '@/components/ServiceWorkerRegistrar';
import { StructuredData } from '@/components/StructuredData';

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudfix.com'),
  title: "CloudFix - Automated AWS Cost Optimization",
  description: "CloudFix automatically finds and fixes AWS issues to reduce your cloud costs and improve efficiency.",
  openGraph: {
    title: "CloudFix - Automated AWS Cost Optimization",
    description: "CloudFix automatically finds and fixes AWS issues to reduce your cloud costs and improve efficiency.",
    url: "https://cloudfix.com",
    siteName: "CloudFix",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og", alt: "CloudFix — Automated AWS Cost Optimization" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cloudfix",
    title: "CloudFix - Automated AWS Cost Optimization",
    description: "CloudFix automatically finds and fixes AWS issues to reduce your cloud costs and improve efficiency.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * App root layout component that renders the HTML shell, global providers, site structured data, header/footer, and performance/analytics tooling.
 *
 * This layout sets the document language, preconnects to Google Tag Manager, injects Organization structured data for SEO, conditionally loads Google Analytics when NEXT_PUBLIC_GA_ID is set, and renders site chrome (Header, main children, Footer) plus service worker and performance tools.
 *
 * @returns The root HTML element containing the app layout and global integrations
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <StructuredData
          type="Organization"
          data={{
            name: 'CloudFix',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudfix.com',
            logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudfix.com'}/images/logo.png`,
            sameAs: [
              'https://twitter.com/cloudfix',
              'https://www.linkedin.com/company/cloudfix',
            ],
          }}
        />
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
        <ServiceWorkerRegistrar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}