import Hero from '@/components/Hero';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import RelatedProducts from '@/components/RelatedProducts';

export const metadata = { title: 'PromptLens – LLM Optimization' };

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
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-gray-200 p-6 bg-white text-center">
              <div className="text-xl font-semibold mb-2">OpenAI</div>
              <div className="text-sm text-gray-600">GPT-4, GPT-3.5 Turbo</div>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 bg-white text-center">
              <div className="text-xl font-semibold mb-2">Anthropic</div>
              <div className="text-sm text-gray-600">Claude 3.5 Sonnet, Claude 3 Haiku</div>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 bg-white text-center">
              <div className="text-xl font-semibold mb-2">Google</div>
              <div className="text-sm text-gray-600">Gemini Pro, Gemini Flash</div>
            </div>
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
