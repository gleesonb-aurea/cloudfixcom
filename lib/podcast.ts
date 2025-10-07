import fs from 'fs';
import path from 'path';

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  guest: {
    name: string;
    title: string;
    company: string;
    bio: string;
    avatar: string;
  };
  publishDate: string;
  duration: number; // minutes
  audioUrls: {
    apple: string;
    spotify: string;
    google: string;
    amazon: string;
    rss: string;
  };
  audio?: string; // local audio file
  showNotes: string[];
  tags: string[];
  featured: boolean;
}

const episodesPath = path.join(process.cwd(), 'content', 'podcast', 'episodes.json');

export async function getAllEpisodes(): Promise<PodcastEpisode[]> {
  if (!fs.existsSync(episodesPath)) return [];
  const raw = fs.readFileSync(episodesPath, 'utf8');
  const eps: PodcastEpisode[] = JSON.parse(raw);
  return eps.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export async function getEpisodeById(id: string): Promise<PodcastEpisode | null> {
  const all = await getAllEpisodes();
  return all.find((e) => e.id === id) ?? null;
}

