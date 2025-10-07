import fs from 'fs/promises';
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
  try {
    const raw = await fs.readFile(streamPath, 'utf8');
    const data = JSON.parse(raw) as LiveStreamData;
    const upcoming = Array.isArray(data.upcoming) ? data.upcoming : [];
    const past = Array.isArray(data.past) ? data.past : [];
    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { upcoming, past };
  } catch (err: any) {
    if (err && (err.code === 'ENOENT' || err.code === 'MODULE_NOT_FOUND')) {
      return { upcoming: [], past: [] };
    }
    console.error('Error reading livestream data:', err);
    return { upcoming: [], past: [] };
  }
}
