import Hero from '@/components/Hero';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import JobCard from '@/components/ui/JobCard';

export const metadata = {
  title: 'Careers | CloudFix',
  description: 'Build the future of automated AWS cost optimization with CloudFix.',
  alternates: { canonical: '/careers' },
};

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build the next generation of cloud optimization tools.',
    },
    {
      title: 'Product Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Own positioning and go-to-market for CloudFix.',
    },
  ];

  const benefits = [
    { icon: '💰', title: 'Competitive Salary', description: 'Top-of-market compensation and equity.' },
    { icon: '🏥', title: 'Health Benefits', description: 'Premium medical, dental, and vision.' },
    { icon: '🌴', title: 'Flexible PTO', description: 'Recharge with flexible time off.' },
  ];

  return (
    <div>
      <Hero
        title="Join Our Team"
        subtitle="Build the future of cloud optimization"
        description="Help companies save millions on AWS costs while growing your career in a fast-paced, innovative environment."
        ctaText="View Open Positions"
      />

      <ContentBlock title="Open Positions">
        <div className="space-y-4">
          {openPositions.map((p) => (
            <JobCard key={p.title} {...p} />
          ))}
        </div>
      </ContentBlock>

      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Work at CloudFix?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <FeatureCard key={b.title} icon={b.icon} title={b.title} description={b.description} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

