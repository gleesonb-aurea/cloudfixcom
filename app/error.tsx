// ABOUTME: Global error boundary for the App Router
// ABOUTME: Client component to handle unexpected errors with reset option
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-3">500 - Server Error</h1>
      <p className="text-gray-600 mb-6">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}

