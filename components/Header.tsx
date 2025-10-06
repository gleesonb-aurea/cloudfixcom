'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/CloudFix_Logo_Color.png"
              alt="CloudFix"
              width={208}
              height={39}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-700 hover:text-primary transition">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary transition">
              Pricing
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-primary transition">
              Resources
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary transition">
              Blog
            </Link>
            <Link href="/assessment" className="bg-accent text-gray-900 px-6 py-2 rounded-lg hover:bg-accent-dark transition font-semibold">
              Get Free Assessment
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/features" className="block text-gray-700 hover:text-primary transition">
              Features
            </Link>
            <Link href="/pricing" className="block text-gray-700 hover:text-primary transition">
              Pricing
            </Link>
            <Link href="/resources" className="block text-gray-700 hover:text-primary transition">
              Resources
            </Link>
            <Link href="/blog" className="block text-gray-700 hover:text-primary transition">
              Blog
            </Link>
            <Link href="/assessment" className="block bg-accent text-gray-900 px-6 py-2 rounded-lg hover:bg-accent-dark transition text-center font-semibold">
              Get Free Assessment
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
