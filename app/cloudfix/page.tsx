import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import RelatedProducts from '@/components/RelatedProducts';
import PricingCard from '@/components/ui/PricingCard';
import ComparisonTable from '@/components/ui/ComparisonTable';

export const metadata: Metadata = {
  title: 'CloudFix – Automated AWS Cost Optimization',
  description: 'CloudFix continuously monitors your AWS infrastructure, identifies cost-saving opportunities, and implements optimizations automatically. Save up to 40% on your AWS bill.',
  alternates: { canonical: '/cloudfix' },
  openGraph: {
    title: 'CloudFix – Automated AWS Cost Optimization',
    description: 'Save up to 40% on AWS with CloudFix automation.',
    url: '/cloudfix',
    type: 'website',
  },
};

export default function CloudFixPage() {
  return (
    <div>
      <Hero
        title="Automated AWS Cost Optimization"
        subtitle="Save up to 40% on your AWS bill with intelligent automation"
        description="CloudFix continuously monitors your AWS infrastructure, identifies cost-saving opportunities, and implements optimizations automatically."
        ctaText="Start Free Assessment"
        ctaLink="/assessment"
      />

      <ContentBlock title="Why Choose CloudFix?" columns={3}>
        <FeatureCard icon="🤖" title="Automated Optimization" description="AI-powered algorithms identify and implement savings opportunities 24/7" />
        <FeatureCard icon="📊" title="Real-time Monitoring" description="Track your AWS costs and savings in real-time with detailed analytics" />
        <FeatureCard icon="🔒" title="Enterprise Security" description="SOC 2 Type II certified with zero-trust security architecture" />
      </ContentBlock>

      <Section padding="lg" muted>
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard icon="💰" title="Cost Savings" description="Automatically identify unused resources, rightsize instances, and leverage reserved instances" />
            <FeatureCard icon="⚙️" title="Automations" description="Safe, reviewable optimizations with full audit trails" />
            <FeatureCard icon="🧭" title="Governance" description="Policies to control where and how optimizations apply" />
            <FeatureCard icon="📈" title="Reporting" description="Executive-ready reports showing savings over time" />
          </div>
        </Container>
      </Section>

      <ContentBlock title="Trusted by Leading Companies" columns={3}>
        <TestimonialCard quote="CloudFix saved us 35% on our AWS costs in the first month" name="CTO" company="StartupXYZ" rating={5} />
        <TestimonialCard quote="Seamless setup and measurable ROI in weeks" name="VP Engineering" company="FinTech Co." rating={5} />
        <TestimonialCard quote="Exactly the FinOps automation we needed" name="Head of DevOps" company="MediaCo" rating={4} />
      </ContentBlock>

      <Section padding="lg" className="bg-gradient-to-r from-primary to-secondary text-white">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your AWS Costs?</h2>
          <p className="text-xl mb-8">Join hundreds of companies saving millions with CloudFix</p>
          <div className="flex gap-4 justify-center">
            <a href="/assessment" className="bg-accent text-gray-900 px-8 py-4 rounded-lg font-semibold">Start Free Assessment</a>
            <a href="/contact" className="border-2 border-white px-8 py-4 rounded-lg font-semibold">Schedule Demo</a>
          </div>
        </Container>
      </Section>

      <RelatedProducts currentProduct="cloudfix" />

      <Section padding="lg">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard title="Starter" description="For POCs" price="$0" period="" features={["Assessment", "Savings report", "Email support"]} ctaText="Start Assessment" ctaLink="/assessment" />
            <PricingCard title="Pro" description="Most popular" price="$1,999" features={["Automation", "Governance", "Priority support"]} ctaText="Contact Sales" ctaLink="/contact" highlight />
            <PricingCard title="Enterprise" description="Custom" features={["SLA", "SSO/SOC2", "Dedicated CSM"]} ctaText="Request Quote" ctaLink="/contact" />
          </div>
          <div className="mt-12">
            <ComparisonTable
              headers={["CloudFix", "DIY"]}
              rows={[
                {label: 'Automated optimizations', values: [true, false]},
                {label: 'Time to value', values: ['Weeks', 'Months']},
                {label: 'Security & compliance', values: ['SOC 2', 'Varies']},
              ]}
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
