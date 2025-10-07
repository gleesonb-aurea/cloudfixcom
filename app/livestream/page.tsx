// ABOUTME: Livestream page listing upcoming and past streams
// ABOUTME: Embeds upcoming streams, links to registrations, and past recordings with JSON-LD
export const metadata = { title: 'Livestream | CloudFix', description: 'Upcoming and past livestreams from CloudFix.', alternates: { canonical: '/livestream' } };

import { getStreams } from '@/lib/livestream';
import Link from 'next/link';

interface Stream {
  id: string;
  title: string;
  date: string;
  description?: string;
  registrationUrl?: string;
  recordingUrl?: string;
  embedUrl?: string;
}

function deriveEmbed(url?: string): string | undefined {
  if (!url) return undefined;
  const yt = url.match(/[?&]v=([\w-]+)/) || url.match(/youtu\.be\/([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  return undefined;
}

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
        {/* Event JSON-LD for upcoming events */}
        {upcoming.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'EventSeries',
                name: 'CloudFix Livestreams',
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/livestream`,
                subEvents: upcoming.map((s) => ({
                  '@type': 'Event',
                  name: s.title,
                  startDate: s.date,
                  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
                  eventStatus: 'https://schema.org/EventScheduled',
                  url: s.registrationUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/livestream`,
                  organizer: { '@type': 'Organization', name: 'CloudFix' },
                })),
              }),
            }}
          />
        )}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Upcoming Streams</h2>
          {upcoming.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">No upcoming streams. Check back soon.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((s) => (
                <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-sm text-gray-500">{new Date(s.date).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</div>
                  <h3 className="mt-1 font-semibold text-gray-900">{s.title}</h3>
                  <p className="text-gray-600 mt-1">{s.description}</p>
                  {s.embedUrl && (
                    <div className="mt-3 aspect-video w-full rounded-lg overflow-hidden">
                      <iframe className="w-full h-full" src={s.embedUrl} title={s.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                  )}
                  {s.registrationUrl ? (
                    <a href={s.registrationUrl} className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-white">Register</a>
                  ) : null}
                </div>
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
              {past.map((s: Stream) => {
                const embed = s.embedUrl || deriveEmbed(s.recordingUrl);
                return (
                  <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-sm text-gray-500">{new Date(s.date).toLocaleDateString('en-GB', { dateStyle: 'medium' })}</div>
                    <h3 className="mt-1 font-semibold text-gray-900">{s.title}</h3>
                    {embed && (
                      <div className="mt-3 aspect-video w-full rounded-lg overflow-hidden">
                        <iframe className="w-full h-full" src={embed} title={s.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                      </div>
                    )}
                    <div className="mt-3">
                      {s.recordingUrl ? (
                        <a href={s.recordingUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg bg-primary px-4 py-2 text-white">Watch recording</a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
