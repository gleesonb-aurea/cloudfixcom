# Phase 6: Additional Pages Implementation Plan

**Created**: October 7, 2025
**Status**: Ready for Implementation
**Priority**: 🔵 LOW (Final phase - completes 24-page site)
**Estimated Effort**: 30-40 hours
**Complexity**: Low-Medium
**Timeline**: Week 5-6

---

## 🎯 Implementation Goals

Complete the final 18 pages to bring the CloudFix Next.js site to full 24-page completion. This phase focuses on content pages, legal pages, company information, and technical pages that round out the comprehensive website experience.

**Phase 6 Pages to Build:**
1. **Core Pages** (5 pages) - Company and process information
2. **Legal Pages** (2 pages) - Privacy and terms compliance
3. **Content Pages** (8 pages) - Blog, resources, multimedia
4. **Technical Pages** (3 pages) - Error handling and navigation

---

## 📋 Current State Analysis

**Project Progress:**
- ✅ **32% Complete** (6 of 24 pages + major component library)
- ✅ Header dropdown navigation complete
- ✅ Component library with full accessibility
- ✅ Product pages built (CloudFix, RightSpend, QueryLens, PromptLens)
- ✅ Core pages: Homepage, Features, Pricing, Contact (stub), About (stub), Assessment (stub)

**Phase 6 Dependencies:**
- ✅ Component library available (Hero, ContentBlock, FeatureCard, StatCard, TestimonialCard, etc.)
- ✅ Brand color system implemented (cyan/blue/yellow)
- ✅ Content systems foundation from Phase 4
- ✅ Form system from Phase 1 for contact pages
- ✅ SEO patterns established from previous phases

**Remaining Pages Status:**
- ❌ All 18 Phase 6 pages currently return 404
- ❌ No content structure for blog/resources
- ❌ Missing legal compliance pages
- ❌ No error page handling
- ❌ Incomplete company information pages

---

## 🏗️ Target Architecture

### Page Organization Strategy
```
Phase 6 Pages by Category:

1. Core Pages (High User Value)
   ├── /how-it-works        - Process explanation
   ├── /leadership          - Team leadership
   ├── /careers             - Job opportunities
   ├── /partners            - Partner program
   └── /security            - Security & compliance

2. Legal Pages (Compliance Required)
   ├── /privacy-policy      - Data privacy
   └── /terms-of-service    - Terms & conditions

3. Content Pages (SEO & Engagement)
   ├── /blog                - Blog listing (Phase 4 foundation)
   ├── /blog/[slug]         - Individual posts (Phase 4 foundation)
   ├── /resources           - Resource library (Phase 4 foundation)
   ├── /podcast             - Audio content (Phase 4 foundation)
   ├── /livestream          - Live video content (Phase 4 foundation)
   ├── /videos              - Video library (Phase 4 foundation)
   └── /success-stories     - Customer case studies

4. Technical Pages (UX & Navigation)
   ├── /sitemap             - HTML sitemap
   ├── /404                 - Custom error page
   └── /500                 - Server error page
```

### Component Reuse Strategy
```tsx
// Existing Components to Reuse
- Hero.tsx (page headers)
- ContentBlock.tsx (main content sections)
- FeatureCard.tsx (feature highlights)
- StatCard.tsx (metrics and numbers)
- TestimonialCard.tsx (customer stories)
- Newsletter.tsx (lead capture)
- Header.tsx & Footer.tsx (navigation)
- Modal.tsx (popups and forms)

// Phase 4 Content System Components
- ResourceCard.tsx (content discovery)
- TeamCard.tsx (leadership profiles)
- VideoPlayer.tsx (multimedia content)
- AudioPlayer.tsx (podcast content)

// New Components to Create
- ProcessStep.tsx (how-it-works steps)
- JobCard.tsx (career opportunities)
- PartnerLogo.tsx (partner showcases)
- SecurityBadge.tsx (compliance indicators)
- Breadcrumb.tsx (navigation breadcrumbs)
- SearchBox.tsx (content search)
```

---

## 🎨 Visual Design Specifications

### Consistent Page Template
```tsx
Standard Page Layout:
- Hero Section: Compelling title, subtitle, background image
- Content Sections: 2-3 ContentBlock sections with relevant content
- CTAs: Appropriate calls-to-action based on page purpose
- Newsletter Signup: Lead capture on content-heavy pages
- Footer: Standard navigation and contact information

Visual Hierarchy:
- Primary heading: 3xl font, bold, primary color
- Secondary headings: 2xl font, semibold
- Body text: lg font, normal weight
- Accent text: yellow highlight for CTAs and important info
- Backgrounds: Alternating white and gray-50 sections
```

### Page-Specific Design Elements
```tsx
// How It Works - Process Visualization
- Numbered steps with icons
- Progress indicators
- Visual flow diagrams
- Before/after comparisons

// Leadership - Team Profiles
- Professional headshots
- Role titles and bios
- Social media links
- Team photos/culture images

// Careers - Job Listings
- Job category filters
- Location-based search
- Benefits showcase
- Company culture section

// Security - Trust & Compliance
- Security badges and logos
- Compliance checklist
- Technical security details
- Trust indicators
```

---

## 🔧 Implementation Tasks

### Task 1: Core Company Pages (12 hours)

#### Task 1.1: How It Works Page (3 hours)

**Create `/app/how-it-works/page.tsx`:**
```tsx
export default function HowItWorksPage() {
  return (
    <div>
      <Hero
        title="How CloudFix Works"
        subtitle="Automated AWS cost optimization in 4 simple steps"
        description="Learn how CloudFix continuously monitors your AWS infrastructure, identifies savings opportunities, and implements optimizations automatically."
        ctaText="Start Free Assessment"
        ctaLink="/assessment"
        backgroundImage="/images/how-it-works-hero.jpg"
      />

      {/* Process Steps */}
      <ContentBlock title="Our Optimization Process" columns={4}>
        <ProcessStep
          number="1"
          title="Connect Your AWS Account"
          description="Securely connect your AWS account using read-only IAM credentials. No agents to install, no code to deploy."
          icon="🔗"
        />
        <ProcessStep
          number="2"
          title="AI Analysis"
          description="Our AI algorithms analyze your infrastructure patterns, usage trends, and cost history 24/7."
          icon="🤖"
        />
        <ProcessStep
          number="3"
          title="Smart Recommendations"
          description="Receive personalized recommendations with guaranteed savings amounts and implementation timeframes."
          icon="💡"
        />
        <ProcessStep
          number="4"
          title="Automated Implementation"
          description="Approve recommendations and CloudFix implements them automatically with continuous monitoring."
          icon="⚡"
        />
      </ContentBlock>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CloudFix?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🛡️"
              title="100% Secure"
              description="Read-only access, SOC 2 Type II certified, zero-trust security architecture"
            />
            <FeatureCard
              icon="⏱️"
              title="Quick Setup"
              description="Start saving in minutes, not months. No agents, no code changes required"
            />
            <FeatureCard
              icon="📈"
              title="Proven Results"
              description="Average 35% savings on AWS costs for our customers"
            />
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <ContentBlock title="Trusted by Industry Leaders">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <PartnerLogo name="AWS Partner" logo="/images/aws-partner.png" />
          <PartnerLogo name="SOC 2" logo="/images/soc2.png" />
          <PartnerLogo name="ISO 27001" logo="/images/iso27001.png" />
          <PartnerLogo name="GDPR" logo="/images/gdpr.png" />
        </div>
      </ContentBlock>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-xl mb-8">Join hundreds of companies saving millions on AWS costs</p>
          <a href="/assessment" className="bg-accent text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg">
            Start Free Assessment
          </a>
        </div>
      </section>
    </div>
  );
}
```

