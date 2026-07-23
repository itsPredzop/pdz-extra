import type { Metadata } from 'next';
import { Accordion } from '../../components/Accordion';
import { faqItems as staticFaqItems } from '../../data/faq';
import { getFaqs } from '@/app/admin/actions';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about PDZ EXTRA MTA:SA scripts — installation, refunds, support, licensing, and more.',
};

export default async function FaqPage() {
  const res = await getFaqs();
  const items = res.success && res.faqs && res.faqs.length > 0 ? res.faqs : staticFaqItems;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted text-lg">
            Everything you need to know about our products and services.
          </p>
        </div>

        <Accordion items={items} />

        <div className="text-center mt-12 p-8 rounded-xl border border-card-border bg-card-bg">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-muted mb-4">
            Our support team is available on Discord to help you with anything.
          </p>
          <a
            href="https://dsc.gg/predzop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            Join our Discord
          </a>
        </div>
      </div>
    </section>
  );
}
