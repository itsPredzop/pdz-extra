import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for PDZ EXTRA — rules governing the purchase and use of our MTA:SA scripts.',
};

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-muted mb-10">Last updated: July 1, 2026</p>

        <div className="space-y-8 text-sm text-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the PDZ EXTRA website and purchasing our products, you
              agree to be bound by these Terms and Conditions. If you do not agree to these
              terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Products &amp; Licensing</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>All products are digital goods delivered electronically after purchase.</li>
              <li>You get a free support for all products.</li>
              <li>All products include lifetime updates at no additional cost.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Permitted Use</h2>
            <p className="mb-3">You are permitted to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Use purchased scripts on one licensed MTA:SA server</li>
              <li>Modify scripts to suit your server&apos;s needs</li>
              <li>Create backups of purchased products for personal use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Prohibited Use</h2>
            <p className="mb-3">You are NOT permitted to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Redistribute, resell, or share purchased scripts in any form</li>
              <li>Remove or modify licensing protections or encryption</li>
              <li>Use purchased scripts on more servers than your license permits</li>
              <li>Claim authorship or ownership of our scripts</li>
              <li>Use our products for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Refund Policy</h2>
            <p>
              Due to the digital nature of our products, refunds are generally not offered
              once a product has been downloaded. Exceptions may be made on a case-by-case
              basis for critical unresolved issues. To request a refund, contact our support
              team within 48 hours of purchase with a detailed description of the issue.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Support</h2>
            <p>
              We provide support for our products through our Discord server. Support covers
              installation assistance, configuration help, and bug resolution. We do not
              provide support for custom modifications made by the user or for third-party
              script conflicts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Intellectual Property</h2>
            <p>
              All scripts, code, designs, and content provided by PDZ EXTRA are protected
              by intellectual property laws. Purchasing a product grants you a license to
              use it, not ownership of the underlying code or intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Limitation of Liability</h2>
            <p>
              PDZ EXTRA shall not be liable for any indirect, incidental, special, or
              consequential damages arising from the use or inability to use our products.
              Our total liability shall not exceed the amount paid for the specific product
              in question.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes
              will be posted on this page with an updated &quot;Last updated&quot; date. Continued use
              of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact</h2>
            <p>
              For questions about these Terms and Conditions, contact us at{' '}
              <a href="mailto:legal@pdzextra.com" className="text-accent hover:text-accent-hover">
                legal@pdzextra.com
              </a>{' '}
              or through our Discord server.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
