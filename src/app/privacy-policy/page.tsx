import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for PDZ EXTRA — how we collect, use, and protect your personal data.',
};

import { getConfig } from '@/app/admin/actions';

export default async function PrivacyPolicyPage() {
  const { config } = await getConfig();
  const contactEmail = config?.mail || 'privacy@pdzextra.com';
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted mb-10">Last updated: July 1, 2026</p>

        <div className="space-y-8 text-sm text-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              Welcome to PDZ EXTRA (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). We are committed to protecting
              your personal information and your right to privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you visit our
              website and purchase our products.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-foreground">Technical Data:</strong> IP address, browser type, operating system, and device information collected automatically when you visit our site.</li>
              <li><strong className="text-foreground">Usage Data:</strong> Pages visited, time spent on pages, and navigation patterns to improve our services.</li>
              <li><strong className="text-foreground">License Data:</strong> Server IP addresses and Cfx.re license keys for product activation and validation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To process transactions and deliver purchased products</li>
              <li>To validate and manage product licenses</li>
              <li>To provide customer support and respond to inquiries</li>
              <li>To send important product updates and security patches</li>
              <li>To improve our website and product offerings</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third
              parties except as described below:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-3">
              <li><strong className="text-foreground">Payment Processors:</strong> Payhip processes all financial transactions. Please review their privacy policy.</li>
              <li><strong className="text-foreground">Analytics:</strong> We may use anonymized analytics to understand site usage patterns.</li>
              <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience, remember your preferences
              (such as theme settings), and analyze site traffic. You can control cookie
              preferences through your browser settings. For more details, see our cookie
              consent banner.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal data against unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Your Rights (GDPR)</h2>
            <p className="mb-3">Under the GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at{' '}
              <a href={`mailto:${contactEmail}`} className="text-accent hover:text-accent-hover">
                {contactEmail}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Contact Us</h2>
            <p>
              For any questions or concerns about this Privacy Policy, please contact us at{' '}
              <a href={`mailto:${contactEmail}`} className="text-accent hover:text-accent-hover">
                {contactEmail}
              </a>{' '}
              or through our Discord server.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
