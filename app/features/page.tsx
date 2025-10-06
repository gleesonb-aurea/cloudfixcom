import Hero from '@/components/Hero';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Features | CloudFix - AWS Cost Optimization Platform",
  description: "Discover CloudFix features: 30+ automated fixers, real-time reporting, custom tagging, and enterprise-grade security for AWS cost optimization.",
};

export default function Features() {
  return (
    <>
      <Hero
        title="Enterprise-Grade AWS Optimization"
        subtitle="Powerful Features"
        description="CloudFix combines automated detection, one-click fixes, and comprehensive reporting to reduce your AWS costs by 30%+ while improving efficiency."
        ctaText="Get Free Assessment"
        ctaLink="/assessment"
      />

      {/* Core Features */}
      <ContentBlock className="bg-white" title="How CloudFix Works" columns={3} centered>
        <FeatureCard
          icon="🔍"
          title="Automatic Detection"
          description="Our AI continuously scans your AWS infrastructure 24/7 to identify cost-saving opportunities, inefficiencies, and optimization potential across all services."
        />
        <FeatureCard
          icon="⚡"
          title="One-Click Fixes"
          description="Implement recommended optimizations with a single click. No manual configuration, scripts, or technical expertise required. CloudFix handles everything."
        />
        <FeatureCard
          icon="📊"
          title="Real-Time Reporting"
          description="Track your savings and optimization progress with detailed dashboards, custom reports, and exportable data. See your ROI in real-time."
        />
      </ContentBlock>

      {/* 30+ Fixers */}
      <ContentBlock className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">30+ Automated Fixers</h2>
            <p className="text-xl text-gray-600">
              CloudFix continuously adds new optimizations at no additional cost
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '💾', title: 'EBS Optimization', desc: 'Right-size and upgrade EBS volumes' },
              { icon: '🖥️', title: 'EC2 Right-Sizing', desc: 'Optimize instance types and sizes' },
              { icon: '🗄️', title: 'RDS Optimization', desc: 'Database performance and cost tuning' },
              { icon: '📦', title: 'S3 Storage Classes', desc: 'Automatic intelligent tiering' },
              { icon: '🌐', title: 'CloudFront CDN', desc: 'Optimize content delivery' },
              { icon: '🔐', title: 'Security Groups', desc: 'Clean up unused rules' },
              { icon: '🔄', title: 'Snapshots', desc: 'Remove orphaned snapshots' },
              { icon: '🏷️', title: 'Elastic IPs', desc: 'Eliminate unused IPs' },
              { icon: '⚙️', title: 'Lambda Functions', desc: 'Optimize memory and timeout' },
            ].map((fixer, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-3">{fixer.icon}</div>
                <h3 className="font-bold text-lg mb-2">{fixer.title}</h3>
                <p className="text-gray-600 text-sm">{fixer.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">
              + Many more fixers added regularly
            </p>
            <Link
              href="/assessment"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              See What CloudFix Can Fix for You
            </Link>
          </div>
        </div>
      </ContentBlock>

      {/* Security & Compliance */}
      <ContentBlock className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-600">
              Your data and infrastructure stay secure with read-only access
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                <span className="text-3xl">🔒</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Read-Only Access</h3>
                <p className="text-gray-600">
                  CloudFix never has write permissions to your AWS account. All changes
                  require your explicit approval through one-click confirmations.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                <Image src="/images/soc2-img.webp" alt="SOC 2" width={64} height={64} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">SOC 2 Certified</h3>
                <p className="text-gray-600">
                  We maintain strict security and compliance standards to protect your
                  sensitive cloud infrastructure data.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                <span className="text-3xl">✅</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">AWS Best Practices</h3>
                <p className="text-gray-600">
                  100% compliance with AWS Well-Architected Framework. All optimizations
                  follow AWS recommended guidelines.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                <Image src="/images/aws-Partner.png" alt="AWS Partner" width={64} height={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">AWS Partner</h3>
                <p className="text-gray-600">
                  Official AWS Partner with deep integration into AWS services and
                  direct support from AWS teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentBlock>

      {/* Advanced Features */}
      <ContentBlock className="bg-gradient-to-br from-primary/5 to-primary-dark/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Advanced Capabilities
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🏷️</div>
              <h3 className="text-2xl font-bold mb-4">Custom Tagging</h3>
              <p className="text-gray-600 mb-4">
                Organize and track optimizations by department, project, or environment.
                Get granular insights into where savings are coming from.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Department-level reporting
                </li>
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Project cost allocation
                </li>
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Environment segmentation
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-4">Exportable Reports</h3>
              <p className="text-gray-600 mb-4">
                Generate comprehensive reports for stakeholders, audits, or internal
                tracking. Export in multiple formats.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  CSV exports for analysis
                </li>
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  PDF reports for executives
                </li>
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Scheduled automated reports
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-2xl font-bold mb-4">Continuous Updates</h3>
              <p className="text-gray-600 mb-4">
                New fixers and optimizations are added regularly at no additional cost.
                Stay ahead of AWS changes automatically.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Automatic new fixer deployment
                </li>
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AWS service updates coverage
                </li>
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No version management needed
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Smart Recommendations</h3>
              <p className="text-gray-600 mb-4">
                AI-powered analysis provides personalized recommendations based on your
                specific usage patterns and business needs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Usage pattern analysis
                </li>
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Prioritized optimization queue
                </li>
                <li className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Impact-based suggestions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContentBlock>

      {/* CTA */}
      <ContentBlock className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See CloudFix in Action
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get a free assessment and see exactly how much you could save with CloudFix.
          </p>
          <Link
            href="/assessment"
            className="inline-block bg-primary text-white px-12 py-5 rounded-lg text-lg font-semibold hover:bg-primary-dark transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Your Free Assessment
          </Link>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • 5-minute setup • See results in days
          </p>
        </div>
      </ContentBlock>
    </>
  );
}
