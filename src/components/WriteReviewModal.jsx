import { useState, useEffect } from "react";
import { Star, X, MessageSquare, Loader2 } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";
const WriteReviewModal = ({
  orderId,
  truckId,
  isOpen,
  onClose
}) => {
  const {
    currentUser,
    createReview,
    data
  } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const existingReview = data.reviews.find(r => r.orderId === orderId);
  useEffect(() => {
    if (isOpen) {
      if (existingReview) {
        setRating(existingReview.rating);
        setComment(existingReview.comment);
      } else {
        setRating(5);
        setComment("");
      }
    }
  }, [isOpen, existingReview]);
  if (!isOpen || !currentUser) return null;
  const handleSubmit = e => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please add a comment detailing your experience");
      return;
    }
    setSubmitting(true);
    createReview({
      orderId,
      truckId,
      customerId: currentUser.id,
      customerName: currentUser.name,
      rating,
      comment: comment.trim()
    });
    setSubmitting(false);
    toast.success("Thank you for your feedback! Review submitted.");
    onClose();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      {/* Modal Content */}
      <form onSubmit={handleSubmit} className="relative bg-card rounded-2xl shadow-elevated border border-border w-full max-w-md p-6 space-y-4 animate-scale-in">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors">
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-2">
          <MessageSquare className="h-6 w-6 text-accent" />
        </div>

        <h3 className="font-display font-bold text-lg text-center text-foreground">Review Your Order</h3>
        <p className="text-xs text-muted-foreground text-center -mt-2">Share your experience with order {orderId}</p>

        {/* Stars Picker */}
        <div className="flex justify-center items-center gap-1.5 py-2">
          {[1, 2, 3, 4, 5].map(star => {
          const isFilled = hoverRating !== null ? star <= hoverRating : star <= rating;
          return <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(null)} className="p-1 transition-transform hover:scale-125 focus:outline-none">
                <Star className={`h-8 w-8 transition-colors ${isFilled ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
              </button>;
        })}
        </div>

        {/* Comment Textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground">Comments</label>
          <textarea required rows={4} value={comment} onChange={e => setComment(e.target.value)} placeholder="Write details about the food quality, taste, delivery speed, or preparation..." className="w-full p-3 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring resize-none font-sans" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-semibold hover:bg-muted/80 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors shadow-sm disabled:opacity-60">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Submit Review
          </button>
        </div>
      </form>
    </div>;
};
export default WriteReviewModal;