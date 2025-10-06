'use client';

import { useState, FormEvent } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('Processing your subscription...');

    try {
      const webhook = process.env.NEXT_PUBLIC_NEWSLETTER_WEBHOOK || 'https://example.com/webhook/newsletter';
      const response = await fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
          source: 'CloudFix Newsletter Signup',
          page_url: window.location.href,
          form_type: 'newsletter',
          subscription_type: 'general_updates'
        })
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Success! Thank you for subscribing. Check your email for confirmation.');
        setEmail('');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Sorry, there was an error subscribing. Please try again later.');
    }
  };

  return (
    <section className="gradient-bg text-white section-padding relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full transform -translate-x-24 translate-y-24" />

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay up to date with the latest news and content delivered to your inbox!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get insights on AWS cost optimization, industry trends, and CloudFix updates.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-accent text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-accent-dark transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {message && (
              <div
                className={`max-w-lg mx-auto p-4 rounded-lg ${
                  status === 'success'
                    ? 'bg-green-500/20 border border-green-300/50'
                    : status === 'error'
                    ? 'bg-red-500/20 border border-red-300/50'
                    : 'bg-blue-500/20 border border-blue-300/50'
                }`}
              >
                {message}
              </div>
            )}
          </form>

          <p className="text-sm opacity-80 mt-6">
            We respect your privacy. Unsubscribe at any time.{' '}
            <a href="/privacy-policy" className="underline hover:opacity-100">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
