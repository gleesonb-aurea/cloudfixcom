// ABOUTME: MDX image wrapper enforcing alt text and using next/image for perf
import Image from 'next/image';

interface MDXImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function MDXImage({ src, alt, width, height, className }: MDXImageProps) {
  if (!src) return null;
  const safeAlt = alt && alt.trim().length > 0 ? alt : 'Illustration';
  if (!width || !height) {
    return (
      <span className={className} style={{ display: 'block', position: 'relative' }}>
        <Image
          src={src}
          alt={safeAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
          style={{ objectFit: 'contain' }}
        />
      </span>
    );
  }
  return (
    <Image src={src} alt={safeAlt} width={width} height={height} className={className} />
  );
}

