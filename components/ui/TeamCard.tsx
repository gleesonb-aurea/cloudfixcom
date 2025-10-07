import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, Github, Globe } from 'lucide-react';

export interface SocialLink {
  type: 'linkedin' | 'twitter' | 'github' | 'website';
  href: string;
}

export interface TeamCardProps {
  name: string;
  role: string;
  photoSrc?: string;
  bio?: string;
  socials?: SocialLink[];
  className?: string;
}

export default function TeamCard({ name, role, photoSrc, bio, socials = [], className }: TeamCardProps) {
  const iconFor = (type: SocialLink['type']) => {
    switch (type) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className={cn('rounded-2xl border border-gray-200 bg-white p-6 shadow-sm', className)}>
      {photoSrc && (
        <div className="mb-4">
          <Image src={photoSrc} alt={`${name} photo`} width={128} height={128} className="rounded-xl border border-gray-200" />
        </div>
      )}
      <div className="text-lg font-semibold text-gray-900">{name}</div>
      <div className="text-sm text-gray-600 mb-3">{role}</div>
      {bio && <p className="text-gray-700 mb-4">{bio}</p>}
      {socials.length > 0 && (
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <Link
              key={s.type + s.href}
              href={s.href}
              aria-label={`${name} on ${s.type}`}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-gray-600 hover:text-primary hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {iconFor(s.type)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

