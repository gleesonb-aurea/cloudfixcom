import Hero from '@/components/Hero';
import ContentBlock from '@/components/ContentBlock';
import TeamCard from '@/components/ui/TeamCard';

export const metadata = {
  title: 'Leadership | CloudFix',
  description: 'Meet the leaders behind CloudFix and our mission to automate AWS cost optimization.',
  alternates: { canonical: '/leadership' },
};

export default function LeadershipPage() {
  const leadershipTeam = [
    {
      name: 'John Smith',
      role: 'Chief Executive Officer',
      bio: '20+ years building cloud and SaaS products.',
      photoSrc: '/images/CloudFix_Logo_Color.png',
      socials: [
        { type: 'linkedin' as const, href: 'https://linkedin.com' },
        { type: 'twitter' as const, href: 'https://twitter.com' },
      ],
    },
    {
      name: 'Jane Doe',
      role: 'Chief Technology Officer',
      bio: 'Scaled platforms to millions of workloads on AWS.',
      photoSrc: '/images/CloudFix_Logo_Color.png',
      socials: [
        { type: 'linkedin' as const, href: 'https://linkedin.com' },
      ],
    },
    {
      name: 'Alex Kim',
      role: 'VP, Product',
      bio: 'Leads product strategy and customer experience.',
      photoSrc: '/images/CloudFix_Logo_Color.png',
      socials: [
        { type: 'linkedin' as const, href: 'https://linkedin.com' },
      ],
    },
  ];

  return (
    <div>
      <Hero
        title="Leadership Team"
        subtitle="Experienced leaders driving cloud innovation"
        description="Meet the experts behind CloudFix’s mission to make AWS cost optimization simple and automatic."
      />

      <ContentBlock title="Our Leadership" columns={3}>
        {leadershipTeam.map((leader) => (
          <TeamCard key={leader.name} {...leader} />
        ))}
      </ContentBlock>

      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="mb-6 text-3xl font-bold">Join Our Team</h2>
          <p className="mb-8 text-xl text-gray-600">We’re always looking for talented people who share our values.</p>
          <a href="/careers" className="rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white">
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
}
