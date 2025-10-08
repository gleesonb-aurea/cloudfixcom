import Hero from '@/components/Hero';
import ContentBlock from '@/components/ContentBlock';
import PartnerLogo from '@/components/ui/PartnerLogo';

export const metadata = {
  title: 'Partners | CloudFix',
  description: 'Explore the CloudFix partner ecosystem and certifications.',
  alternates: { canonical: '/partners' },
};

export default function PartnersPage() {
  const partners = [
    { name: 'AWS Partner', logo: '/images/aws-Partner.png' },
    { name: 'FinOps Certified', logo: '/images/FinOps_Certified_Solution.png' },
  ];

  return (
    <div>
      <Hero
        title="Partners"
        subtitle="Ecosystem & Certifications"
        description="We partner with leading organizations to deliver trusted, enterprise-grade cost optimization."
      />

      <ContentBlock title="Our Partners" columns={3}>
        {partners.map((p) => (
          <PartnerLogo key={p.name} name={p.name} logo={p.logo} />
        ))}
      </ContentBlock>
    </div>
  );
}

