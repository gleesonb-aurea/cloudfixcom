import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText = "Get Started",
  ctaLink = "/assessment",
  secondaryCtaText,
  secondaryCtaLink
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Background Shape */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />

      <div className="relative container-custom section-padding">
        <div className="max-w-4xl mx-auto text-center">
          {subtitle && (
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-6">
              {subtitle}
            </div>
          )}

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaLink}
              className="bg-accent text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-dark transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {ctaText}
            </Link>

            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-primary"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
