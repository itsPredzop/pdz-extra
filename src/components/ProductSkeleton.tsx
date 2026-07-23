export default function ProductSkeleton() {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg overflow-hidden animate-pulse">
      <div className="aspect-video bg-surface-2" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-surface-2 rounded w-3/4" />
        <div className="h-4 bg-surface-2 rounded w-full" />
        <div className="h-4 bg-surface-2 rounded w-2/3" />
        <div className="flex gap-1.5">
          <div className="h-5 w-12 bg-surface-2 rounded-md" />
          <div className="h-5 w-14 bg-surface-2 rounded-md" />
          <div className="h-5 w-10 bg-surface-2 rounded-md" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-16 bg-surface-2 rounded" />
          <div className="h-4 w-20 bg-surface-2 rounded" />
        </div>
      </div>
    </div>
  );
}
