'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Dropdown content constants (Task 1)
const PRODUCTS = [
  {
    name: 'CloudFix',
    href: '/cloudfix',
    description: 'Automated AWS cost optimization',
  },
  {
    name: 'RightSpend',
    href: '/rightspend',
    description: 'Reserved Instance management',
  },
  {
    name: 'QueryLens',
    href: '/querylens',
    description: 'Database query optimization',
  },
  {
    name: 'PromptLens',
    href: '/promptlens',
    description: 'LLM optimization',
  },
];

const RESOURCES = [
  { name: 'Blog', href: '/blog' },
  { name: 'Podcast', href: '/podcast' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Documentation', href: '/docs' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown state & refs (Task 2)
  const [openDropdown, setOpenDropdown] = useState<'products' | 'resources' | null>(null);

  const productsButtonRef = useRef<HTMLButtonElement>(null);
  const resourcesButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (dropdown: 'products' | 'resources') => {
    setOpenDropdown((current) => (current === dropdown ? null : dropdown));
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  // Click-outside detection (Task 3)
  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedOutside =
        (!!dropdownRef.current && !dropdownRef.current.contains(target)) &&
        (!!productsButtonRef.current && !productsButtonRef.current.contains(target)) &&
        (!!resourcesButtonRef.current && !resourcesButtonRef.current.contains(target));

      if (clickedOutside) {
        const previouslyOpen = openDropdown;
        closeDropdown();

        // Return focus to trigger button
        if (previouslyOpen === 'products') {
          productsButtonRef.current?.focus();
        } else if (previouslyOpen === 'resources') {
          resourcesButtonRef.current?.focus();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

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
            {/* Products Dropdown Trigger */}
            <div className="relative">
              <button
                ref={productsButtonRef}
                onClick={() => toggleDropdown('products')}
                aria-expanded={openDropdown === 'products'}
                className="text-gray-700 hover:text-primary transition flex items-center gap-1"
              >
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDropdown === 'products' && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[280px] max-w-[320px] py-2"
                  role="menu"
                >
                  {PRODUCTS.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="block px-4 py-3 hover:bg-primary hover:text-white transition-colors duration-150"
                      role="menuitem"
                      onClick={closeDropdown}
                    >
                      <div className="font-semibold text-base leading-tight mb-1">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-600 leading-snug line-clamp-2">
                        {product.description}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Static Links */}
            <Link href="/features" className="text-gray-700 hover:text-primary transition">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary transition">
              Pricing
            </Link>

            {/* Resources Dropdown Trigger */}
            <div className="relative">
              <button
                ref={resourcesButtonRef}
                onClick={() => toggleDropdown('resources')}
                aria-expanded={openDropdown === 'resources'}
                className="text-gray-700 hover:text-primary transition flex items-center gap-1"
              >
                Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDropdown === 'resources' && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] max-w-[240px] py-2"
                  role="menu"
                >
                  {RESOURCES.map((resource) => (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className="block px-4 py-2.5 text-base hover:bg-primary hover:text-white transition-colors duration-150"
                      role="menuitem"
                      onClick={closeDropdown}
                    >
                      {resource.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
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
            <Link href="/assessment" className="block bg-accent text-gray-900 px-6 py-2 rounded-lg hover:bg-accent-dark transition text-center font-semibold">
              Get Free Assessment
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
