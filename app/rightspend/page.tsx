import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import PricingCard from '@/components/ui/PricingCard';
import RICalculator from '@/components/rightspend/RICalculator';
import RelatedProducts from '@/components/RelatedProducts';

export const metadata: Metadata = {
  title: 'RightSpend – Reserved Instance Management',
  description: 'RightSpend analyzes your usage patterns and recommends the optimal AWS Reserved Instance strategy to maximize savings.',
  alternates: { canonical: '/rightspend' },
  openGraph: {
    title: 'RightSpend – Reserved Instance Management',
    description: 'Maximize your RI savings with intelligent recommendations.',
    url: '/rightspend',
    type: 'website',
  },
};

export default function RightSpendPage() {
  return (
    <div>
      <Hero
        title="Reserved Instance Management"
        subtitle="Maximize your RI savings with intelligent recommendations"
        description="RightSpend analyzes your usage patterns and recommends the optimal Reserved Instance strategy to maximize savings."
        ctaText="Optimize RIs"
        ctaLink="/contact"
      />

      <ContentBlock title="Intelligent RI Management" columns={3}>
        <FeatureCard icon="📈" title="Usage Analysis" description="Analyze historical usage patterns to predict future needs" />
        <FeatureCard icon="💡" title="Smart Recommendations" description="Get AI-powered recommendations for optimal RI purchases" />
        <FeatureCard icon="🔄" title="Automated Renewals" description="Never miss an RI renewal with automated recommendations" />
      </ContentBlock>

      <Section padding="lg">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Calculate Your Savings</h2>
          <div className="mx-auto max-w-4xl">
            <RICalculator />
          </div>
        </Container>
      </Section>

      <Section padding="lg" className="bg-gray-50">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-6">See RightSpend in Action</h2>
          <p className="text-xl mb-8">Talk to our experts about your RI strategy</p>
          <a href="/contact" className="inline-block bg-accent text-gray-900 px-8 py-4 rounded-lg font-semibold">Schedule Demo</a>
        </Container>
      </Section>

      <Section padding="lg">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard title="Starter" description="For small teams" price="$499" features={["Up to $25k spend", "Email support", "RI recommendations"]} ctaText="Contact Sales" ctaLink="/contact" />
            <PricingCard title="Growth" description="For scaling teams" price="$1,499" features={["Up to $150k spend", "Priority support", "Auto-renewals"]} ctaText="Contact Sales" ctaLink="/contact" highlight />
            <PricingCard title="Enterprise" description="Custom needs" features={["Unlimited spend", "Dedicated CSM", "Custom integrations"]} ctaText="Request Quote" ctaLink="/contact" />
          </div>
        </Container>
      </Section>

      <RelatedProducts currentProduct="rightspend" />
    </div>
  );
}
