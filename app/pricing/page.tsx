import Hero from '@/components/Hero';
import ContentBlock from '@/components/ContentBlock';
import Link from 'next/link';

export const metadata = {
  title: "Pricing | CloudFix - AWS Cost Optimization",
  description: "Simple, transparent pricing designed for immediate ROI. Choose from CloudFix, RightSpend, QueryLens, or Enterprise solutions.",
};

export default function Pricing() {
  const pricingPlans = [
    {
      name: 'CloudFix',
      price: '$25,000',
      period: 'per $5m in AWS spend',
      description: 'Automated AWS cost optimization with 30+ fixers',
      features: [
        '30+ fixers',
        'Ongoing fixer updates',
        'Reporting and exports',
        'Custom tagging',
        'Minimal permissions required',
      ],
      cta: 'Get Started',
      ctaLink: '/assessment',
      highlighted: true,
    },
    {
      name: 'RightSpend',
      price: '25%',
      period: 'of net new savings delivered',
      description: 'Optimize your EC2 discount coverage automatically',
      features: [
        'Move on-demand EC2 to discounted rates',
        'Automatically rebalance coverage',
        'Hands-off operation',
        'Performance based pricing',
      ],
      cta: 'Get Started',
      ctaLink: '/assessment',
      highlighted: false,
    },
    {
      name: 'QueryLens',
      price: '$10,000',
      period: 'one-time fee',
      description: 'Database upgrade compatibility analysis',
      features: [
        'RDS MySQL and PostgreSQL analysis',
        'Database upgrade compatibility report',
        'Privacy compliant',
        'Identify breaking changes',
      ],
      cta: 'Get Started',
      ctaLink: '/assessment',
      highlighted: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact for quote',
      description: 'Full-service AWS optimization consulting',
      features: [
        'Consulting-driven findings',
        'Optimized discount patterns',
        'EDP advice',
        'AWS expert consulting support',
        'Dedicated account manager',
      ],
      cta: 'Talk to an Expert',
      ctaLink: '/contact',
      highlighted: false,
    },
  ];

  return (
    <>
      <Hero
        title="Nonstop savings. Incomparable value."
        description="Simple, transparent pricing designed for immediate ROI. Customers see positive results in their very first month."
      />

      {/* Pricing Cards */}
      <ContentBlock className="bg-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-8 rounded-2xl ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-primary/10 to-primary-dark/10 border-2 border-primary shadow-xl'
                  : 'bg-white border-2 border-gray-200 shadow-lg'
              }`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-1">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">{plan.period}</div>
                <p className="text-gray-700">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaLink}
                className={`block text-center py-3 px-6 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* Value Props */}
      <ContentBlock className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why CloudFix Delivers Unmatched Value
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">15-60%</div>
            <div className="text-lg font-semibold mb-2">Savings per AWS service</div>
            <div className="text-gray-600">Typical reduction across optimized services</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">10-25%</div>
            <div className="text-lg font-semibold mb-2">Efficiency gains</div>
            <div className="text-gray-600">Through automation and optimization</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">100%</div>
            <div className="text-lg font-semibold mb-2">AWS compliance</div>
            <div className="text-gray-600">Best practices guaranteed</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">Month 1</div>
            <div className="text-lg font-semibold mb-2">Positive ROI</div>
            <div className="text-gray-600">See results immediately</div>
          </div>
        </div>
      </ContentBlock>

      {/* Features Section */}
      <ContentBlock className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            What's Included
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Free Assessment</h3>
                <p className="text-gray-600">Get started with a complimentary AWS cost analysis to identify your savings opportunities.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AWS Marketplace Billing</h3>
                <p className="text-gray-600">Pay through AWS Marketplace for simplified billing and potential EDP credits.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Minimal Permissions</h3>
                <p className="text-gray-600">Read-only access keeps your AWS environment secure while we optimize.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Continuous Updates</h3>
                <p className="text-gray-600">New fixers and optimizations added regularly at no additional cost.</p>
              </div>
            </div>
          </div>
        </div>
      </ContentBlock>

      {/* CTA Section */}
      <ContentBlock className="bg-gradient-to-br from-primary/5 to-primary-dark/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            See how much you could save with a free AWS cost assessment.
          </p>
          <Link
            href="/assessment"
            className="inline-block bg-primary text-white px-12 py-5 rounded-lg text-lg font-semibold hover:bg-primary-dark transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Your Free Assessment
          </Link>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • 5-minute setup • Cancel anytime
          </p>
        </div>
      </ContentBlock>
    </>
  );
}
