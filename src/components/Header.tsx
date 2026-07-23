'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { Menu, X, Sun, Moon, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultNavLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Documentation', href: '/documentation', external: false },
];

export default function Header({ config }: { config?: any }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Documentation', href: config?.documentation || '/documentation', external: !!config?.documentation },
  ];

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center">
          <Link
            href="/products"
            className="text-sm text-accent hover:text-accent-hover transition-colors flex items-center gap-1.5 font-medium"
          >
            <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full font-semibold">NEW</span>
            Latest releases available now
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-card-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="PDZ EXTRA Home">
            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
              PDZ EXTRA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors flex items-center gap-1"
              >
                {link.label}
                {link.external && <ExternalLink className="w-3 h-3" />}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-card-bg transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-muted hover:text-foreground transition-colors" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-muted hover:text-foreground transition-colors" />
              )}
            </button>

            {/* CTA Button */}
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              Browse products
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-card-bg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-card-border bg-background/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-base font-medium text-muted hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3.5 h-3.5" />}
                  </Link>
                ))}
                <Link
                  href="/products"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all w-full mt-2"
                >
                  Browse products
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
