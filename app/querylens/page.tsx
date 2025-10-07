import Hero from '@/components/Hero';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import RelatedProducts from '@/components/RelatedProducts';

export const metadata = { title: 'QueryLens – Database Query Optimization' };

export default function QueryLensPage() {
  return (
    <div>
      <Hero
        title="Database Query Optimization"
        subtitle="Reduce query costs and improve performance"
        description="QueryLens analyzes query patterns, provides optimization recommendations, and helps you cut database spend without sacrificing performance."
        ctaText="Get a Demo"
        ctaLink="/contact"
      />

      <ContentBlock title="Why QueryLens?" columns={3}>
        <FeatureCard icon="🧠" title="Intelligent Analysis" description="Detect N+1s, inefficient joins, and slow queries automatically" />
        <FeatureCard icon="⚡" title="Faster Performance" description="Optimize indexes and query structures for faster response times" />
        <FeatureCard icon="💵" title="Lower Costs" description="Reduce compute and IO by eliminating wasteful queries" />
      </ContentBlock>

      <Section padding="lg" muted>
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Optimization Focus Areas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard icon="🗄️" title="Indexing Guidance" description="Recommendations for creating or adjusting indexes based on usage" />
            <FeatureCard icon="🧪" title="Query Testing" description="Compare before/after execution time and cost impacts" />
            <FeatureCard icon="📉" title="Cost Hotspots" description="Identify the top queries driving spend and how to fix them" />
            <FeatureCard icon="🔍" title="Explain Analyzer" description="Parse EXPLAIN plans to identify misuses and anti-patterns" />
          </div>
        </Container>
      </Section>

      <Section padding="lg" className="bg-gray-50">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-6">See QueryLens in Action</h2>
          <p className="text-xl mb-8">Request a live walkthrough tailored to your database</p>
          <a href="/contact" className="inline-block bg-accent text-gray-900 px-8 py-4 rounded-lg font-semibold">Schedule Demo</a>
        </Container>
      </Section>

      <RelatedProducts currentProduct="querylens" />
    </div>
  );
}
