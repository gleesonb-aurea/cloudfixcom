import fs from 'fs';
import path from 'path';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishDate: string;
  youtubeId?: string;
  vimeoId?: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const videosPath = path.join(process.cwd(), 'content', 'videos', 'videos.json');

export async function getAllVideos(): Promise<VideoItem[]> {
  if (!fs.existsSync(videosPath)) return [];
  const raw = fs.readFileSync(videosPath, 'utf8');
  const vids: VideoItem[] = JSON.parse(raw);
  return vids.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

