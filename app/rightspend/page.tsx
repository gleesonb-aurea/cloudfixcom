import Hero from '@/components/Hero';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export const metadata = { title: 'RightSpend – Reserved Instance Management' };

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
          <div className="mx-auto max-w-2xl text-center text-gray-600">
            {/* Placeholder for future RI calculator */}
            Coming soon: Enter your current AWS spend to estimate RI savings.
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
    </div>
  );
}