**Create ProcessStep component:**
```tsx
// components/ProcessStep.tsx
interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export function ProcessStep({ number, title, description, icon }: ProcessStepProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
        {icon}
      </div>
      <div className="text-3xl font-bold text-primary mb-2">{number}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
```

**Commit Message:**
```
feat(core): create comprehensive how-it-works page

- Build /how-it-works page with 4-step process visualization
- Implement ProcessStep component for numbered workflow
- Add value proposition section with 3 key benefits
- Include trust indicators and compliance badges
- Create strong CTA section directing to assessment
- Use existing components (Hero, ContentBlock, FeatureCard)
```

#### Task 1.2: Leadership Page (3 hours)

**Create `/app/leadership/page.tsx`:**
```tsx
export default function LeadershipPage() {
  const leadershipTeam = [
    {
      name: "John Smith",
      role: "Chief Executive Officer",
      bio: "20+ years in cloud computing and enterprise SaaS. Previously led engineering at major AWS consulting firms.",
      image: "/images/leadership/john-smith.jpg",
      linkedin: "https://linkedin.com/in/johnsmith",
      twitter: "https://twitter.com/johnsmith"
    },
    // ... more leadership profiles
  ];

  return (
    <div>
      <Hero
        title="Leadership Team"
        subtitle="Experienced leaders driving cloud innovation"
        description="Meet the experts behind CloudFix's mission to make AWS cost optimization simple and automatic."
        backgroundImage="/images/leadership-hero.jpg"
      />

      {/* Leadership Team Grid */}
      <ContentBlock title="Our Leadership" columns={3}>
        {leadershipTeam.map((leader, index) => (
          <TeamCard
            key={index}
            name={leader.name}
            role={leader.role}
            bio={leader.bio}
            image={leader.image}
            linkedin={leader.linkedin}
            twitter={leader.twitter}
          />
        ))}
      </ContentBlock>

      {/* Company Culture */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Customer Obsessed</h3>
              <p className="text-gray-600">We put customers first in every decision we make</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-2">Data Driven</h3>
              <p className="text-gray-600">Decisions backed by data, not opinions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Move Fast</h3>
              <p className="text-gray-600">Speed and innovation in everything we do</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Win Together</h3>
              <p className="text-gray-600">Collaboration and mutual success</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl mb-8 text-gray-600">We're always looking for talented people who share our values</p>
          <a href="/careers" className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg">
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
}
```

**Commit Message:**
```
feat(company): build leadership page with team profiles

- Create /leadership page showcasing executive team
- Implement TeamCard component for leader profiles
- Add company values section with 4 core principles
- Include social media links and professional bios
- Create careers CTA for recruitment pipeline
```

#### Task 1.3: Careers Page (3 hours)

**Create `/app/careers/page.tsx`:**
```tsx
export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build the next generation of cloud optimization tools"
    },
    // ... more positions
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "Top-of-market compensation and equity"
    },
    {
      icon: "🏥",
      title: "Health Benefits",
      description: "Premium medical, dental, and vision insurance"
    },
    // ... more benefits
  ];

  return (
    <div>
      <Hero
        title="Join Our Team"
        subtitle="Build the future of cloud optimization"
        description="Help companies save millions on AWS costs while growing your career in a fast-paced, innovative environment."
        ctaText="View Open Positions"
        backgroundImage="/images/careers-hero.jpg"
      />

      {/* Open Positions */}
      <ContentBlock title="Open Positions">
        <div className="space-y-4">
          {openPositions.map((position, index) => (
            <JobCard
              key={index}
              title={position.title}
              department={position.department}
              location={position.location}
              type={position.type}
              description={position.description}
            />
          ))}
        </div>
      </ContentBlock>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work at CloudFix?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <FeatureCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <ContentBlock title="Our Culture">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            At CloudFix, we're building a team of passionate problem-solvers who are obsessed with
            helping customers optimize their cloud infrastructure. We believe in:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Work-life balance with flexible schedules</li>
            <li>Continuous learning and professional development</li>
            <li>Collaborative, inclusive environment</li>
            <li>Direct impact on company success</li>
            <li>Transparent communication and decision-making</li>
          </ul>
        </div>
      </ContentBlock>
    </div>
  );
}
```

**Create JobCard component:**
```tsx
// components/JobCard.tsx
interface JobCardProps {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export function JobCard({ title, department, location, type, description }: JobCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
          {type}
        </span>
      </div>
      <div className="flex gap-4 text-sm text-gray-500 mb-3">
        <span>📍 {location}</span>
        <span>🏢 {department}</span>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-primary font-semibold hover:underline">
        Learn More →
      </button>
    </div>
  );
}
```

**Commit Message:**
```
feat(company): create comprehensive careers page

- Build /careers page with job listings and benefits
- Implement JobCard component for position display
- Add company culture section and values
- Include competitive benefits showcase
- Create application pipeline for recruitment
```

#### Task 1.4: Partners Page (2 hours)

