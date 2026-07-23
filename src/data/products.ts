export interface Product {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  gallery: string[];
  frameworks: Framework[];
  category: Category;
  featured: boolean;
  features: string[];
  requirements: string[];
  changelog: ChangelogEntry[];
}

export type Framework = 'OWL' | 'Social' | 'Original' | 'Standalone';
export type Category = 'HUD' | 'Job' | 'Vehicle' | 'Inventory' | 'Admin' | 'Misc';

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export const products: Product[] = [
  {
    slug: 'advanced-hud',
    name: 'Advanced HUD System',
    shortDescription: 'A fully customizable heads-up display with health, armor, hunger, thirst, and minimap integration.',
    description: 'Transform your MTA:SA server with our state-of-the-art HUD system. Featuring a sleek, modern design with fully customizable elements including health, armor, hunger, thirst, stress, and stamina bars. The HUD seamlessly integrates with your minimap and supports real-time updates with buttery-smooth animations. Built with performance in mind, it uses under 0.01ms on idle and includes a built-in settings panel for players to personalize their experience.',
    price: 25.00,
    image: '/products/hud-banner.png',
    gallery: ['/products/hud-banner.png', '/products/hud-preview-2.png', '/products/hud-preview-3.png'],
    frameworks: ['OWL', 'Social', 'Original', 'Standalone'],
    category: 'HUD',
    featured: true,
    features: [
      'Fully customizable UI with in-game settings panel',
      'Health, armor, hunger, thirst, stress & stamina indicators',
      'Smooth animations with under 0.01ms idle performance',
      'Dynamic minimap integration with auto-hide',
      'Cinematic mode toggle',
      'Vehicle HUD with speedometer, fuel gauge & seatbelt indicator',
      'Status effect notifications',
      'Multi-language support (EN, DE, FR, ES, PT)',
    ],
    requirements: [
      'MTA:SA server (latest recommended artifacts)',
      'OWL / Social / Original framework (or Standalone)',
      'ox_lib (optional, for enhanced notifications)',
    ],
    changelog: [
      { version: '2.1.0', date: '2026-06-15', changes: ['Added Original support', 'New cinematic mode', 'Performance improvements'] },
      { version: '2.0.0', date: '2026-04-20', changes: ['Complete UI redesign', 'Added vehicle HUD', 'Multi-language support'] },
      { version: '1.5.0', date: '2026-02-10', changes: ['Added stress & stamina bars', 'Bug fixes'] },
    ],
  },
  {
    slug: 'premium-garage',
    name: 'Premium Garage System',
    shortDescription: 'A modern garage system with 3D vehicle preview, custom parking spots, and impound management.',
    description: 'Elevate your server\'s vehicle management with our Premium Garage System. Features a stunning 3D vehicle preview in the garage UI, custom parking spot management, vehicle condition tracking, and a full impound system with admin controls. Players can store, retrieve, and manage their vehicles with an intuitive modern interface that feels natural and immersive.',
    price: 30.00,
    image: '/products/garage-banner.png',
    gallery: ['/products/garage-banner.png', '/products/garage-preview-2.png'],
    frameworks: ['OWL', 'Social', 'Original'],
    category: 'Vehicle',
    featured: true,
    features: [
      '3D vehicle preview in garage UI',
      'Custom parking spot management with blips',
      'Vehicle condition tracking (engine, body, fuel)',
      'Full impound system with admin panel',
      'Garage capacity limits per location',
      'Vehicle transfer between players',
      'Automatic parking on disconnect',
      'Integration with fuel & mechanic scripts',
    ],
    requirements: [
      'MTA:SA server (latest recommended artifacts)',
      'OWL / Social / Original framework',
      'MySQL database (oxmysql recommended)',
    ],
    changelog: [
      { version: '1.3.0', date: '2026-05-28', changes: ['Added vehicle transfer feature', 'UI improvements', 'Original compatibility'] },
      { version: '1.2.0', date: '2026-03-15', changes: ['Added impound system', 'Admin panel'] },
      { version: '1.0.0', date: '2026-01-20', changes: ['Initial release'] },
    ],
  },
  {
    slug: 'realistic-mechanic',
    name: 'Realistic Mechanic Job',
    shortDescription: 'An immersive mechanic job with detailed repair animations, part ordering, and customer management.',
    description: 'Give your players the ultimate mechanic roleplay experience. This comprehensive mechanic job script features detailed repair animations, a parts ordering system with delivery timers, customer management with invoicing, and a full workshop management panel. The repair system is modular — engine, body, tires, electronics, and more can all be repaired individually with realistic progress tracking.',
    price: 35.00,
    image: '/products/mechanic-banner.png',
    gallery: ['/products/mechanic-banner.png', '/products/mechanic-preview-2.png'],
    frameworks: ['OWL', 'Social'],
    category: 'Job',
    featured: true,
    features: [
      'Detailed repair animations for each vehicle part',
      'Parts ordering system with delivery timers',
      'Customer management with invoicing',
      'Workshop management panel for owners',
      'Modular repair system (engine, body, tires, electronics)',
      'Employee management with ranks & permissions',
      'Tow truck integration',
      'Performance tuning options for vehicles',
    ],
    requirements: [
      'MTA:SA server (latest recommended artifacts)',
      'OWL / Social framework',
      'MySQL database (oxmysql recommended)',
      'ox_target or qb-target for interactions',
    ],
    changelog: [
      { version: '1.2.0', date: '2026-06-01', changes: ['Added performance tuning', 'New repair animations'] },
      { version: '1.1.0', date: '2026-04-10', changes: ['Added tow truck integration', 'Invoice system'] },
      { version: '1.0.0', date: '2026-02-15', changes: ['Initial release'] },
    ],
  },
  {
    slug: 'smart-inventory',
    name: 'Smart Inventory UI',
    shortDescription: 'A sleek drag-and-drop inventory with crafting, shops, and advanced item management.',
    description: 'Redefine how players interact with items on your server. Our Smart Inventory features a modern drag-and-drop interface with smooth animations, hotbar support, weight-based management, and integrated crafting and shop systems. The inventory UI is fully customizable through an in-game config panel and supports custom item images with automatic fallbacks.',
    price: 28.00,
    image: '/products/inventory-banner.png',
    gallery: ['/products/inventory-banner.png', '/products/inventory-preview-2.png'],
    frameworks: ['OWL', 'Social', 'Original', 'Standalone'],
    category: 'Inventory',
    featured: false,
    features: [
      'Modern drag-and-drop interface',
      'Hotbar with keybind support (1-5)',
      'Weight-based item management',
      'Integrated crafting system',
      'Shop system with buy/sell',
      'Customizable UI through in-game config',
      'Custom item images with auto fallbacks',
      'Context menu for item actions (use, give, drop)',
    ],
    requirements: [
      'MTA:SA server (latest recommended artifacts)',
      'OWL / Social / Original framework (or Standalone)',
      'MySQL database (oxmysql recommended)',
    ],
    changelog: [
      { version: '1.4.0', date: '2026-06-20', changes: ['Added crafting system', 'New shop UI'] },
      { version: '1.3.0', date: '2026-05-01', changes: ['Added hotbar support', 'Performance optimization'] },
      { version: '1.0.0', date: '2026-03-01', changes: ['Initial release'] },
    ],
  },
  {
    slug: 'admin-toolkit',
    name: 'Admin Toolkit Pro',
    shortDescription: 'A comprehensive admin panel with player management, server stats, and moderation tools.',
    description: 'Take full control of your MTA:SA server with Admin Toolkit Pro. This comprehensive administration panel provides real-time server statistics, player management tools, ban/kick/warn system with logging, teleportation, vehicle spawning, weather/time control, and a built-in report system. Everything is accessible through a beautiful in-game UI with role-based permissions.',
    price: 40.00,
    image: '/products/admin-banner.png',
    gallery: ['/products/admin-banner.png', '/products/admin-preview-2.png'],
    frameworks: ['OWL', 'Social', 'Standalone'],
    category: 'Admin',
    featured: false,
    features: [
      'Real-time server statistics dashboard',
      'Player management (ban, kick, warn, freeze, spectate)',
      'Full action logging with search & filters',
      'Teleportation system with saved locations',
      'Vehicle spawner with custom modifications',
      'Weather & time control panel',
      'Built-in report system with notifications',
      'Role-based permissions with custom ranks',
    ],
    requirements: [
      'MTA:SA server (latest recommended artifacts)',
      'OWL / Social framework (or Standalone)',
      'MySQL database (oxmysql recommended)',
    ],
    changelog: [
      { version: '2.0.0', date: '2026-06-10', changes: ['Complete UI overhaul', 'Added spectate mode', 'New report system'] },
      { version: '1.5.0', date: '2026-04-05', changes: ['Added action logging', 'Vehicle spawner improvements'] },
      { version: '1.0.0', date: '2026-01-15', changes: ['Initial release'] },
    ],
  },
  {
    slug: 'loading-screen',
    name: 'Cinematic Loading Screen',
    shortDescription: 'A beautiful animated loading screen with music, server info, and loading progress.',
    description: 'Make a stunning first impression with our Cinematic Loading Screen. Features a beautiful full-screen video/image slideshow background, customizable server information display, loading progress bar with percentage, background music with volume control, staff credits, server rules display, and social media links. Everything is easily configurable through a simple JSON config file.',
    price: 15.00,
    image: '/products/loading-banner.png',
    gallery: ['/products/loading-banner.png', '/products/loading-preview-2.png'],
    frameworks: ['Standalone'],
    category: 'Misc',
    featured: false,
    features: [
      'Full-screen video/image slideshow background',
      'Customizable server info panel',
      'Loading progress bar with percentage',
      'Background music with volume control',
      'Staff credits section',
      'Server rules display',
      'Social media links',
      'Easy JSON configuration',
    ],
    requirements: [
      'MTA:SA server (any artifacts)',
      'No framework dependency — fully standalone',
    ],
    changelog: [
      { version: '1.2.0', date: '2026-05-15', changes: ['Added video background support', 'Volume control'] },
      { version: '1.1.0', date: '2026-03-20', changes: ['Added staff credits', 'Server rules section'] },
      { version: '1.0.0', date: '2026-02-01', changes: ['Initial release'] },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return [];
  return products
    .filter((p) => p.slug !== slug && (p.category === current.category || p.frameworks.some((f) => current.frameworks.includes(f))))
    .slice(0, limit);
}
