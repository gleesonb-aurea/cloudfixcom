import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import RelatedProducts from '@/components/RelatedProducts';
import IntegrationLogo from '@/components/ui/IntegrationLogo';

export const metadata: Metadata = {
  title: 'PromptLens – LLM Optimization',
  description: 'Optimize LLM usage and costs with prompt engineering, model selection guidance, and usage analytics across providers.',
  alternates: { canonical: '/promptlens' },
  openGraph: {
    title: 'PromptLens – LLM Optimization',
    description: 'Cut LLM costs while improving quality with PromptLens.',
    url: '/promptlens',
    type: 'website',
  },
};

export default function PromptLensPage() {
  return (
    <div>
      <Hero
        title="LLM Optimization"
        subtitle="Cut LLM costs while improving quality"
        description="PromptLens helps teams reduce LLM spend with prompt optimization, model selection guidance, and usage analytics across providers."
        ctaText="Talk to an Expert"
        ctaLink="/contact"
      />

      <ContentBlock title="Optimize Your LLM Workloads" columns={3}>
        <FeatureCard icon="🧩" title="Prompt Engineering" description="Identify and fix prompt anti-patterns that inflate token usage" />
        <FeatureCard icon="📊" title="Usage Analytics" description="Track token consumption and cost by team, app, and model" />
        <FeatureCard icon="🔁" title="Model Fit" description="Select the right model for the task to balance cost and quality" />
      </ContentBlock>

      <Section padding="lg" muted>
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Supported Providers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 items-center justify-items-center">
            <IntegrationLogo src="/images/providers/openai.png" alt="OpenAI" />
            <IntegrationLogo src="/images/providers/anthropic.png" alt="Anthropic" />
            <IntegrationLogo src="/images/providers/google.png" alt="Google" />
          </div>
        </Container>
      </Section>

      <Section padding="lg" className="bg-gray-50">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize LLM Costs?</h2>
          <p className="text-xl mb-8">We’ll help you design scalable, cost-efficient LLM workloads</p>
          <a href="/contact" className="inline-block bg-accent text-gray-900 px-8 py-4 rounded-lg font-semibold">Schedule Strategy Call</a>
        </Container>
      </Section>

      <RelatedProducts currentProduct="promptlens" />
    </div>
  );
}
