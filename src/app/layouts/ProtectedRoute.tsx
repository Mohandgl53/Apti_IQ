import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireTeacher?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false, requireTeacher = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireTeacher && user?.role !== 'teacher') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
