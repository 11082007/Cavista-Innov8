import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Get user from localStorage or context
  const user = JSON.parse(localStorage.getItem("userData") || "null");
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard if not authorized
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

// Role-specific protected routes
export const PatientRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["patient"]}>{children}</ProtectedRoute>
);

export const HospitalRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["hospital", "hospital_admin"]}>
    {children}
  </ProtectedRoute>
);

export const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["admin"]}>{children}</ProtectedRoute>
);

export const DoctorRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={["doctor"]}>{children}</ProtectedRoute>
);

export default ProtectedRoute;
