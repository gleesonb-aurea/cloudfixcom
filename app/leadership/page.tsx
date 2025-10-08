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
      name: 'Brandon Pizzacalla',
      role: 'CEO',
      bio: 'Leads CloudFix with a focus on scaling SaaS and customer outcomes.',
      photoSrc: 'https://cloudfix.com/wp-content/uploads/brandon-with-background.png',
      socials: [],
    },
    {
      name: 'Rahul Subramaniam',
      role: 'Founder',
      bio: 'Founder and long-time AWS advocate.',
      photoSrc: 'https://cloudfix.com/wp-content/uploads/Rahul-600x600-1.jpg',
      socials: [],
    },
    {
      name: 'Stephen Barr',
      role: 'Chief Evangelist',
      bio: 'Chief Evangelist for CloudFix and host of AWS Insiders.',
      photoSrc: 'https://cloudfix.com/wp-content/uploads/stephen-barr_3-600x600.jpg',
      socials: [],
    },
    {
      name: 'Bill Gleeson',
      role: 'Chief Solutions Architect',
      bio: 'Drives solution architecture and customer success.',
      photoSrc: 'https://cloudfix.com/wp-content/uploads/bill-gleeson.jpeg',
      socials: [],
    },
    {
      name: 'Dmitry Degtyarev',
      role: 'Vice President of Technical Product Management',
      bio: 'Leads technical product management for CloudFix.',
      photoSrc: 'https://cloudfix.com/wp-content/uploads/dimitry-square.png',
      socials: [],
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
