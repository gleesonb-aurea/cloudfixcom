export interface Feature {
  icon?: string;
  title: string;
  description: string;
}

export interface PricingInfo {
  note?: string;
}

export interface Testimonial {
  quote: string;
  name?: string;
  company?: string;
}

export interface Product {
  id: 'cloudfix' | 'rightspend' | 'querylens' | 'promptlens';
  name: string;
  tagline: string;
  description?: string;
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string;
  };
  features?: Feature[];
  testimonials?: Testimonial[];
  integrations?: string[];
  pricing?: PricingInfo;
}

export const PRODUCTS: Product[] = [
  {
    id: 'cloudfix',
    name: 'CloudFix',
    tagline: 'Automated AWS Cost Optimization',
    description:
      'CloudFix continuously monitors your AWS infrastructure, identifies savings opportunities, and implements optimizations automatically.',
    hero: {
      title: 'Automated AWS Cost Optimization',
      subtitle: 'Save up to 40% on your AWS bill with intelligent automation',
      ctaText: 'Start Free Assessment',
      ctaLink: '/assessment',
      backgroundImage: '/images/cloudfix-hero-bg.jpg',
    },
    features: [
      { icon: '🤖', title: 'Automated Optimization', description: 'AI-powered algorithms identify and implement savings 24/7' },
      { icon: '📊', title: 'Real-time Monitoring', description: 'Track costs and savings in real-time with analytics' },
      { icon: '🔒', title: 'Enterprise Security', description: 'SOC 2 Type II with zero-trust architecture' },
    ],
    testimonials: [
      { quote: 'CloudFix saved us 35% in the first month', name: 'CTO', company: 'StartupXYZ' },
    ],
  },
  {
    id: 'rightspend',
    name: 'RightSpend',
    tagline: 'Reserved Instance Management',
    description: 'Maximize your RI savings with intelligent recommendations.',
    hero: {
      title: 'Reserved Instance Management',
      subtitle: 'Maximize your RI savings with intelligent recommendations',
      ctaText: 'Optimize RIs',
      ctaLink: '/contact',
      backgroundImage: '/images/rightspend-hero-bg.jpg',
    },
    features: [
      { icon: '📈', title: 'Usage Analysis', description: 'Analyze historical usage to predict future needs' },
      { icon: '💡', title: 'Smart Recommendations', description: 'AI-powered recommendations for optimal RI purchases' },
      { icon: '🔄', title: 'Automated Renewals', description: 'Never miss renewals with automation' },
    ],
  },
  {
    id: 'querylens',
    name: 'QueryLens',
    tagline: 'Database Query Optimization',
    description: 'Analyze and optimize database queries to cut costs and improve performance.',
    hero: {
      title: 'Database Query Optimization',
      subtitle: 'Reduce query costs and improve performance',
      ctaText: 'Get a Demo',
      ctaLink: '/contact',
    },
  },
  {
    id: 'promptlens',
    name: 'PromptLens',
    tagline: 'LLM Optimization',
    description: 'Optimize LLM usage, costs, and performance across providers.',
    hero: {
      title: 'LLM Optimization',
      subtitle: 'Cut LLM costs while improving quality',
      ctaText: 'Learn More',
      ctaLink: '/contact',
    },
  },
];

export function getProductData(id: string): Product | null {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

