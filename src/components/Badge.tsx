import type { Framework } from '../data/products';

const badgeColors: Record<Framework, string> = {
  OWL: 'bg-badge-owl/15 text-badge-owl border-badge-owl/30',
  Social: 'bg-badge-social/15 text-badge-social border-badge-social/30',
  Original: 'bg-badge-original/15 text-badge-original border-badge-original/30',
  Standalone: 'bg-badge-standalone/15 text-badge-standalone border-badge-standalone/30',
};

export function Badge({ framework }: { framework: Framework }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${badgeColors[framework]}`}
    >
      {framework}
    </span>
  );
}
