import { Link } from 'react-router-dom';
import { Clock, CheckCircle2, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';
const PendingApprovalPage = () => {
  const {
    currentUser
  } = useApp();
  return <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20 max-w-lg text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
            <Clock className="h-12 w-12 text-accent animate-pulse" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-secondary-foreground" />
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold mb-3">Application Submitted!</h1>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          Your food truck registration has been received. Our team will review it within{' '}
          <span className="text-foreground font-semibold">24 hours</span>.
        </p>

        <div className="bg-card rounded-2xl shadow-card p-6 mb-8 text-left space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary font-bold text-sm">1</span>
            </div>
            <div>
              <p className="font-semibold text-sm">Application Under Review</p>
              <p className="text-xs text-muted-foreground mt-0.5">We're verifying your truck details and documents.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-muted-foreground font-bold text-sm">2</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-muted-foreground">Email Notification</p>
              <p className="text-xs text-muted-foreground mt-0.5">You'll receive an email once your application is approved.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-muted-foreground font-bold text-sm">3</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-muted-foreground">Start Managing Your Truck</p>
              <p className="text-xs text-muted-foreground mt-0.5">Once approved, you can access your vendor dashboard.</p>
            </div>
          </div>
        </div>

        {currentUser && <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground mb-8">
            <Mail className="h-4 w-4" />
            Notification will be sent to{' '}
            <span className="font-medium text-foreground">{currentUser.email}</span>
          </div>}

        <Link to="/" className="inline-flex px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>;
};
export default PendingApprovalPage;