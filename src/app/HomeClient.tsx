'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Headphones,
  Zap,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import AnimatedCounter from '../components/AnimatedCounter';
import { Accordion } from '../components/Accordion';
import { getFeaturedProducts as getStaticFeaturedProducts } from '../data/products';
import { faqItems as staticFaqItems } from '../data/faq';
import { getProducts, getFaqs } from '@/app/admin/actions';
import { Loader2 } from 'lucide-react';

const features = [
  {
    icon: Headphones,
    title: 'Support & Community',
    description:
      'Join our active Discord community with dedicated support channels and personalized help from our team.',
  },
  {
    icon: Zap,
    title: 'Quality & Performance',
    description:
      'Continuously optimized code with minimal resource usage. Every script runs under 0.01ms on idle.',
  },
  {
    icon: BookOpen,
    title: 'Easy to Use',
    description:
      'Clear installation guides, comprehensive documentation, and video tutorials for every script.',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description:
      'Encrypted resources with IP-based licensing. Ownership validation through our secure platform.',
  },
];

const stats = [
  { end: 6, suffix: '+', label: 'Total Sales' },
  { end: 3, suffix: '+', label: 'Servers Using Our Scripts' },
  { end: 250, suffix: '+', label: 'Active Users' },
];

export default function HomeClient({ initialProducts, initialFaqs }: { initialProducts: any[], initialFaqs: any[] }) {
  const featuredProducts = initialProducts;
  const faqs = initialFaqs;
  const isLoading = false;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 hero-grid opacity-40" />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-xs font-medium text-accent">
                Trusted by 230+ users around the world
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              Bring your server to the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                next level
              </span>{' '}
              with PDZ EXTRA
            </h1>

            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Premium Multi Theft Auto scripts crafted for performance and quality. Compatible
              with OWL, Original, Social & Standalone frameworks.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-all hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                Browse products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 border border-card-border hover:border-accent/30 hover:bg-card-bg text-foreground px-8 py-3.5 rounded-xl text-base font-semibold transition-all"
              >
                Join our Discord
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Scripts
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Our most popular and highly-rated MTA.SA resources, battle-tested on hundreds of servers.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-12 text-neutral-500">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.slug || product.$id} product={product} index={index} />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
            >
              View all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose PDZ EXTRA?
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              We&apos;re committed to delivering the best MTA.SA scripting experience possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-card-border bg-card-bg hover:border-accent/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Achievements */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Achievements
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Started in 2026, trusted by MTA.SA servers worldwide. Numbers that speak for
              themselves.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted text-lg">
              Got questions? We&apos;ve got answers.
            </p>
          </motion.div>

          <Accordion items={faqs.length > 0 ? faqs : staticFaqItems} />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-sm text-muted">
              Still have questions?{' '}
              <Link href="/support" className="text-accent hover:text-accent-hover font-medium transition-colors">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
