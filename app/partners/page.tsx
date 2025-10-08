import Hero from '@/components/Hero';
import ContentBlock from '@/components/ContentBlock';
import Image from 'next/image';

export const metadata = {
  title: 'Partners | CloudFix',
  description: 'Explore the CloudFix partner ecosystem and certifications.',
  alternates: { canonical: '/partners' },
};

export default function PartnersPage() {
  const badges = [
    {
      name: 'AWS Cloud Operations Software Competency',
      logo: 'https://cloudfix.com/wp-content/uploads/cloud-ops-competency.png',
    },
    {
      name: 'AWS Qualified Software',
      logo: 'https://cloudfix.com/wp-content/uploads/AWS-Qualified-Software.svg',
    },
    {
      name: 'SOC 2 Type 1 and 2 Certified',
      logo: 'https://cloudfix.com/wp-content/uploads/aicpa_soc.png',
    },
    {
      name: 'FinOps Foundation Member',
      logo: 'https://cloudfix.com/wp-content/uploads/finops-foundation.png',
    },
    {
      name: 'FinOps Certified Solution',
      logo: 'https://cloudfix.com/wp-content/uploads/FinOps_Certified_Solution.png',
    },
  ];

  return (
    <div>
      <Hero
        title="Partnerships"
        subtitle="Proud partner of the #1 public cloud"
        description="We’re 100% committed to AWS and the FinOps community — partnering to deliver trusted, enterprise-grade cost optimization."
      />

      <ContentBlock title="Ecosystem & Certifications" columns={3}>
        {badges.map((b) => (
          <div key={b.name} className="text-center">
            <div className="mx-auto flex h-24 w-full items-center justify-center">
              <Image src={b.logo} alt={b.name} width={160} height={96} className="h-24 w-auto object-contain" />
            </div>
            <p className="mt-2 text-sm text-gray-600">{b.name}</p>
          </div>
        ))}
      </ContentBlock>

      <section className="py-20">
        <div className="container-custom">
          <h2 className="mb-6 text-3xl font-bold">Partner with CloudFix</h2>
          <p className="mb-8 max-w-3xl text-gray-600">
            Interested in partnering with CloudFix? Explore opportunities to collaborate and bring automated AWS cost optimization to more customers.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://cloudfix.com/partnerships-become-a-referral-partner/"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
            >
              Become a Referral Partner
            </a>
            <a
              href="https://cloudfix.com/partner-opportunity-submission/"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:bg-white"
            >
              Partner Opportunity Submission
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
