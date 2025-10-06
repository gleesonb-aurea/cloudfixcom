import Hero from '@/components/Hero';
import ContentBlock, { StatCard } from '@/components/ContentBlock';
import Link from 'next/link';

export const metadata = {
  title: "About Us | CloudFix - AWS Cost Optimization Experts",
  description: "Learn about CloudFix's mission to help every AWS customer run a fully optimized cloud that drives maximum innovation with minimum expense.",
};

export default function About() {
  const timeline = [
    {
      year: '2007',
      title: 'The Journey Begins',
      description: 'Aurea begins using AWS, becoming one of the earliest enterprise adopters.',
    },
    {
      year: '2010',
      title: 'All-In on AWS',
      description: 'AWS becomes our sole cloud provider as we scale operations.',
    },
    {
      year: '2010-2018',
      title: 'Massive Scale',
      description: 'Scaled to managing 45,000+ AWS instances, learning optimization at every step.',
    },
    {
      year: '2018',
      title: 'CloudFix Development',
      description: 'Rahul Subramaniam develops CloudFix as an in-house tool to control AWS costs.',
    },
    {
      year: '2021',
      title: 'Public Launch',
      description: 'Official public launch at AWS re:Invent, bringing our expertise to the world.',
    },
    {
      year: '2022-Present',
      title: 'Growing Impact',
      description: 'Helping optimize thousands of AWS accounts across 200+ companies.',
    },
  ];

  return (
    <>
      <Hero
        title="Our Mission"
        description="Help every AWS customer run a fully optimized cloud that drives maximum innovation with minimum expense."
      />

      {/* Our Story */}
      <ContentBlock className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">
              CloudFix was born from necessity. As one of AWS’s earliest enterprise adopters,
              we faced the challenge of managing massive cloud infrastructure efficiently.
            </p>

            <p className="text-gray-700 mb-6">
              Founded by Aurea, which began using AWS in 2007, we’ve been on the cutting edge
              of cloud adoption for over 15 years. By 2010, AWS became our sole cloud provider,
              and we quickly scaled to managing over 45,000 AWS instances.
            </p>

            <p className="text-gray-700 mb-6">
              That’s when Rahul Subramaniam, our Chief Evangelist, developed CloudFix as an
              in-house tool to control our ever-growing AWS costs. The results were so impressive
              that we knew other companies could benefit from our learnings.
            </p>

            <p className="text-gray-700">
              In 2021, we officially launched CloudFix to the public at AWS re:Invent, bringing
              enterprise-grade AWS optimization to companies of all sizes. Today, we’re proud to
              help optimize thousands of AWS accounts across more than 200 companies worldwide.
            </p>
          </div>
        </div>
      </ContentBlock>

      {/* Timeline */}
      <ContentBlock className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Journey</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block" />

            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'
                }`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg relative">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute top-8 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"
                         style={{
                           [index % 2 === 0 ? 'right' : 'left']: '-2.5rem',
                         }}
                    />

                    <div className="text-primary font-bold text-lg mb-2">{item.year}</div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentBlock>

      {/* Stats */}
      <ContentBlock className="bg-white" columns={3} centered>
        <StatCard
          value="15+"
          label="Years on AWS"
          description="One of the earliest enterprise adopters"
        />
        <StatCard
          value="200+"
          label="Companies"
          description="Optimizing AWS accounts worldwide"
        />
        <StatCard
          value="45,000+"
          label="Instances Managed"
          description="Experience at massive scale"
        />
      </ContentBlock>

      {/* Values */}
      <ContentBlock className="bg-gradient-to-br from-primary/5 to-primary-dark/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            What Drives Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">100% AWS Committed</h3>
              <p className="text-gray-600">
                We live and breathe AWS. Our expertise comes from years of real-world
                experience at enterprise scale.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3">Innovation First</h3>
              <p className="text-gray-600">
                We believe cost optimization shouldn’t limit innovation—it should
                enable more of it.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Customer Success</h3>
              <p className="text-gray-600">
                Your success is our success. We’re here to help you maximize AWS value
                at every step.
              </p>
            </div>
          </div>
        </div>
      </ContentBlock>

      {/* Team Highlight */}
      <ContentBlock className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Led by AWS Experts
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our team includes Rahul Subramaniam, Chief Evangelist and founder of CloudFix,
            who hosts the AWS Insiders podcast and has been optimizing AWS infrastructure
            since 2007.
          </p>
          <Link
            href="/leadership"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            Meet Our Leadership Team
          </Link>
        </div>
      </ContentBlock>

      {/* CTA */}
      <ContentBlock className="bg-gradient-to-br from-primary/5 to-primary-dark/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Optimize Your AWS?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the 200+ companies that trust CloudFix to optimize their AWS infrastructure.
          </p>
          <Link
            href="/assessment"
            className="inline-block bg-primary text-white px-12 py-5 rounded-lg text-lg font-semibold hover:bg-primary-dark transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Your Free Assessment
          </Link>
        </div>
      </ContentBlock>
    </>
  );
}
