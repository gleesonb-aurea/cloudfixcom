import React from 'react';
import { PodcastEpisode } from '@/lib/podcast';

interface PlatformBadgesProps {
  episode: Pick<PodcastEpisode, 'audioUrls'>;
  className?: string;
}

export default function PlatformBadges({ episode, className }: PlatformBadgesProps) {
  const links = [
    { key: 'apple', label: 'Apple', href: episode.audioUrls.apple },
    { key: 'spotify', label: 'Spotify', href: episode.audioUrls.spotify },
    { key: 'google', label: 'Google', href: episode.audioUrls.google },
    { key: 'amazon', label: 'Amazon', href: episode.audioUrls.amazon },
    { key: 'rss', label: 'RSS', href: episode.audioUrls.rss },
  ].filter((l) => !!l.href);

  if (links.length === 0) return null;
  return (
    <div className={className}>
      <div className="text-sm text-gray-600 mb-2">Listen on</div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {links.map((l) => (
          <a key={l.key} href={l.href!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 hover:border-primary hover:text-primary">
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