**Create `/app/partners/page.tsx`:**
```tsx
export default function PartnersPage() {
  const partnerTypes = [
    {
      type: "Technology Partners",
      description: "Integration with leading cloud and SaaS platforms",
      partners: ["AWS", "Google Cloud", "Microsoft Azure", "Datadog"]
    },
    {
      type: "Consulting Partners",
      description: "Expert implementation and optimization services",
      partners: ["Deloitte", "Accenture", "McKinsey", "BCG"]
    },
    {
      type: "Reseller Partners",
      description: "Bring CloudFix to your customers",
      partners: ["CDW", "Insight", "SHI", "Softcat"]
    }
  ];

  return (
    <div>
      <Hero
        title="Partner with CloudFix"
        subtitle="Join our ecosystem of cloud optimization leaders"
        description="Partner with us to help customers optimize their AWS infrastructure and reduce costs."
        ctaText="Become a Partner"
        ctaLink="/contact"
        backgroundImage="/images/partners-hero.jpg"
      />

      {/* Partner Categories */}
      {partnerTypes.map((category, index) => (
        <ContentBlock key={index} title={category.type} columns={4}>
          {category.partners.map((partner, partnerIndex) => (
            <PartnerLogo
              key={partnerIndex}
              name={partner}
              logo={`/images/partners/${partner.toLowerCase().replace(/\s+/g, '-')}.png`}
            />
          ))}
          <div className="col-span-4 mt-4">
            <p className="text-gray-600 text-center">{category.description}</p>
          </div>
        </ContentBlock>
      ))}

      {/* Partner Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Partner Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="💰"
              title="Revenue Share"
              description="Competitive commission structure and recurring revenue"
            />
            <FeatureCard
              icon="🎓"
              title="Training & Certification"
              description="Comprehensive training program and technical certification"
            />
            <FeatureCard
              icon="🤝"
              title="Joint Marketing"
              description="Co-marketing opportunities and lead sharing programs"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Partner?</h2>
          <p className="text-xl mb-8">Join our growing ecosystem of cloud optimization partners</p>
          <a href="/contact" className="bg-accent text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg">
            Contact Partnership Team
          </a>
        </div>
      </section>
    </div>
  );
}
```

**Create PartnerLogo component:**
```tsx
// components/PartnerLogo.tsx
interface PartnerLogoProps {
  name: string;
  logo: string;
}

export function PartnerLogo({ name, logo }: PartnerLogoProps) {
  return (
    <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <img
        src={logo}
        alt={`${name} logo`}
        className="max-h-12 max-w-full grayscale hover:grayscale-0 transition-all"
      />
    </div>
  );
}
```

**Commit Message:**
```
feat(company): create partners page with ecosystem showcase

- Build /partners page showcasing technology and consulting partners
- Implement PartnerLogo component for partner display
- Add partner benefits and revenue sharing information
- Create partner program categories and descriptions
- Include strong CTA for partnership inquiries
```

#### Task 1.5: Security Page (1 hour)

**Create `/app/security/page.tsx`:**
```tsx
export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: "🔒",
      title: "End-to-End Encryption",
      description: "All data encrypted in transit and at rest using AES-256 encryption"
    },
    {
      icon: "🛡️",
      title: "SOC 2 Type II Certified",
      description: "Independent verification of our security controls and processes"
    },
    {
      icon: "👁️",
      title: "Read-Only Access",
      description: "Never modify your AWS infrastructure without explicit approval"
    },
    {
      icon: "🏛️",
      title: "Compliance Ready",
      description: "GDPR, CCPA, HIPAA compliant with regular audits"
    }
  ];

  const complianceBadges = [
    { name: "SOC 2 Type II", logo: "/images/security/soc2.png" },
    { name: "ISO 27001", logo: "/images/security/iso27001.png" },
    { name: "GDPR", logo: "/images/security/gdpr.png" },
    { name: "HIPAA", logo: "/images/security/hipaa.png" }
  ];

  return (
    <div>
      <Hero
        title="Security & Compliance"
        subtitle="Enterprise-grade security you can trust"
        description="CloudFix meets the highest security standards with comprehensive controls, certifications, and continuous monitoring."
        backgroundImage="/images/security-hero.jpg"
      />

      {/* Security Features */}
      <ContentBlock title="Security Features" columns={2}>
        {securityFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </ContentBlock>

      {/* Compliance Badges */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Compliance & Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {complianceBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <SecurityBadge name={badge.name} logo={badge.logo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <ContentBlock title="Our Security Approach">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Infrastructure Security</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 24/7 security monitoring and threat detection</li>
              <li>• Regular penetration testing and vulnerability assessments</li>
              <li>• Multi-factor authentication for all systems</li>
              <li>• Network segmentation and firewall protection</li>
              <li>• Automated security patching and updates</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Data Protection</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Principle of least privilege access</li>
              <li>• Regular security audits and assessments</li>
              <li>• Data backup and disaster recovery procedures</li>
              <li>• Employee background checks and security training</li>
              <li>• Incident response and breach notification procedures</li>
            </ul>
          </div>
        </div>
      </ContentBlock>

      {/* Contact Security Team */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Security Questions?</h2>
          <p className="text-xl mb-8">Our security team is here to address any concerns</p>
          <a href="/contact" className="bg-accent text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg">
            Contact Security Team
          </a>
        </div>
      </section>
    </div>
  );
}
```

**Create SecurityBadge component:**
```tsx
// components/SecurityBadge.tsx
interface SecurityBadgeProps {
  name: string;
  logo: string;
}

export function SecurityBadge({ name, logo }: SecurityBadgeProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <img
        src={logo}
        alt={`${name} certification`}
        className="w-full h-16 object-contain mb-2"
      />
      <p className="text-sm text-gray-600 font-medium">{name}</p>
    </div>
  );
}
```

**Commit Message:**
```
feat(company): create comprehensive security page

- Build /security page with enterprise security features
- Implement SecurityBadge component for certifications
- Add compliance information (SOC 2, ISO 27001, GDPR, HIPAA)
- Include infrastructure security and data protection details
- Create security team contact CTA
```

---

### Task 2: Legal Compliance Pages (4 hours)

#### Task 2.1: Privacy Policy Page (2 hours)

**Create `/app/privacy-policy/page.tsx`:**
```tsx
export default function PrivacyPolicyPage() {
  const lastUpdated = "October 7, 2025";

  return (
    <div className="min-h-screen">
      {/* Minimal Hero */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Information We Collect</h2>
            <p>CloudFix collects information to provide and improve our services. This includes:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, company information when you create an account</li>
              <li><strong>Usage Data:</strong> AWS usage metrics and cost data for optimization analysis</li>
              <li><strong>Technical Data:</strong> IP addresses, browser information, and device identifiers</li>
              <li><strong>Communication Data:</strong> Support tickets, feedback, and other communications</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide cloud cost optimization services</li>
              <li>Generate savings recommendations and reports</li>
              <li>Communicate about your account and our services</li>
              <li>Improve our products and customer experience</li>
              <li>Ensure security and prevent fraud</li>
            </ul>

            <h2>Data Security</h2>
            <p>We implement industry-standard security measures including:</p>
            <ul>
              <li>End-to-end encryption for all data transmission</li>
              <li>AES-256 encryption for data at rest</li>
              <li>SOC 2 Type II certified security controls</li>
              <li>Regular security audits and penetration testing</li>
              <li>Strict access controls and authentication requirements</li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>CloudFix integrates with third-party services including:</p>
            <ul>
              <li><strong>AWS:</strong> Read-only access to your AWS infrastructure for cost analysis</li>
              <li><strong>HubSpot:</strong> Customer relationship management and email communications</li>
              <li><strong>Google Analytics:</strong> Website usage analytics and performance monitoring</li>
            </ul>

            <h2>International Data Transfers</h2>
            <p>Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international data transfers in compliance with GDPR and other applicable regulations.</p>

            <h2>Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.</p>

            <h2>Contact Us</h2>
            <p>If you have questions about this privacy policy or your data rights, please contact us at:</p>
            <ul>
              <li>Email: privacy@cloudfix.com</li>
              <li>Address: CloudFix Inc., [Your Address]</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'Privacy Policy - CloudFix',
  description: 'CloudFix privacy policy - Learn how we collect, use, and protect your data',
  robots: 'noindex, nofollow',
};
```

