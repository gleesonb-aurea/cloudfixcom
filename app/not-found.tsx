import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mb-2 text-5xl font-bold text-gray-900">404</h1>
        <p className="mb-6 text-lg text-gray-600">The page you’re looking for doesn’t exist.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white">Go Home</Link>
          <Link href="/sitemap" className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-white">View Sitemap</Link>
        </div>
      </div>
    </div>
  );
}

