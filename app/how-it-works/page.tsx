import Hero from '@/components/Hero';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import ProcessStep from '@/components/ui/ProcessStep';
import PartnerLogo from '@/components/ui/PartnerLogo';

export const metadata = {
  title: 'How it Works | CloudFix',
  description: 'See how CloudFix connects, analyzes, recommends, and automatically implements AWS cost optimizations.',
  alternates: { canonical: '/how-it-works' },
};

export default function HowItWorksPage() {
  return (
    <div>
      <Hero
        title="How CloudFix Works"
        subtitle="Automated AWS cost optimization in 4 simple steps"
        description="CloudFix continuously analyzes your AWS usage, identifies savings, and implements them automatically — securely and at scale."
        ctaText="Start Free Assessment"
        ctaLink="/assessment"
      />

      <ContentBlock title="Our Optimization Process" columns={4}>
        <ProcessStep number="1" title="Connect" description="Securely connect your AWS account using read-only IAM." icon="🔗" />
        <ProcessStep number="2" title="Analyze" description="AI-driven analysis of usage, trends, and cost drivers." icon="🤖" />
        <ProcessStep number="3" title="Recommend" description="Personalized, high-confidence recommendations with savings." icon="💡" />
        <ProcessStep number="4" title="Automate" description="Approve once, and CloudFix implements automatically." icon="⚡" />
      </ContentBlock>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose CloudFix?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard icon="🛡️" title="100% Secure" description="Read-only access, SOC 2 Type II; zero agents and no code changes." />
            <FeatureCard icon="⏱️" title="Quick Setup" description="Start saving in minutes — fast time to value with minimal effort." />
            <FeatureCard icon="📈" title="Proven Results" description="Customers realize on average 35%+ savings on AWS." />
          </div>
        </div>
      </section>

      <ContentBlock title="Trusted by Industry Leaders" centered>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <PartnerLogo name="AWS Partner" logo="/images/aws-Partner.png" />
          <PartnerLogo name="SOC 2" logo="/images/soc2-img.webp" />
        </div>
      </ContentBlock>

      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="container-custom text-center">
          <h2 className="mb-6 text-3xl font-bold">Ready to Start Saving?</h2>
          <p className="mb-8 text-xl">Join companies saving millions on AWS with CloudFix.</p>
          <a href="/assessment" className="rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-gray-900">
            Start Free Assessment
          </a>
        </div>
      </section>
    </div>
  );
}
