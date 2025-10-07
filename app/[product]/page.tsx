import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { getProductData } from '@/lib/products';
import type { Metadata } from 'next';
import RelatedProducts from '@/components/RelatedProducts';

export default function ProductPage({ params }: { params: { product: string } }) {
  const product = getProductData(params.product);
  if (!product) return notFound();

  return (
    <div className="min-h-screen">
      <Hero
        title={product.hero.title}
        subtitle={product.hero.subtitle}
        description={product.description || product.tagline}
        ctaText={product.hero.ctaText}
        ctaLink={product.hero.ctaLink}
      />

      {product.features && product.features.length > 0 && (
        <ContentBlock title="Key Features" columns={3}>
          {product.features.map((f, i) => (
            <FeatureCard key={i} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </ContentBlock>
      )}

      <Section padding="lg" muted>
        <Container>
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-gray-700 mb-6">Contact our team to see {product.name} in action and learn how it fits your environment.</p>
          <a href="/contact" className="inline-block bg-accent text-gray-900 px-6 py-3 rounded-lg font-semibold">Schedule Demo</a>
        </Container>
      </Section>

      <RelatedProducts currentProduct={product.id} />
    </div>
  );
}
