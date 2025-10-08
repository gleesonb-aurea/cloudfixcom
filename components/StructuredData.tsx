// ABOUTME: Lightweight helper for injecting JSON-LD structured data
// ABOUTME: Renders a script tag with type application/ld+json
export interface StructuredDataProps {
  type: string;
  data: Record<string, any>;
}

/**
 * Injects JSON-LD structured data into the document by rendering a script tag with type "application/ld+json".
 *
 * @param type - The JSON-LD `@type` value (for example, "Organization" or "Article").
 * @param data - Additional key/value pairs to merge into the JSON-LD object alongside `@context` and `@type`.
 * @returns A JSX `<script>` element containing the serialized JSON-LD object.
 */
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
