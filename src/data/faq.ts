export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'How do I install a script after purchasing?',
    answer: 'After purchase, you will receive a download link. Simply extract the resource folder into your server\'s resources directory, and follow the included README for database setup and configuration. Each script also has detailed documentation available on our docs site.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'Due to the digital nature of our products, we generally do not offer refunds once a script has been downloaded. However, if you experience a critical issue that we cannot resolve within 48 hours, we will work with you on a case-by-case basis. Please contact our support team via Discord before requesting a refund.',
  },
  {
    question: 'Do you provide post-purchase support?',
    answer: 'Absolutely! We offer dedicated support through our Discord server. Our team is available to help with installation, configuration, and troubleshooting. We also have a community of users who share tips and custom configurations. Premium support with priority response is available for all customers.',
  },
  {
    question: 'Can I modify or redistribute purchased scripts?',
    answer: 'You are free to modify our scripts to fit your server\'s needs. However, redistribution, reselling, or sharing of our scripts (modified or unmodified) is strictly prohibited and violates our Terms of Service. Each license is bound to a single server via our licensing platform.',
  },
  {
    question: 'Which frameworks are supported?',
    answer: 'Most of our scripts support OWL, Social, and Original frameworks. Some scripts also offer a Standalone version that works independently of any framework. Check the product page for specific framework compatibility — it\'s clearly indicated with badges on each product.',
  },
  {
    question: 'How are updates delivered?',
    answer: 'All updates are delivered automatically through our licensing platform. When a new version is available, you\'ll receive a notification in Discord and can download the latest version from your account. Major updates are free for life — no subscription needed.',
  },
  {
    question: 'What should I do if I haven\'t received my product?',
    answer: 'First, check your account dashboard — your purchase should appear there within minutes. If it doesn\'t, check your email (including spam folder) for the confirmation. If you still haven\'t received it after 30 minutes, open a support ticket in our Discord server with your transaction ID and we\'ll resolve it immediately.',
  },
];
