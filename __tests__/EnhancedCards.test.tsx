import React from 'react';
import { render, screen } from '@testing-library/react';
import TestimonialCard from '@/components/ui/TestimonialCard';
import ResourceCard from '@/components/ui/ResourceCard';
import TeamCard from '@/components/ui/TeamCard';

describe('Enhanced Cards', () => {
  test('TestimonialCard renders quote, name, and rating', () => {
    render(
      <TestimonialCard
        quote="CloudFix saved us 40% on AWS!"
        name="Jane Doe"
        role="CTO"
        company="Acme Corp"
        avatarSrc="/avatar.jpg"
        rating={5}
      />
    );
    expect(screen.getByText(/CloudFix saved us/i)).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByLabelText('5 star rating')).toBeInTheDocument();
  });

  test('ResourceCard renders title and metadata', () => {
    render(
      <ResourceCard
        title="How to Cut AWS Spend"
        href="/resources/aws-spend"
        thumbnailSrc="/thumb.jpg"
        category="Guide"
        date="2025-10-06"
        authorName="John Smith"
        authorAvatarSrc="/john.jpg"
      />
    );
    expect(screen.getByRole('link', { name: 'How to Cut AWS Spend' })).toBeInTheDocument();
    expect(screen.getByText('Guide')).toBeInTheDocument();
    expect(screen.getByText('2025-10-06')).toBeInTheDocument();
    expect(screen.getByText('By John Smith')).toBeInTheDocument();
  });

  test('TeamCard renders socials with accessible labels', () => {
    render(
      <TeamCard
        name="Alex Johnson"
        role="Head of Engineering"
        photoSrc="/alex.jpg"
        socials={[
          { type: 'linkedin', href: 'https://linkedin.com/in/alex' },
          { type: 'twitter', href: 'https://twitter.com/alex' },
          { type: 'github', href: 'https://github.com/alex' },
          { type: 'website', href: 'https://alex.dev' },
        ]}
      />
    );
    expect(screen.getByLabelText('Alex Johnson on linkedin')).toBeInTheDocument();
    expect(screen.getByLabelText('Alex Johnson on twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Alex Johnson on github')).toBeInTheDocument();
    expect(screen.getByLabelText('Alex Johnson on website')).toBeInTheDocument();
  });
});

