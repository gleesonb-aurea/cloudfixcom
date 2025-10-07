export const metadata = { title: 'Livestream | CloudFix', description: 'Upcoming and past livestreams from CloudFix.' };

export default function LivestreamPage() {
  // Placeholder structure per plan; data integration to follow
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Livestream</h1>
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Upcoming Streams</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">No upcoming streams. Check back soon.</div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Past Streams</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-600">
            <div className="rounded-xl border border-gray-200 bg-white p-6">Past livestream archive coming soon.</div>
          </div>
        </div>
      </section>
    </div>
  );
}

