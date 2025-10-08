import Hero from '@/components/Hero';
import ContentBlock, { FeatureCard } from '@/components/ContentBlock';
import SecurityBadge from '@/components/ui/SecurityBadge';

export const metadata = {
  title: 'Security | CloudFix',
  description: 'Enterprise-grade security: SOC 2 Type II, best practices, and continuous monitoring.',
  alternates: { canonical: '/security' },
};

export default function SecurityPage() {
  const securityFeatures = [
    { icon: '🔐', title: 'Read-only Access', description: 'Minimal permissions, no agents, and no code changes.' },
    { icon: '🛡️', title: 'SOC 2 Type II', description: 'Controls and processes independently audited.' },
    { icon: '🔍', title: 'Continuous Monitoring', description: 'Real-time alerts and proactive security posture.' },
    { icon: '🔑', title: 'Least Privilege', description: 'IAM policies aligned with least-privilege access.' },
  ];
  const complianceBadges = [
    { name: 'SOC 2 Type II', logo: '/images/security/soc2.svg' },
  ];

  return (
    <div>
      <Hero
        title="Security & Compliance"
        subtitle="Enterprise-grade security you can trust"
        description="CloudFix meets the highest security standards with comprehensive controls, certifications, and continuous monitoring."
      />

      <ContentBlock title="Security Features" columns={2}>
        {securityFeatures.map((f) => (
          <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
        ))}
      </ContentBlock>

      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold">Compliance & Certifications</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {complianceBadges.map((b) => (
              <div key={b.name} className="text-center">
                <SecurityBadge name={b.name} logo={b.logo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContentBlock title="Our Security Approach">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Infrastructure Security</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 24/7 monitoring and threat detection</li>
              <li>• Regular penetration testing and assessments</li>
              <li>• MFA for all systems</li>
              <li>• Network segmentation and firewall protection</li>
              <li>• Automated security patching</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold">Data Protection</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Least-privilege access controls</li>
              <li>• Regular security audits</li>
              <li>• Backup and disaster recovery procedures</li>
              <li>• Employee security training</li>
              <li>• Incident response procedures</li>
            </ul>
          </div>
        </div>
      </ContentBlock>
    </div>
  );
}
