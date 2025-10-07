'use client';

import React from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal';
import type { VideoItem } from '@/lib/videos';

interface VideoGridProps {
  videos: VideoItem[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<VideoItem | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <button key={v.id} onClick={() => { setActive(v); setOpen(true); }} className="group text-left">
            <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 rounded-lg overflow-hidden">
                <Image src={v.thumbnail} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-primary transition-colors">{v.title}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{v.description}</p>
            </article>
          </button>
        ))}
      </div>

      <Modal open={open} onClose={() => { setOpen(false); setActive(null); }}>
        <div className="p-0">
          {active?.youtubeId ? (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${active.youtubeId}`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="p-6">Video not available.</div>
          )}
        </div>
      </Modal>
    </>
  );
}