**Commit Message:**
```
feat(legal): create comprehensive privacy policy page

- Build /privacy-policy page with GDPR and CCPA compliance
- Include data collection, usage, and security information
- Add user rights and contact information
- Implement minimal hero and prose-style content layout
- Ensure legal compliance for international data transfers
```

#### Task 2.2: Terms of Service Page (2 hours)

**Create `/app/terms-of-service/page.tsx`:**
```tsx
export default function TermsOfServicePage() {
  const lastUpdated = "October 7, 2025";

  return (
    <div className="min-h-screen">
      {/* Minimal Hero */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Agreement to Terms</h2>
            <p>By accessing and using CloudFix services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.</p>

            <h2>Service Description</h2>
            <p>CloudFix provides automated AWS cost optimization services including:</p>
            <ul>
              <li>Analysis of AWS usage patterns and costs</li>
              <li>Identification of cost-saving opportunities</li>
              <li>Implementation of approved optimizations</li>
              <li>Continuous monitoring and reporting</li>
            </ul>

            <h2>User Responsibilities</h2>
            <p>As a CloudFix user, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Grant appropriate AWS permissions for analysis</li>
              <li>Review and approve optimization recommendations</li>
              <li>Use the service in compliance with AWS terms of service</li>
            </ul>

            <h2>Payment and Billing</h2>
            <p>CloudFix offers various pricing models:</p>
            <ul>
              <li><strong>Free Assessment:</strong> Initial cost analysis at no charge</li>
              <li><strong>Subscription Plans:</strong> Monthly or annual billing</li>
              <li><strong>Usage-Based Pricing:</strong> Based on AWS spend under management</li>
            </ul>
            <p>All fees are non-refundable except as required by applicable law.</p>

            <h2>Service Level Agreement</h2>
            <p>CloudFix strives to maintain:</p>
            <ul>
              <li>99.9% service availability</li>
              <li>24-hour response time for support inquiries</li>
              <li>Regular security updates and maintenance</li>
              <li>Continuous improvement of optimization algorithms</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>CloudFix shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for the service in the preceding 12 months.</p>

            <h2>Intellectual Property</h2>
            <p>All CloudFix software, algorithms, and content remain the property of CloudFix Inc. You may not copy, modify, or redistribute our proprietary technology without explicit written permission.</p>

            <h2>Termination</h2>
            <p>Either party may terminate these terms with 30 days written notice. Upon termination, you must cease using the service and we will delete your account and associated data within 30 days.</p>

            <h2>Governing Law</h2>
            <p>These terms shall be governed by the laws of [Your Jurisdiction] without regard to conflict of law principles.</p>

            <h2>Changes to Terms</h2>
            <p>We may modify these terms at any time. We will provide at least 30 days notice for material changes via email or prominent website notification.</p>

            <h2>Contact Information</h2>
            <p>For questions about these terms, please contact us at:</p>
            <ul>
              <li>Email: legal@cloudfix.com</li>
              <li>Address: CloudFix Inc., [Your Address]</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'Terms of Service - CloudFix',
  description: 'CloudFix terms of service - Legal agreement for using our cloud cost optimization platform',
  robots: 'noindex, nofollow',
};
```

**Commit Message:**
```
feat(legal): create comprehensive terms of service page

- Build /terms-of-service page with service agreements
- Include payment terms, SLAs, and liability limitations
- Add intellectual property and termination clauses
- Implement proper legal structure and formatting
- Ensure compliance with business requirements
```

---

### Task 3: Content System Pages (12 hours)

#### Task 3.1: Blog System Foundation (4 hours)
*This builds on Phase 4 content systems*

**Update `/app/blog/page.tsx`:**
```tsx
export default function BlogPage() {
  const blogPosts = [
    {
      slug: "5-aws-cost-optimization-tips",
      title: "5 AWS Cost Optimization Tips Every Startup Should Know",
      excerpt: "Learn how to reduce your AWS bill by up to 40% with these proven optimization strategies.",
      author: "John Smith",
      date: "2025-10-01",
      category: "Cost Optimization",
      readTime: "5 min read",
      image: "/images/blog/aws-cost-tips.jpg"
    },
    // ... more blog posts
  ];

  return (
    <div>
      <Hero
        title="CloudFix Blog"
        subtitle="Insights on AWS optimization and cloud cost management"
        description="Expert advice, case studies, and best practices for optimizing your cloud infrastructure."
        backgroundImage="/images/blog-hero.jpg"
      />

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Featured</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {blogPosts[0].category}
                  </span>
                  <span className="text-gray-500">{blogPosts[0].readTime}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  <Link href={`/blog/${blogPosts[0].slug}`} className="hover:text-primary">
                    {blogPosts[0].title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By {blogPosts[0].author}</span>
                  <span>•</span>
                  <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <ContentBlock title="Recent Articles">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <ResourceCard
              key={index}
              title={post.title}
              description={post.excerpt}
              image={post.image}
              category={post.category}
              date={post.date}
              author={post.author}
              readTime={post.readTime}
              link={`/blog/${post.slug}`}
            />
          ))}
        </div>
      </ContentBlock>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <Newsletter
            title="Stay Updated"
            description="Get the latest AWS optimization tips and insights delivered to your inbox."
          />
        </div>
      </section>
    </div>
  );
}
```

**Create `/app/blog/[slug]/page.tsx`:**
```tsx
interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // In production, this would fetch from MDX files or CMS
  const post = {
    title: "5 AWS Cost Optimization Tips Every Startup Should Know",
    content: `
# 5 AWS Cost Optimization Tips Every Startup Should Know

As a startup, every dollar counts when it comes to your AWS bill. With the right strategies, you can significantly reduce your cloud costs while maintaining performance and reliability.

## 1. Use Reserved Instances Wisely

Reserved Instances (RIs) can save you up to 60% compared to On-Demand pricing. However, it's important to analyze your usage patterns before committing.

- Analyze at least 3 months of usage data
- Start with convertible RIs for flexibility
- Consider regional benefits for multi-region deployments

## 2. Rightsize Your Instances

Many companies overprovision their resources by 40% or more. Regular rightsizing can lead to substantial savings.

- Monitor CPU and memory utilization
- Use AWS Compute Optimizer for recommendations
- Implement auto-scaling for variable workloads

## 3. Leverage Spot Instances

For non-critical workloads, Spot Instances can save you up to 90% compared to On-Demand pricing.

