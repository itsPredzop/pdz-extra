import type { Metadata } from 'next';
import { MessageCircle, Mail, Clock, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help with PDZ EXTRA MTA:SA scripts. Join our Discord, open a support ticket, or browse our documentation.',
};

import { getConfig } from '@/app/admin/actions';
import CopyEmailButton from '@/components/CopyEmailButton';

const getSupportChannels = (config: any) => [
  {
    icon: MessageCircle,
    title: 'Discord Community',
    description: 'Join our active Discord server for real-time help from our team and community members.',
    action: 'Join Discord',
    href: config?.discord || 'https://dsc.gg/predzop',
    primary: true,
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Browse our comprehensive documentation for installation guides, configuration.',
    action: 'View Docs',
    href: config?.documentation || 'https://docs.pdzextra.com',
    primary: false,
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'For business inquiries, or private matters, reach out via email.',
    action: 'Copie Email',
    email: config?.mail || 'itspredzop206@gmail.com',
    primary: false,
  },
];

const guidelines = [
  {
    icon: Clock,
    title: 'Response Times',
    items: [
      'Discord: Usually within 12 hours during business hours',
      'Email: Within 24 hours',
      'Critical issues: Prioritized response',
    ],
  },
  {
    icon: FileText,
    title: 'Before Contacting Support',
    items: [
      'Check our documentation for common solutions',
      'Search our Discord for similar issues',
      'Prepare your server details (framework, artifact version)',
      'Include error logs if applicable',
    ],
  },
];

export default async function SupportPage() {
  const { config } = await getConfig();
  const supportChannels = getSupportChannels(config);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Can We Help?
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Our team is here to support you. Choose your preferred channel and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {supportChannels.map((channel) => (
            <div
              key={channel.title}
              className="p-6 rounded-xl border border-card-border bg-card-bg hover:border-accent/30 transition-colors group flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <channel.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{channel.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-5">{channel.description}</p>
              <div className="mt-auto">
                {channel.title === 'Email Support' && 'email' in channel && channel.email ? (
                  <CopyEmailButton email={channel.email} />
                ) : (
                  <a
                    href={'href' in channel ? channel.href : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${channel.primary
                      ? 'bg-accent hover:bg-accent-hover text-white'
                      : 'border border-card-border hover:border-accent/30 text-foreground hover:bg-card-bg'
                      }`}
                  >
                    {channel.action}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidelines.map((section) => (
            <div
              key={section.title}
              className="p-6 rounded-xl border border-card-border bg-card-bg"
            >
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-5 h-5 text-accent" />
                <h3 className="text-base font-semibold text-foreground">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
