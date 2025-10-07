import fs from 'fs';
import path from 'path';

export interface LiveStreamUpcoming {
  id: string;
  title: string;
  date: string;
  description: string;
  registrationUrl: string;
}

export interface LiveStreamPast {
  id: string;
  title: string;
  date: string;
  recordingUrl: string;
}

export interface LiveStreamData {
  upcoming: LiveStreamUpcoming[];
  past: LiveStreamPast[];
}

const streamPath = path.join(process.cwd(), 'content', 'livestream', 'streams.json');

export async function getStreams(): Promise<LiveStreamData> {
  if (!fs.existsSync(streamPath)) return { upcoming: [], past: [] };
  const raw = fs.readFileSync(streamPath, 'utf8');
  const data = JSON.parse(raw) as LiveStreamData;
  data.upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  data.past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return data;
}

