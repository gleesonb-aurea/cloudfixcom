export const metadata = {
  title: 'Terms of Service | CloudFix',
  description: 'CloudFix terms of service.',
  robots: 'noindex, nofollow',
  alternates: { canonical: '/terms-of-service' },
};

export default function TermsOfServicePage() {
  const lastUpdated = 'October 8, 2025';
  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: {lastUpdated}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Acceptance of Terms</h2>
            <p>By accessing or using CloudFix services, you agree to these Terms.</p>
            <h2>Use of Services</h2>
            <p>You are responsible for your use of the services and your data.</p>
            <h2>Accounts</h2>
            <p>You must provide accurate information and maintain the security of your account.</p>
            <h2>Intellectual Property</h2>
            <p>All rights, title, and interest in and to the services are owned by CloudFix.</p>
            <h2>Disclaimer</h2>
            <p>Services are provided “as is” without warranties of any kind.</p>
            <h2>Limitation of Liability</h2>
            <p>CloudFix is not liable for any indirect, incidental, or consequential damages.</p>
            <h2>Contact</h2>
            <p>Questions? Email legal@cloudfix.com.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

