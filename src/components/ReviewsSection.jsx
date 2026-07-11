import { Star, CornerDownRight, MessageSquare } from "lucide-react";
const ReviewsSection = ({
  reviews,
  rating,
  reviewCount
}) => {
  // Star distribution breakdown
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach(r => {
    const starIdx = Math.min(Math.max(1, r.rating), 5) - 1;
    ratingDistribution[starIdx]++;
  });
  return <div className="space-y-6 pt-4">
      <h2 className="font-display text-2xl font-bold text-foreground">Customer Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Aggregated ratings */}
        <div className="bg-card rounded-xl shadow-soft p-5 border border-border h-fit">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl font-extrabold font-display">{rating > 0 ? rating.toFixed(1) : "0.0"}</span>
            <div>
              <div className="flex items-center text-accent">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`h-4.5 w-4.5 ${s <= Math.round(rating) ? "fill-current" : "text-muted-foreground/30"}`} />)}
              </div>
              <span className="text-xs text-muted-foreground mt-0.5 block">{reviewCount} total reviews</span>
            </div>
          </div>

          {/* Star percentages */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(stars => {
            const count = ratingDistribution[stars - 1];
            const pct = reviewCount > 0 ? count / reviewCount * 100 : 0;
            return <div key={stars} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-3 text-right">{stars}</span>
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{
                  width: `${pct}%`
                }} />
                  </div>
                  <span className="w-5 text-right">{count}</span>
                </div>;
          })}
          </div>
        </div>

        {/* Review feed */}
        <div className="md:col-span-2 space-y-4">
          {reviews.map(r => <div key={r.id} className="bg-card rounded-xl p-5 border border-border shadow-soft space-y-3 animate-fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{r.customerName}</h4>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString([], {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
                  </span>
                </div>
                <div className="flex items-center text-accent">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-current" : "text-muted-foreground/30"}`} />)}
                </div>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed font-sans">{r.comment}</p>

              {r.vendorReply && <div className="flex gap-2 p-3 bg-muted/40 rounded-lg">
                  <CornerDownRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Vendor response</p>
                    <p className="text-xs text-muted-foreground mt-0.5 font-sans leading-relaxed">{r.vendorReply}</p>
                  </div>
                </div>}
            </div>)}

          {reviews.length === 0 && <div className="bg-card rounded-xl p-8 border border-border shadow-soft text-center text-muted-foreground">
              <MessageSquare className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
              <p className="font-semibold">No reviews yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Be the first to order and leave feedback for this truck!</p>
            </div>}
        </div>
      </div>
    </div>;
};
export default ReviewsSection;