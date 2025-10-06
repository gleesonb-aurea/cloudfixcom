import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and CTA */}
          <div className="lg:col-span-2">
            <Image
              src="/images/CloudFix_Logo_Color.png"
              alt="CloudFix"
              width={208}
              height={39}
              className="mb-4"
            />
            <Link
              href="/assessment"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
            >
              Get a free savings assessment
            </Link>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-600 hover:text-primary">Features</Link></li>
              <li><Link href="/pricing" className="text-gray-600 hover:text-primary">Pricing</Link></li>
              <li><Link href="/how-it-works" className="text-gray-600 hover:text-primary">How it Works</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
              <li><Link href="/resources" className="text-gray-600 hover:text-primary">Resources</Link></li>
              <li><Link href="/podcast" className="text-gray-600 hover:text-primary">Podcast</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-primary">Careers</Link></li>
            </ul>
          </div>

          {/* Partner Logos */}
          <div>
            <h3 className="font-semibold mb-4">Partners</h3>
            <div className="space-y-3">
              <Image
                src="/images/aws-Partner.png"
                alt="AWS Partner"
                width={100}
                height={40}
                className="opacity-70 hover:opacity-100 transition"
              />
              <Image
                src="/images/FinOps_Certified_Solution.png"
                alt="FinOps Certified Solution"
                width={100}
                height={40}
                className="opacity-70 hover:opacity-100 transition"
              />
              <Image
                src="/images/soc2-img.webp"
                alt="SOC 2 Certified"
                width={80}
                height={32}
                className="opacity-70 hover:opacity-100 transition"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>2028 E Ben White Blvd., Ste 240-2650, Austin, TX 78741</p>
        </div>

        {/* Legal Links */}
        <div className="mt-8 flex flex-wrap gap-6 text-sm">
          <Link href="/privacy" className="text-gray-600 hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-gray-600 hover:text-primary">
            Terms of Service
          </Link>
        </div>
      </div>

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CloudFix",
            "url": "https://cloudfix.com",
            "logo": "https://cloudfix.com/images/CloudFix_Logo_Color.png",
            "description": "CloudFix automatically finds and fixes AWS issues to reduce your cloud costs and improve efficiency.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2028 E Ben White Blvd., Ste 240-2650",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "postalCode": "78741",
              "addressCountry": "US"
            },
            "sameAs": [
              "https://twitter.com/cloudfix",
              "https://www.linkedin.com/company/cloudfix",
              "https://www.youtube.com/channel/cloudfix"
            ]
          })
        }}
      />
    </footer>
  );
}
