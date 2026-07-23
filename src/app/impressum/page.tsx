import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Legal disclosure (Impressum) for PDZ EXTRA as required by EU law.',
};

import { getConfig } from '@/app/admin/actions';

export default async function ImpressumPage() {
  const { config } = await getConfig();
  const contactEmail = config?.mail || 'contact@pdzextra.com';
  const websiteUrl = config?.website || 'https://pdzextra.com';
  const websiteDisplay = websiteUrl.replace(/^https?:\/\//, '');
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Impressum
        </h1>
        <p className="text-sm text-muted mb-10">Legal Disclosure (§ 5 TMG)</p>

        <div className="space-y-8 text-sm text-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Company Information
            </h2>
            <div className="p-5 rounded-xl border border-card-border bg-card-bg space-y-2">
              <p><strong className="text-foreground">Company Name:</strong> PDZ EXTRA</p>
              <p><strong className="text-foreground">Legal Form:</strong> Sole Proprietorship</p>
              <p><strong className="text-foreground">Owner:</strong> Sami Predzop</p>
              <p><strong className="text-foreground">Email:</strong>{' '}
                <a href={`mailto:${contactEmail}`} className="text-accent hover:text-accent-hover">
                  {contactEmail}
                </a>
              </p>
              <p><strong className="text-foreground">Website:</strong>{' '}
                <a href={websiteUrl} className="text-accent hover:text-accent-hover" target="_blank" rel="noopener noreferrer">
                  {websiteDisplay}
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              VAT Identification Number
            </h2>
            <p>
              VAT Identification Number pursuant to § 27a of the German VAT Act (UStG):{' '}
              <strong className="text-foreground">[VAT ID]</strong>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Responsible for Content
            </h2>
            <p>
              Responsible for content pursuant to § 55 Abs. 2 RStV:{' '}
              <strong className="text-foreground">[Your Name]</strong>, [Address]
            </p>
          </section>



          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Liability for Content
            </h2>
            <p>
              As a service provider, we are responsible for our own content on these pages
              in accordance with § 7 para.1 TMG. However, according to §§ 8 to 10 TMG, we
              are not obligated to monitor transmitted or stored third-party information or
              to investigate circumstances that indicate illegal activity.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Liability for Links
            </h2>
            <p>
              Our website contains links to external third-party websites over whose content
              we have no influence. Therefore, we cannot accept any liability for this
              third-party content. The respective provider or operator of the pages is always
              responsible for the content of the linked pages.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