- Perfect for batch processing, CI/CD, and testing
- Implement checkpointing for fault tolerance
- Use capacity-optimized allocation strategy

## 4. Optimize Storage

Storage costs can quickly add up, especially with unoptimized data management.

- Use S3 Intelligent-Tiering
- Implement lifecycle policies
- Regularly clean up unused volumes

## 5. Monitor and Tag Everything

You can't optimize what you don't measure.

- Implement comprehensive tagging strategies
- Use AWS Budgets for proactive alerts
- Regular cost reviews with stakeholders

## Conclusion

AWS cost optimization is an ongoing process, not a one-time project. By implementing these strategies and continuously monitoring your usage, you can achieve significant savings while maintaining the performance your customers expect.

Looking for automated optimization? [Try CloudFix](/assessment) to identify and implement savings opportunities automatically.
    `,
    author: "John Smith",
    date: "2025-10-01",
    category: "Cost Optimization",
    readTime: "5 min read",
    image: "/images/blog/aws-cost-tips.jpg"
  };

  return (
    <div>
      {/* Article Header */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
              <span className="text-gray-500">{post.readTime}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </div>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.slice(2)}</h2>;
              } else if (paragraph.startsWith('## ')) {
                return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{paragraph.slice(3)}</h3>;
              } else if (paragraph.startsWith('- ')) {
                return <li key={index} className="ml-6 mb-2">{paragraph.slice(2)}</li>;
              } else {
                return <p key={index} className="mb-4 text-gray-700">{paragraph}</p>;
              }
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <Newsletter
            title="Want More AWS Tips?"
            description="Subscribe to our newsletter for weekly optimization strategies and insights."
          />
        </div>
      </section>
    </div>
  );
}
```

**Commit Message:**
```
feat(content): build blog system with listing and detail pages

- Create /blog page with featured posts and article grid
- Implement /blog/[slug] dynamic route for individual posts
- Add ResourceCard component for blog post display
- Include author information, reading time, and categories
- Create newsletter signup integration
```

#### Task 3.2: Resources Page (2 hours)

**Create `/app/resources/page.tsx`:**
```tsx
export default function ResourcesPage() {
  const resources = [
    {
      title: "AWS Cost Optimization Guide",
      description: "Comprehensive guide to reducing your AWS costs by up to 40%",
      type: "ebook",
      category: "Guides",
      image: "/images/resources/aws-cost-guide.jpg",
      downloadUrl: "#",
      size: "2.4 MB"
    },
    {
      title: "Cloud Cost Calculator",
      description: "Interactive tool to estimate potential savings with CloudFix",
      type: "tool",
      category: "Tools",
      image: "/images/resources/cost-calculator.jpg",
      linkUrl: "/calculator",
      size: "Web Tool"
    },
    // ... more resources
  ];

  const categories = ["All", "Guides", "Tools", "Templates", "Webinars"];

  return (
    <div>
      <Hero
        title="Resources"
        subtitle="Tools and guides to optimize your cloud costs"
        description="Access our collection of free resources including guides, templates, calculators, and webinars to help you master cloud cost optimization."
        backgroundImage="/images/resources-hero.jpg"
      />

      {/* Category Filter */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  category === "All"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <ContentBlock title="All Resources">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              title={resource.title}
              description={resource.description}
              image={resource.image}
              category={resource.category}
              type={resource.type}
              downloadUrl={resource.downloadUrl}
              linkUrl={resource.linkUrl}
              size={resource.size}
            />
          ))}
        </div>
      </ContentBlock>

      {/* Most Popular */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Most Popular</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {resources.slice(0, 2).map((resource, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex gap-6">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div>
                    <span className="bg-primary text-white px-2 py-1 rounded text-xs">
                      {resource.type}
                    </span>
                    <h3 className="text-lg font-semibold mt-2 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                    <button className="text-primary font-semibold text-sm hover:underline">
                      {resource.downloadUrl ? "Download" : "Access"} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Commit Message:**
```
feat(content): create resources page with downloadable content

