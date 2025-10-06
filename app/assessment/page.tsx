import { Metadata } from 'next';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { CheckCircle, Shield, Zap, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AWS Cost Optimization Assessment | CloudFix',
  description: 'Get a comprehensive AWS cost optimization assessment in 2 minutes. Identify savings opportunities, security risks, and performance bottlenecks. No obligation required.',
  openGraph: {
    title: 'Free AWS Cost Optimization Assessment | CloudFix',
    description: 'Get a comprehensive AWS cost optimization assessment in 2 minutes. Identify savings opportunities, security risks, and performance bottlenecks.',
    type: 'website',
  },
  alternates: {
    canonical: '/assessment',
  },
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Free AWS Cost
              <span className="block text-primary-light">Optimization Assessment</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Get a comprehensive analysis of your AWS infrastructure in 2 minutes.
              Identify savings opportunities, security risks, and performance bottlenecks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Results in 24 hours</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>100% confidential</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-20">
          <div className="w-64 h-64 bg-primary rounded-full filter blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 opacity-20">
          <div className="w-64 h-64 bg-secondary rounded-full filter blur-3xl"></div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 font-medium">Trusted by innovative companies</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Add company logos here */}
            <div className="text-gray-400 font-semibold">AWS Advanced Partner</div>
            <div className="text-gray-400 font-semibold">SOC 2 Type II</div>
            <div className="text-gray-400 font-semibold">GDPR Compliant</div>
          </div>
        </div>
      </section>

      {/* Main Assessment Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <AssessmentForm />
          </div>
        </div>
      </section>

      {/* What You’ll Get */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You’ll Receive
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive assessment provides actionable insights across all areas of your AWS infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="w-8 h-8 text-primary-dark" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost Savings</h3>
              <p className="text-gray-600">
                Identify immediate savings opportunities with detailed breakdown of potential reductions.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                <Shield className="w-8 h-8 text-accent-dark" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Security Analysis</h3>
              <p className="text-gray-600">
                Comprehensive security review to identify vulnerabilities and compliance gaps.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Review</h3>
              <p className="text-gray-600">
                Analysis of performance bottlenecks and optimization recommendations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <CheckCircle className="w-8 h-8 text-primary-dark" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Action Plan</h3>
              <p className="text-gray-600">
                Prioritized roadmap with specific steps to optimize your AWS environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your assessment in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 h-full">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-dark text-white rounded-full font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Assessment</h3>
                <p className="text-gray-600 mb-4">
                  Fill out our comprehensive form about your AWS infrastructure and current usage patterns.
                </p>
                <p className="text-sm text-gray-500">
                  Time: 2-3 minutes
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 h-full">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-dark text-white rounded-full font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Our AWS experts analyze your infrastructure using advanced tools and best practices.
                </p>
                <p className="text-sm text-gray-500">
                  Time: 24 hours
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 h-full">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-dark text-white rounded-full font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Receive Report</h3>
                <p className="text-gray-600 mb-4">
                  Get your detailed assessment report with actionable insights and savings opportunities.
                </p>
                <p className="text-sm text-gray-500">
                  Delivery: Email + Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is the assessment really free?
              </h3>
              <p className="text-gray-600">
                Yes, the comprehensive AWS assessment is completely free with no obligation. We believe in demonstrating value before discussing any potential partnership.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How long does it take to get results?
              </h3>
              <p className="text-gray-600">
                You’ll receive your detailed assessment report within 24 hours of completing the form. The report includes actionable insights prioritized by impact.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is my data secure and confidential?
              </h3>
              <p className="text-gray-600">
                Absolutely. We’re SOC 2 Type II certified and GDPR compliant. Your data is encrypted and never shared with third parties. We sign NDAs upon request.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What information do you need access to?
              </h3>
              <p className="text-gray-600">
                We only need the information you provide in the assessment form. We don’t require access to your AWS account. The analysis is based on industry benchmarks and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Optimize Your AWS Costs?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join hundreds of companies that have saved millions with our optimization strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#assessment-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-gray-900 font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-lg"
            >
              Start Free Assessment
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-colors"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
