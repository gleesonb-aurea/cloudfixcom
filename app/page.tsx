import Hero from '@/components/Hero';
import ContentBlock, { FeatureCard, StatCard } from '@/components/ContentBlock';
import Newsletter from '@/components/Newsletter';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Automatically Fix AWS Issues and Reduce Costs"
        subtitle="AWS Cost Optimization Made Easy"
        description="CloudFix automatically finds and fixes AWS issues to reduce your cloud costs and improve efficiency. No manual work required."
        ctaText="Get Free Assessment"
        ctaLink="/assessment"
        secondaryCtaText="See How It Works"
        secondaryCtaLink="/how-it-works"
      />

      {/* Trusted By Section */}
      <ContentBlock className="bg-gray-50">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
            Trusted by Leading Companies
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <Image src="/images/western_digital_logo_bw.png" alt="Western Digital" width={140} height={40} className="opacity-60 hover:opacity-100 transition" />
            <Image src="/images/rbi_logo_bw.png" alt="RBI" width={100} height={40} className="opacity-60 hover:opacity-100 transition" />
            <Image src="/images/moodys.png" alt="Moody's" width={120} height={40} className="opacity-60 hover:opacity-100 transition" />
            <Image src="/images/bcg.png" alt="BCG" width={80} height={40} className="opacity-60 hover:opacity-100 transition" />
            <Image src="/images/ryanair.png" alt="Ryanair" width={120} height={40} className="opacity-60 hover:opacity-100 transition" />
            <Image src="/images/mastercard.png" alt="Mastercard" width={100} height={40} className="opacity-60 hover:opacity-100 transition" />
            <Image src="/images/pearson.png" alt="Pearson" width={120} height={40} className="opacity-60 hover:opacity-100 transition" />
          </div>
        </div>
      </ContentBlock>

      {/* Stats Section */}
      <ContentBlock columns={3} centered>
        <StatCard value="30%" label="Average Cost Reduction" description="Customers save an average of 30% on AWS costs" />
        <StatCard value="24/7" label="Automated Monitoring" description="Continuous scanning for optimization opportunities" />
        <StatCard value="<5min" label="Setup Time" description="Get started in less than 5 minutes" />
      </ContentBlock>

      {/* Features Section */}
      <ContentBlock
        title="How CloudFix Saves You Money"
        columns={3}
        centered
        className="bg-gray-50"
      >
        <FeatureCard
          icon="🔍"
          title="Automatic Detection"
          description="Our AI continuously scans your AWS infrastructure to identify cost-saving opportunities and inefficiencies."
        />
        <FeatureCard
          icon="⚡"
          title="One-Click Fixes"
          description="Implement recommended fixes with a single click. No manual configuration or technical expertise required."
        />
        <FeatureCard
          icon="📊"
          title="Real-Time Reporting"
          description="Track your savings and optimization progress with detailed dashboards and reports."
        />
        <FeatureCard
          icon="🛡️"
          title="Safe & Secure"
          description="Enterprise-grade security with read-only access. We never have write permissions to your AWS account."
        />
        <FeatureCard
          icon="🎯"
          title="No Vendor Lock-In"
          description="Cancel anytime. Your AWS infrastructure remains completely under your control."
        />
        <FeatureCard
          icon="💰"
          title="Pay As You Save"
          description="Only pay a percentage of the savings we generate. If we don't save you money, you don't pay."
        />
      </ContentBlock>

      {/* Testimonial Section */}
      <ContentBlock className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">&ldquo;</div>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8">
            CloudFix reduced our AWS bill by 40% in the first month. The ROI was immediate and the setup was incredibly simple.
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="font-bold text-lg">Sarah Johnson</div>
            <div className="text-gray-600">CTO, TechStartup Inc.</div>
          </div>
        </div>
      </ContentBlock>

      {/* CTA Section */}
      <ContentBlock className="bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get a free AWS cost assessment and see how much you could save with CloudFix.
          </p>
          <Link
            href="/assessment"
            className="inline-block bg-accent text-gray-900 px-12 py-5 rounded-lg text-lg font-semibold hover:bg-accent-dark transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Your Free Assessment
          </Link>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • 5-minute setup • Cancel anytime
          </p>
        </div>
      </ContentBlock>

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
