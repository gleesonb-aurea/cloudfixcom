'use client';

import React from 'react';
import { PodcastEpisode } from '@/lib/podcast';

interface PodcastPlayerProps {
  episode: PodcastEpisode;
}

export default function PodcastPlayer({ episode }: PodcastPlayerProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">{episode.title}</h3>
      <p className="text-gray-600 mt-1">{episode.description}</p>
      <div className="mt-4">
        {episode.audio ? (
          <audio controls className="w-full">
            <source src={episode.audio} />
          </audio>
        ) : (
          <div className="text-sm text-gray-500">Audio available on platforms below.</div>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-gray-600">Listen on:</span>
        <a className="text-primary hover:underline" href={episode.audioUrls.apple} target="_blank" rel="noopener noreferrer">Apple</a>
        <a className="text-primary hover:underline" href={episode.audioUrls.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
        <a className="text-primary hover:underline" href={episode.audioUrls.google} target="_blank" rel="noopener noreferrer">Google</a>
        <a className="text-primary hover:underline" href={episode.audioUrls.amazon} target="_blank" rel="noopener noreferrer">Amazon</a>
        <a className="text-primary hover:underline" href={episode.audioUrls.rss} target="_blank" rel="noopener noreferrer">RSS</a>
      </div>
    </div>
  );
}

