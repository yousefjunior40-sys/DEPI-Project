import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
/**
 * Wraps a route that requires authentication (and optionally specific roles).
 * Unauthenticated users → /login
 * Wrong role → their correct dashboard
 */
const ProtectedRoute = ({
  children,
  roles,
  redirectTo
}) => {
  const {
    currentUser
  } = useApp();
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" state={{
      from: location
    }} replace />;
  }
  if (roles && !roles.includes(currentUser.role)) {
    // Redirect to the correct home for this role
    const fallback = currentUser.role === 'admin' ? '/platform-admin' : currentUser.role === 'vendor' ? '/vendor' : '/';
    return <Navigate to={redirectTo ?? fallback} replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;