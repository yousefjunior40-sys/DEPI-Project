import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Star, MessageSquare, CornerDownRight, Send } from "lucide-react";
import { toast } from "sonner";
const VendorReviews = () => {
  const {
    currentUser,
    getVendorTruck,
    getTruckReviews,
    replyToReview
  } = useApp();
  const [replyTexts, setReplyTexts] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);
  if (!currentUser) return null;
  const truck = getVendorTruck(currentUser.id);
  if (!truck) {
    return <div className="text-center py-12">
        <p className="text-muted-foreground">Truck profile not configured.</p>
      </div>;
  }
  const reviews = getTruckReviews(truck.id);
  const handleReplySubmit = reviewId => {
    const text = replyTexts[reviewId];
    if (!text || !text.trim()) {
      toast.error("Reply text cannot be empty.");
      return;
    }
    replyToReview(reviewId, text.trim());
    setActiveReplyId(null);
    toast.success("Response posted successfully!");
  };

  // Rating breakdowns
  const totalCount = reviews.length;
  const ratingDistribution = [0, 0, 0, 0, 0]; // 1, 2, 3, 4, 5 stars
  reviews.forEach(r => {
    const starIdx = Math.min(Math.max(1, r.rating), 5) - 1;
    ratingDistribution[starIdx]++;
  });
  return <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Reviews</h1>
        <p className="text-sm text-muted-foreground mt-1">Listen and respond to your customer feedback.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Panel */}
        <div className="bg-card rounded-xl shadow-soft p-5 h-fit border border-border">
          <h3 className="font-semibold mb-4 font-display">Rating Summary</h3>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-extrabold font-display">
              {truck.rating > 0 ? truck.rating.toFixed(1) : "0.0"}
            </span>
            <div>
              <div className="flex items-center text-accent">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`h-4 w-4 ${s <= Math.round(truck.rating) ? "fill-current" : "text-muted"}`} />)}
              </div>
              <span className="text-xs text-muted-foreground mt-0.5 block">{totalCount} customer ratings</span>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(stars => {
            const count = ratingDistribution[stars - 1];
            const pct = totalCount > 0 ? count / totalCount * 100 : 0;
            return <div key={stars} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-right">{stars}</span>
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{
                  width: `${pct}%`
                }} />
                  </div>
                  <span className="w-6 text-right text-muted-foreground">{count}</span>
                </div>;
          })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2 space-y-4">
          {reviews.map(review => <div key={review.id} className="bg-card rounded-xl shadow-soft p-5 space-y-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm">{review.customerName}</h4>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString([], {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
                  </p>
                </div>
                <div className="flex items-center text-accent">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-current" : "text-muted"}`} />)}
                </div>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed font-sans">{review.comment}</p>

              {/* Existing Reply */}
              {review.vendorReply ? <div className="flex gap-2 p-3 bg-muted/30 rounded-lg">
                  <CornerDownRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Your response</p>
                    <p className="text-xs text-muted-foreground mt-0.5 font-sans leading-relaxed">{review.vendorReply}</p>
                  </div>
                </div> : <div className="pt-2">
                  {activeReplyId === review.id ? <div className="space-y-2">
                      <textarea rows={2} value={replyTexts[review.id] ?? ""} onChange={e => setReplyTexts({
                ...replyTexts,
                [review.id]: e.target.value
              })} placeholder="Write your response to this customer..." className="w-full p-2.5 rounded-lg border border-input bg-background text-xs outline-none focus:ring-2 focus:ring-ring resize-none font-sans" />
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setActiveReplyId(null)} className="px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-xs font-semibold hover:bg-muted/80 transition-colors">
                          Cancel
                        </button>
                        <button onClick={() => handleReplySubmit(review.id)} className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors">
                          <Send className="h-3 w-3" /> Reply
                        </button>
                      </div>
                    </div> : <button onClick={() => setActiveReplyId(review.id)} className="inline-flex items-center gap-1 text-xs text-accent font-semibold hover:underline">
                      <MessageSquare className="h-3.5 w-3.5" /> Respond to review
                    </button>}
                </div>}
            </div>)}

          {reviews.length === 0 && <div className="bg-card rounded-xl p-8 text-center shadow-soft border border-border">
              <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground font-medium">No reviews received yet.</p>
              <p className="text-xs text-muted-foreground/60 mt-1">When customers review completed orders, they'll appear here.</p>
            </div>}
        </div>
      </div>
    </div>;
};
export default VendorReviews;