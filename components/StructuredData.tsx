// ABOUTME: Lightweight helper for injecting JSON-LD structured data
// ABOUTME: Renders a script tag with type application/ld+json
export interface StructuredDataProps {
  type: string;
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps): JSX.Element {
  const json = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

