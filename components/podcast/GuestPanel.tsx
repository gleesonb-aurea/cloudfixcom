import Image from 'next/image';
import React from 'react';
import { PodcastEpisode } from '@/lib/podcast';

interface GuestPanelProps {
  guest: PodcastEpisode['guest'];
}

export default function GuestPanel({ guest }: GuestPanelProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex items-start gap-4">
      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <Image src={guest.avatar} alt={guest.name} fill className="object-cover" />
      </div>
      <div>
        <div className="font-semibold text-gray-900">{guest.name}</div>
        <div className="text-sm text-gray-600">{guest.title}{guest.company ? `, ${guest.company}` : ''}</div>
        {guest.bio && <p className="text-gray-700 mt-2">{guest.bio}</p>}
      </div>
    </div>
  );
}

