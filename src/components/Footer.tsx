import Link from 'next/link';
import { MessageCircle, Heart, Code2, PlayCircle } from 'lucide-react';
import { getConfig } from '@/app/admin/actions';

export default async function Footer() {
  const { config } = await getConfig();
  
  const footerSections = [
    {
      title: 'Products',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'Featured Scripts', href: '/products' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: config?.documentation || 'https://docs.pdzextra.com', external: true },
        { label: 'Support', href: '/support' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Impressum', href: '/impressum' },
      ],
    },
  ];

  const socialLinks = [
    { label: 'Discord', href: config?.discord || 'https://dsc.gg/predzop', icon: MessageCircle },
    { label: 'GitHub', href: config?.github || 'https://github.com/itsPredzop', icon: Code2 },
    { label: 'YouTube', href: config?.youtube || 'https://youtube.com/@pdzextra', icon: PlayCircle },
  ];

  return (
    <footer className="border-t border-card-border bg-surface mt-auto">
      {/* Partner Banner */}
      <div className="border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <p className="text-muted">
              <span className="text-foreground font-medium">🤝 Hosting Partner:</span>{' '}
              Get 20% off your MTA:SA server with code{' '}
              <span className="text-accent font-semibold">PDZEXTRA</span>
            </p>
            <Link
              href="#"
              className="text-accent hover:text-accent-hover font-medium transition-colors"
            >
              Claim discount →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              PDZ EXTRA
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Premium MTA:SA scripts crafted with performance and quality in mind. Elevate your
              roleplay server experience.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card-bg hover:bg-accent/10 hover:text-accent border border-card-border transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={'external' in link && link.external ? '_blank' : undefined}
                      rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} PDZ EXTRA. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for the MTA:SA community
          </p>
        </div>
      </div>
    </footer>
  );
}
