import Link from 'next/link';

type HeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
  id?: string;
};

export function H2({ id, children, ...rest }: HeadingProps) {
  return (
    <h2 id={id} {...rest} className="group mt-12 scroll-mt-24 text-2xl font-bold tracking-tight text-gray-900">
      <Link href={`#${id || ''}`} className="no-underline">
        <span className="[&>code]:text-inherit">{children}</span>
        <span className="ml-2 align-middle opacity-0 transition-opacity group-hover:opacity-100 text-gray-400">#</span>
      </Link>
    </h2>
  );
}

export function H3({ id, children, ...rest }: HeadingProps) {
  return (
    <h3 id={id} {...rest} className="group mt-8 scroll-mt-24 text-xl font-semibold text-gray-900">
      <Link href={`#${id || ''}`} className="no-underline">
        <span className="[&>code]:text-inherit">{children}</span>
        <span className="ml-2 align-middle opacity-0 transition-opacity group-hover:opacity-100 text-gray-400">#</span>
      </Link>
    </h3>
  );
}

