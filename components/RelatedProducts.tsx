import Link from 'next/link';
import { PRODUCTS, type Product } from '@/lib/products';

export interface RelatedProductsProps {
  currentProduct: Product['id'];
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const related = PRODUCTS.filter((p) => p.id !== currentProduct);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Complete CloudFix Platform</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {related.map((product) => (
            <div key={product.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.tagline}</p>
              <Link href={`/${product.id}`} className="text-primary font-semibold hover:underline">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

