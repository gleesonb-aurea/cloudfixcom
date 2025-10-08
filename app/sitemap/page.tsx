export const metadata = {
  title: 'Sitemap | CloudFix',
  description: 'Human-readable sitemap of CloudFix pages grouped by section.',
  alternates: { canonical: '/sitemap' },
};

const sections = [
  {
    title: 'Main',
    links: [
      { href: '/', label: 'Home' },
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/how-it-works', label: 'How it Works' },
      { href: '/assessment', label: 'Free Assessment' },
    ],
  },
  {
    title: 'Products',
    links: [
      { href: '/cloudfix', label: 'CloudFix' },
      { href: '/rightspend', label: 'RightSpend' },
      { href: '/querylens', label: 'QueryLens' },
      { href: '/promptlens', label: 'PromptLens' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/leadership', label: 'Leadership' },
      { href: '/careers', label: 'Careers' },
      { href: '/partners', label: 'Partners' },
      { href: '/security', label: 'Security' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Content',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/resources', label: 'Resources' },
      { href: '/podcast', label: 'Podcast' },
      { href: '/livestream', label: 'Livestream' },
      { href: '/videos', label: 'Videos' },
      { href: '/success-stories', label: 'Success Stories' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/sitemap.xml', label: 'XML Sitemap' },
      { href: '/robots.txt', label: 'Robots.txt' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen">
      <section className="py-12">
        <div className="container-custom">
          <h1 className="mb-8 text-4xl font-bold">Sitemap</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-primary hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

