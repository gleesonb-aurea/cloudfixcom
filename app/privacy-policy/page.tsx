export const metadata = {
  title: 'Privacy Policy | CloudFix',
  description: 'CloudFix privacy policy — how we collect, use, and protect your data.',
  robots: 'noindex, nofollow',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 8, 2025';
  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {lastUpdated}</p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Information We Collect</h2>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, company information</li>
              <li><strong>Usage Data:</strong> AWS usage metrics and cost data</li>
              <li><strong>Technical Data:</strong> IP, browser, device identifiers</li>
              <li><strong>Communication Data:</strong> Support tickets and feedback</li>
            </ul>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>Provide optimization services and recommendations</li>
              <li>Communicate about your account and services</li>
              <li>Improve products and customer experience</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
            <h2>Data Security</h2>
            <ul>
              <li>Encrypted data in transit and at rest</li>
              <li>SOC 2 Type II controls</li>
              <li>Regular security audits and pen tests</li>
            </ul>
            <h2>Your Rights</h2>
            <ul>
              <li>Access, correct, delete, or export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <h2>Third-Party Services</h2>
            <ul>
              <li><strong>AWS:</strong> Read-only access for analysis</li>
              <li><strong>HubSpot:</strong> CRM and email communications</li>
              <li><strong>Google Analytics:</strong> Usage analytics</li>
            </ul>
            <h2>Contact Us</h2>
            <ul>
              <li>Email: privacy@cloudfix.com</li>
              <li>Address: CloudFix Inc., [Your Address]</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

