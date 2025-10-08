'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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

  // Click-outside detection (Task 3 + mobile touch polish)
  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
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
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [openDropdown]);

  // Keyboard handler for dropdown (Task 4)
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && openDropdown) {
      event.preventDefault();
      const previouslyOpen = openDropdown;
      closeDropdown();
      if (previouslyOpen === 'products') {
        productsButtonRef.current?.focus();
      } else if (previouslyOpen === 'resources') {
        resourcesButtonRef.current?.focus();
      }
    }
  };

  // Active state detection (Task 7)
  const pathname = usePathname() || '';
  const isProductsActive = PRODUCTS.some((p) => pathname.startsWith(p.href));
  const isResourcesActive = RESOURCES.some((r) => pathname.startsWith(r.href));

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
              className="w-auto h-8 md:h-9 lg:h-[39px] transition-all duration-200"
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
                aria-haspopup="menu"
                id="products-menu-button"
                className={cn(
                  'text-gray-700 hover:text-primary transition flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isProductsActive && 'border-b-2 border-primary font-semibold'
                )}
              >
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDropdown === 'products' && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[280px] max-w-[320px] py-2 z-50 md:transform md:-translate-x-1/4 lg:transform-none lg:translate-x-0"
                  role="menu"
                  aria-labelledby="products-menu-button"
                  onKeyDown={handleKeyDown}
                >
                  {PRODUCTS.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className={cn(
                        'block px-4 py-3 hover:bg-primary hover:text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                        pathname === product.href && 'bg-primary text-white font-bold'
                      )}
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
                aria-haspopup="menu"
                id="resources-menu-button"
                className={cn(
                  'text-gray-700 hover:text-primary transition flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isResourcesActive && 'border-b-2 border-primary font-semibold'
                )}
              >
                Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDropdown === 'resources' && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] max-w-[240px] py-2 z-50 md:transform md:-translate-x-1/4 lg:transform-none lg:translate-x-0"
                  role="menu"
                  aria-labelledby="resources-menu-button"
                  onKeyDown={handleKeyDown}
                >
                  {RESOURCES.map((resource) => (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className={cn(
                        'block px-4 py-2.5 text-base hover:bg-primary hover:text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                        pathname === resource.href && 'bg-primary text-white font-bold'
                      )}
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
            className="md:hidden p-3 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors duration-200"
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

        {/* Mobile Navigation (Task 8: Accordion) */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {/* Products Accordion */}
            <div>
              <button
                onClick={() => toggleDropdown('products')}
                className="w-full flex items-center justify-between px-4 py-6 text-gray-700 hover:bg-gray-50 rounded-lg min-h-[48px]"
                aria-expanded={openDropdown === 'products'}
              >
                <span className="font-medium">Products</span>
                <svg
                  className={cn(
                    'w-5 h-5 transition-transform duration-200',
                    openDropdown === 'products' && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDropdown === 'products' && (
                <div className="overflow-hidden transition-all duration-200 accordion-content">
                  {PRODUCTS.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="block pl-8 pr-4 py-4 text-gray-700 hover:bg-gray-50 rounded-lg min-h-[48px] flex items-center"
                      onClick={() => {
                        closeDropdown();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <div className="font-semibold text-base mb-0.5">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Features Link */}
            <Link
              href="/features"
              className="block px-4 py-4 text-gray-700 hover:bg-gray-50 rounded-lg min-h-[48px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>

            {/* Pricing Link */}
            <Link
              href="/pricing"
              className="block px-4 py-4 text-gray-700 hover:bg-gray-50 rounded-lg min-h-[48px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>

            {/* Resources Accordion */}
            <div>
              <button
                onClick={() => toggleDropdown('resources')}
                className="w-full flex items-center justify-between px-4 py-6 text-gray-700 hover:bg-gray-50 rounded-lg min-h-[48px]"
                aria-expanded={openDropdown === 'resources'}
              >
                <span className="font-medium">Resources</span>
                <svg
                  className={cn(
                    'w-5 h-5 transition-transform duration-200',
                    openDropdown === 'resources' && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDropdown === 'resources' && (
                <div className="overflow-hidden transition-all duration-200 accordion-content">
                  {RESOURCES.map((resource) => (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className="block pl-8 pr-4 py-4 text-gray-700 hover:bg-gray-50 rounded-lg min-h-[48px] flex items-center"
                      onClick={() => {
                        closeDropdown();
                        setMobileMenuOpen(false);
                      }}
                    >
                      {resource.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/assessment"
              className="block bg-accent text-gray-900 px-6 py-3 rounded-lg hover:bg-accent-dark transition text-center font-semibold mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Free Assessment
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
