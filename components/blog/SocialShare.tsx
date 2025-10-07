interface SocialShareProps {
  url?: string;
  title: string;
}

export function SocialShare({ url = '', title }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return (
    <div className="mt-8 flex items-center gap-3 text-sm">
      <span className="text-gray-600">Share:</span>
      <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}>Twitter</a>
      <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}>LinkedIn</a>
      <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}>Facebook</a>
    </div>
  );
}