- Build /resources page with category filtering
- Implement ResourceCard component for guides, tools, and templates
- Add resource types (ebooks, tools, templates, webinars)
- Include file sizes and download/access links
- Create "Most Popular" section for featured content
```

#### Task 3.3: Multimedia Pages (6 hours)

**Create `/app/podcast/page.tsx`:**
```tsx
export default function PodcastPage() {
  const episodes = [
    {
      id: 1,
      title: "The Future of Cloud Cost Optimization",
      description: "Industry experts discuss emerging trends in cloud cost management and automation.",
      guest: "Jane Doe, AWS Solutions Architect",
      duration: "45 min",
      date: "2025-10-01",
      audioUrl: "/audio/episode-1.mp3",
      transcript: "# Episode Transcript..."
    },
    // ... more episodes
  ];

  return (
    <div>
      <Hero
        title="CloudFix Podcast"
        subtitle="Conversations on cloud optimization and cost management"
        description="Join industry experts as they share insights, best practices, and case studies on AWS cost optimization."
        backgroundImage="/images/podcast-hero.jpg"
      />

      {/* Featured Episode */}
      {episodes.length > 0 && (
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Latest Episode</h2>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">{episodes[0].title}</h3>
                  <p className="text-gray-600 mb-4">{episodes[0].description}</p>
                  <p className="text-sm text-gray-500 mb-4">Guest: {episodes[0].guest}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span>🎙️ {episodes[0].duration}</span>
                    <span>📅 {new Date(episodes[0].date).toLocaleDateString()}</span>
                  </div>
                  <AudioPlayer src={episodes[0].audioUrl} />
                </div>
                <div>
                  <div className="bg-gray-100 rounded-lg p-6">
                    <h4 className="font-semibold mb-3">Show Notes</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Cloud cost optimization strategies</li>
                      <li>• Real-world customer case studies</li>
                      <li>• Future of cloud financial operations</li>
                      <li>• Automation vs. manual optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Episodes */}
      <ContentBlock title="All Episodes">
        <div className="space-y-6">
          {episodes.map((episode) => (
            <div key={episode.id} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{episode.title}</h3>
                  <p className="text-gray-600 mb-3">{episode.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Guest: {episode.guest}</span>
                    <span>•</span>
                    <span>{episode.duration}</span>
                    <span>•</span>
                    <span>{new Date(episode.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="ml-6">
                  <AudioPlayer src={episode.audioUrl} compact />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* Subscribe Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Podcast</h2>
          <p className="text-xl mb-8 text-gray-600">Available on all major podcast platforms</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="bg-white border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
              🎧 Apple Podcasts
            </a>
            <a href="#" className="bg-white border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
              🎙️ Spotify
            </a>
            <a href="#" className="bg-white border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50">
              📱 Google Podcasts
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Create AudioPlayer component:**
```tsx
// components/AudioPlayer.tsx
interface AudioPlayerProps {
  src: string;
  compact?: boolean;
}

export function AudioPlayer({ src, compact = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`${compact ? 'flex items-center gap-2' : 'bg-gray-100 rounded-lg p-4'}`}>
      <audio ref={audioRef} src={src} />
      <button
        onClick={togglePlay}
        className={`bg-primary text-white rounded-full p-3 hover:bg-primary/600 transition-colors ${
          compact ? 'p-2' : 'p-3'
        }`}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      {!compact && (
        <div className="flex-1">
          <div className="bg-gray-300 rounded-full h-2 mb-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
```

**Create `/app/livestream/page.tsx`:**
```tsx
export default function LivestreamPage() {
  const upcomingStreams = [
    {
      title: "AWS re:Invent Recap & 2025 Predictions",
      description: "Join us for a recap of AWS re:Invent 2024 and predictions for cloud trends in 2025.",
      date: "2025-10-15",
      time: "2:00 PM EST",
      duration: "60 min",
      speaker: "John Smith, CEO",
      registrationUrl: "#"
    },
    // ... more streams
  ];

  const pastStreams = [
    {
      title: "Mastering AWS Cost Allocation",
      description: "Learn strategies for effective cost allocation and chargeback models.",
      date: "2025-09-20",
      duration: "45 min",
      videoUrl: "/videos/cost-allocation.mp4",
      slidesUrl: "/slides/cost-allocation.pdf"
    },
    // ... more past streams
  ];

  return (
    <div>
      <Hero
        title="CloudFix Live"
        subtitle="Live streams on cloud optimization and cost management"
        description="Join our live sessions with industry experts covering the latest trends, best practices, and case studies in cloud cost optimization."
        backgroundImage="/images/livestream-hero.jpg"
      />

      {/* Upcoming Streams */}
      <ContentBlock title="Upcoming Live Streams">
        <div className="grid md:grid-cols-2 gap-8">
          {upcomingStreams.map((stream, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{stream.title}</h3>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                  LIVE SOON
                </span>
              </div>
              <p className="text-gray-600 mb-4">{stream.description}</p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div>📅 {new Date(stream.date).toLocaleDateString()}</div>
                <div>⏰ {stream.time} ({stream.duration})</div>
                <div>👤 {stream.speaker}</div>
              </div>
              <button className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/600 transition-colors">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* Past Streams */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Past Streams</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastStreams.map((stream, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={`/images/livestream/thumb-${index + 1}.jpg`}
                    alt={stream.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button className="bg-white text-gray-900 rounded-full p-4 hover:bg-gray-100">
                      ▶️
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">{stream.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(stream.date).toLocaleDateString()} • {stream.duration}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200">
                      Watch Recording
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200">
                      Download Slides
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Commit Message:**
```
feat(multimedia): create podcast and livestream pages

- Build /podcast page with episode listings and audio player
- Implement AudioPlayer component with play/pause controls
- Create /livestream page with upcoming and past streams
- Add registration functionality for upcoming events
- Include video recordings and downloads for past events
```

**Create `/app/videos/page.tsx`:**
```tsx
export default function VideosPage() {
  const videoCategories = [
    { name: "All", value: "all" },
    { name: "Tutorials", value: "tutorials" },
    { name: "Case Studies", value: "case-studies" },
    { name: "Product Demos", value: "demos" },
    { name: "Webinars", value: "webinars" }
  ];

  const videos = [
    {
      title: "Getting Started with CloudFix",
      description: "Learn how to set up CloudFix and start saving on your AWS costs in under 10 minutes.",
      category: "tutorials",
      duration: "9:45",
      views: "2.3K",
      thumbnail: "/images/videos/getting-started.jpg",
      videoUrl: "/videos/getting-started.mp4"
    },
    // ... more videos
  ];

  return (
    <div>
      <Hero
        title="CloudFix Videos"
        subtitle="Tutorials, demos, and case studies"
        description="Watch our collection of videos covering everything from getting started tutorials to in-depth case studies and product demonstrations."
        backgroundImage="/images/videos-hero.jpg"
      />

      {/* Category Filter */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {videoCategories.map((category) => (
              <button
                key={category.value}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  category.value === "all"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video */}
      {videos.length > 0 && (
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Featured Video</h2>
            <div className="bg-black rounded-lg overflow-hidden">
              <VideoPlayer
                src={videos[0].videoUrl}
                poster={videos[0].thumbnail}
                title={videos[0].title}
              />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">{videos[0].title}</h3>
              <p className="text-gray-600 mb-4">{videos[0].description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{videos[0].views} views</span>
                <span>•</span>
                <span>{videos[0].duration}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video Grid */}
      <ContentBlock title="All Videos">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white text-gray-900 rounded-full p-4 hover:scale-110 transition-transform">
                    ▶️
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>{video.views} views</span>
                <span>•</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {video.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* Subscribe */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Channel</h2>
          <p className="text-xl mb-8 text-gray-600">Get notified when we release new videos</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700">
              📺 YouTube
            </a>
            <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              📧 Email Updates
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Create VideoPlayer component:**
```tsx
// components/VideoPlayer.tsx
interface VideoPlayerProps {
  src: string;
  poster: string;
  title: string;
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative aspect-video">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
        >
          <div className="bg-white text-gray-900 rounded-full p-6 hover:scale-110 transition-transform">
            <span className="text-3xl">▶️</span>
          </div>
        </button>
      )}
    </div>
  );
}
```

**Commit Message:**
```
feat(multimedia): create videos page with video library

- Build /videos page with category filtering and featured content
- Implement VideoPlayer component with custom controls
- Add video grid with thumbnails and metadata
- Include view counts and duration information
- Create subscription integration for YouTube and email
```

#### Task 3.4: Success Stories Page (2 hours)

**Create `/app/success-stories/page.tsx`:**
```tsx
export default function SuccessStoriesPage() {
  const caseStudies = [
    {
      title: "Startup SaaS Company Saves 40% on AWS",
      company: "TechCorp Inc.",
      industry: "SaaS",
      size: "50-100 employees",
      savings: "$45,000 annually",
      challenge: "Rapidly growing AWS costs with limited visibility into spending patterns",
      solution: "CloudFix implemented automated optimization across their entire infrastructure",
      results: [
        "40% reduction in monthly AWS bill",
        "Automated rightsizing of EC2 instances",
        "RIs optimized for usage patterns",
        "Continuous monitoring and alerts"
      ],
      logo: "/images/customers/techcorp.png",
      quote: "CloudFix paid for itself in the first month. We couldn't be happier with the results.",
      author: "CTO, TechCorp Inc."
    },
    // ... more case studies
  ];

  const industries = ["All", "SaaS", "E-commerce", "FinTech", "Healthcare", "Media"];

  return (
    <div>
      <Hero
        title="Customer Success Stories"
        subtitle="Real results from real CloudFix customers"
        description="See how companies like yours are saving millions on AWS costs with CloudFix's automated optimization platform."
        backgroundImage="/images/success-stories-hero.jpg"
      />

      {/* Stats Overview */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard
              value="35%"
              label="Average Savings"
              description="Typical cost reduction for CloudFix customers"
            />
            <StatCard
              value="$2.5M"
              label="Total Saved"
              description="Cumulative savings across all customers"
            />
            <StatCard
              value="500+"
              label="Customers"
              description="Companies trusting CloudFix for optimization"
            />
            <StatCard
              value="24hrs"
              label="Avg. Setup Time"
              description="From signup to first savings recommendations"
            />
          </div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {industries.map((industry) => (
              <button
                key={industry}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  industry === "All"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <ContentBlock title="Success Stories">
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <img
                  src={study.logo}
                  alt={study.company}
                  className="w-32 h-auto mb-6"
                />
                <h3 className="text-2xl font-bold mb-4">{study.title}</h3>
                <div className="flex gap-4 text-sm text-gray-500 mb-6">
                  <span>🏢 {study.industry}</span>
                  <span>👥 {study.size}</span>
                  <span>💰 {study.savings}</span>
                </div>
                <p className="text-gray-600 mb-6">{study.challenge}</p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold mb-3">Results Achieved:</h4>
                  <ul className="space-y-2">
                    {study.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 mb-6">
                  "{study.quote}"
                  <cite className="block not-italic mt-2 text-sm text-gray-500">
                    – {study.author}
                  </cite>
                </blockquote>
                <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/600 transition-colors">
                  Read Full Case Study
                </button>
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{study.savings}</div>
                  <div className="text-lg text-gray-600">Annual Savings</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentBlock>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Success Story?</h2>
          <p className="text-xl mb-8">Join hundreds of companies saving millions on AWS costs</p>
          <div className="flex gap-4 justify-center">
            <a href="/assessment" className="bg-accent text-gray-900 px-8 py-4 rounded-lg font-semibold">
              Start Free Assessment
            </a>
            <a href="/contact" className="border-2 border-white px-8 py-4 rounded-lg font-semibold">
              Schedule Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Commit Message:**
```
feat(content): create success stories page with customer case studies

- Build /success-stories page with customer testimonials
- Implement case study layout with results and quotes
- Add industry filtering and company information
- Include success metrics and savings data
- Create strong CTAs for assessment and demo requests
```

---

### Task 4: Technical and Navigation Pages (2 hours)

#### Task 4.1: HTML Sitemap Page (1 hour)

**Create `/app/sitemap/page.tsx`:**
```tsx
export default function SitemapPage() {
  const sitemapData = [
    {
      title: "Main Pages",
      links: [
        { title: "Home", url: "/", description: "CloudFix homepage" },
        { title: "Features", url: "/features", description: "Platform features and capabilities" },
        { title: "Pricing", url: "/pricing", description: "Pricing plans and options" },
        { title: "About", url: "/about", description: "Company information and story" },
        { title: "Contact", url: "/contact", description: "Get in touch with our team" }
      ]
    },
    {
      title: "Products",
      links: [
        { title: "CloudFix", url: "/cloudfix", description: "Automated AWS cost optimization" },
        { title: "RightSpend", url: "/rightspend", description: "Reserved Instance management" },
        { title: "QueryLens", url: "/querylens", description: "Database query optimization" },
        { title: "PromptLens", url: "/promptlens", description: "LLM cost optimization" }
      ]
    },
    {
      title: "Company",
      links: [
        { title: "How It Works", url: "/how-it-works", description: "Our optimization process" },
        { title: "Leadership", url: "/leadership", description: "Meet our leadership team" },
        { title: "Careers", url: "/careers", description: "Job opportunities" },
        { title: "Partners", url: "/partners", description: "Partner program" },
        { title: "Security", url: "/security", description: "Security and compliance" }
      ]
    },
    {
      title: "Resources",
      links: [
        { title: "Blog", url: "/blog", description: "Articles and insights" },
        { title: "Resources", url: "/resources", description: "Guides and tools" },
        { title: "Success Stories", url: "/success-stories", description: "Customer case studies" },
        { title: "Podcast", url: "/podcast", description: "Audio content and interviews" },
        { title: "Livestream", url: "/livestream", description: "Live video events" },
        { title: "Videos", url: "/videos", description: "Video tutorials and demos" }
      ]
    },
    {
      title: "Legal",
      links: [
        { title: "Privacy Policy", url: "/privacy-policy", description: "How we handle your data" },
        { title: "Terms of Service", url: "/terms-of-service", description: "Terms and conditions" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
          <p className="text-lg text-gray-600">
            Find all pages on the CloudFix website
          </p>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-12">
        <div className="container-custom max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapData.map((section, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-primary">{section.title}</h2>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="block hover:text-primary transition-colors"
                      >
                        <div className="font-medium">{link.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{link.description}</div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 text-center">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Site Overview</h3>
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary">24</div>
                  <div className="text-gray-600">Total Pages</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">6</div>
                  <div className="text-gray-600">Main Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-gray-600">Resources</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-gray-600">Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'Sitemap - CloudFix',
  description: 'Complete sitemap of the CloudFix website - find all pages and resources',
};
```

**Commit Message:**
```
feat(navigation): create HTML sitemap page

- Build /sitemap page with comprehensive page listings
- Organize content by logical categories (Main, Products, Company, Resources, Legal)
- Include page descriptions for better user navigation
- Add site overview statistics
- Improve SEO and user navigation experience
```

#### Task 4.2: Custom Error Pages (1 hour)

**Create `/app/not-found.tsx` (404 page):**
```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container-custom text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">What can you do?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div>
              <h3 className="font-medium mb-2">Try these popular pages:</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-primary hover:underline">
                    → Homepage
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-primary hover:underline">
                    → Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-primary hover:underline">
                    → Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-primary hover:underline">
                    → Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Or you can:</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/assessment" className="text-primary hover:underline">
                    → Start Free Assessment
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-primary hover:underline">
                    → Contact Support
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-primary hover:underline">
                    → View Sitemap
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => window.history.back()}
                    className="text-primary hover:underline"
                  >
                    ← Go Back
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/assessment"
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/600 transition-colors"
          >
            Start Free Assessment
          </Link>
          <Link
            href="/"
            className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Go Homepage
          </Link>
        </div>

        {/* Search */}
        <div className="mt-8">
          <p className="text-gray-600 mb-4">Or search for what you're looking for:</p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search CloudFix..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  // Implement search functionality
                  window.location.href = `/search?q=${encodeURIComponent(e.currentTarget.value)}`;
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Page Not Found - 404 - CloudFix',
  description: 'The page you requested could not be found. Try our homepage or search for what you need.',
};
```

**Create `/app/error.tsx` (500 error page):**
```tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container-custom text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-9xl font-bold text-red-500 mb-4">500</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Something Went Wrong</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're sorry, but something unexpected happened. Our team has been notified and is working on a fix.
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">While we fix this, you can:</h2>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div>
              <h3 className="font-medium mb-2">Try these pages:</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-primary hover:underline">
                    → Homepage
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-primary hover:underline">
                    → Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-primary hover:underline">
                    → Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/assessment" className="text-primary hover:underline">
                    → Free Assessment
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Get help:</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-primary hover:underline">
                    → Contact Support
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@cloudfix.com" className="text-primary hover:underline">
                    → Email Support
                  </a>
                </li>
                <li>
                  <a href="tel:1-800-CLOUDFIX" className="text-primary hover:underline">
                    → Call 1-800-CLOUDFIX
                  </a>
                </li>
                <li>
                  <button
                    onClick={reset}
                    className="text-primary hover:underline"
                  >
                    → Try Again
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/600 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Go Homepage
          </Link>
        </div>

        {/* Error Details (for development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8">
            <details className="text-left">
              <summary className="cursor-pointer text-red-500 font-medium">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 p-4 bg-red-50 text-red-700 rounded text-sm overflow-auto">
                {error.message}
                {error.stack}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Server Error - 500 - CloudFix',
  description: 'We encountered an unexpected error. Our team has been notified.',
};
```

**Commit Message:**
```
feat(error-pages): create custom 404 and 500 error pages

- Build custom 404 page with helpful navigation and search
- Implement 500 error page with retry functionality
- Add popular page links and support contact information
- Include error details for development environment
- Improve user experience when errors occur
```

---

## 🚀 Implementation Order

**Recommended sequence for Phase 6:**

### Week 5 (20 hours)
1. ✅ **Task 1.1**: How It Works page (3 hrs) - Core company information
2. ✅ **Task 1.2**: Leadership page (3 hrs) - Team showcase
3. ✅ **Task 1.3**: Careers page (3 hrs) - Recruitment pipeline
4. ✅ **Task 1.4**: Partners page (2 hrs) - Ecosystem showcase
5. ✅ **Task 1.5**: Security page (1 hr) - Trust and compliance
6. ✅ **Task 2.1**: Privacy Policy page (2 hrs) - Legal compliance
7. ✅ **Task 2.2**: Terms of Service page (2 hrs) - Legal compliance
8. ✅ **Task 3.1**: Blog system (4 hrs) - Content foundation

### Week 6 (12 hours)
9. ✅ **Task 3.2**: Resources page (2 hrs) - Content library
10. ✅ **Task 3.3**: Multimedia pages (6 hrs) - Podcast, livestream, videos
11. ✅ **Task 3.4**: Success Stories page (2 hrs) - Customer case studies
12. ✅ **Task 4.1**: HTML sitemap (1 hr) - Navigation aid
13. ✅ **Task 4.2**: Error pages (1 hr) - Error handling

**Total Estimated Time**: 32 hours (within 30-40 hour range)

---

## 📊 Success Criteria

### Functional Requirements
- ✅ All 18 additional pages load successfully at their routes
- ✅ Navigation links work correctly across all pages
- ✅ Mobile responsive design on all pages
- ✅ Error pages handle broken links gracefully
- ✅ Content system integration works properly

### Content Requirements
- ✅ Company information pages with team and culture content
- ✅ Legal compliance pages with proper terms and privacy
- ✅ Rich content pages with multimedia integration
- ✅ Customer success stories and case studies
- ✅ Searchable resource library and blog system

### Design Requirements
- ✅ Consistent brand colors and typography
- ✅ Professional layout across all page types
- ✅ Proper visual hierarchy and information architecture
- ✅ Accessible design with proper contrast and navigation
- ✅ Loading states and error handling

### Technical Requirements
- ✅ TypeScript with proper type safety
- ✅ Component reuse for maintainability
- ✅ SEO optimization with proper metadata
- ✅ Performance optimization (90+ Lighthouse score)
- ✅ Accessibility compliance (WCAG 2.1 AA)

---

## 🔍 Testing Strategy

### Page Structure Testing
- Verify all 18 pages render correctly
- Test navigation between all pages
- Validate internal links and CTAs
- Check mobile responsiveness across device sizes
- Test error page functionality

### Content Validation
- Verify legal content accuracy and compliance
- Test blog content rendering and formatting
- Validate multimedia content playback
- Check form functionality on relevant pages
- Test search and filtering capabilities

### Performance Testing
- Lighthouse scores for all new pages
- Image optimization verification
- Core Web Vitals assessment
- Mobile performance testing
- Bundle size impact analysis

### SEO Testing
- Verify metadata for all pages
- Test sitemap accessibility
- Check robots.txt compliance
- Validate structured data where applicable
- Test social media sharing

---

## 📚 Related Documentation

**Reference Files:**
- `/docs/plans/PHASE_3_PRODUCT_PAGES.md` - Product page patterns
- `/docs/plans/PHASE_4_CONTENT_SYSTEMS.md` - Content system foundation
- `/docs/BRAND_CONSISTENCY_AUDIT.md` - Brand color specifications
- `/docs/ROADMAP.md` - Project progress and timeline

**Dependencies:**
- Phase 4 content systems (MDX, multimedia components)
- Phase 1 form system (contact forms, validation)
- Component library (Hero, ContentBlock, FeatureCard, etc.)
- Brand color system and design tokens

---

## 🎯 Post-Implementation

**After completing Phase 6:**

1. **Update ROADMAP.md**: Mark Phase 6 as complete, update project progress to 100%
2. **Final Testing**: Complete comprehensive testing across all 24 pages
3. **Performance Audit**: Final Lighthouse assessment and optimization
4. **SEO Review**: Complete SEO audit and metadata validation
5. **Launch Preparation**: Final checks before production deployment
6. **Analytics Setup**: Track page visits and user engagement metrics

**Project Completion Status:**
- **Pages**: 24/24 complete (100%)
- **Components**: 22/22 complete (100%)
- **Features**: 15/15 complete (100%)
- **Overall**: 100% complete and launch-ready

---

## 🚨 Critical Dependencies

**Content Requirements:**
- Legal content for privacy policy and terms of service
- Blog content and article formatting
- Team leadership information and photos
- Customer success stories and testimonials
- Multimedia content (audio, video, images)

**Technical Dependencies:**
- MDX configuration for blog system
- Audio/video player functionality
- Search and filtering implementation
- Error handling and monitoring
- Performance optimization for media content

---

**Ready to implement?** This comprehensive Phase 6 plan completes the CloudFix Next.js migration with all 18 remaining pages. Each page follows established patterns while providing unique value for different user segments. The project will be fully launch-ready with professional content, legal compliance, and comprehensive functionality. 🚀

**Final Project Status**: 100% Complete - Launch Ready ✅