import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="vh-100 d-flex align-items-center justify-content-center">Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<NotificationProvider><MainLayout /></NotificationProvider>}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Additional routes will be added in Batch 3 */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}