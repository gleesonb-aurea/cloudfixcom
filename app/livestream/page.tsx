export const metadata = { title: 'Livestream | CloudFix', description: 'Upcoming and past livestreams from CloudFix.' };

import { getStreams } from '@/lib/livestream';

export default async function LivestreamPage() {
  let upcoming: Awaited<ReturnType<typeof getStreams>>['upcoming'] = [];
  let past: Awaited<ReturnType<typeof getStreams>>['past'] = [];
  try {
    const data = await getStreams();
    upcoming = data.upcoming || [];
    past = data.past || [];
  } catch (err) {
    console.error('Failed to load livestream data', err);
  }
  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Livestream</h1>
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Upcoming Streams</h2>
          {upcoming.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">No upcoming streams. Check back soon.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((s) => (
                <a key={s.id} href={s.registrationUrl} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-sm text-gray-500">{new Date(s.date).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                  <h3 className="mt-1 font-semibold text-gray-900">{s.title}</h3>
                  <p className="text-gray-600 mt-1">{s.description}</p>
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Past Streams</h2>
          {past.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">No past streams yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((s) => (
                <a key={s.id} href={s.recordingUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-sm text-gray-500">{new Date(s.date).toLocaleDateString('en-GB', { dateStyle: 'medium' })}</div>
                  <h3 className="mt-1 font-semibold text-gray-900">{s.title}</h3>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
