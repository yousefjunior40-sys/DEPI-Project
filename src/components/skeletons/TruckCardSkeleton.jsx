/**
 * Shimmering loading skeleton that mirrors the structure of TruckCard
 */
const TruckCardSkeleton = () => <div className="rounded-xl overflow-hidden bg-card shadow-card border border-border/50 animate-pulse">
    {/* Image frame */}
    <div className="bg-muted h-44 w-full relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>

    {/* Details body */}
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div className="h-5 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-12" />
      </div>
      <div className="h-4 bg-muted rounded w-1/3" />
      <div className="flex gap-4 pt-2">
        <div className="h-3.5 bg-muted rounded w-16" />
        <div className="h-3.5 bg-muted rounded w-16" />
      </div>
    </div>
  </div>;
export const TruckGridSkeleton = ({
  count = 3
}) => <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({
    length: count
  }).map((_, idx) => <TruckCardSkeleton key={idx} />)}
  </div>;
export default TruckCardSkeleton;