import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Services from './pages/Services';
import Partnerships from './pages/Partnerships';
import Profile from './pages/Profile';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './components/admin/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPartnerships from './pages/admin/AdminPartnerships';
import AdminProviders from './pages/admin/AdminProviders';
import AdminRequests from './pages/admin/AdminRequests';
import AdminResidents from './pages/admin/AdminResidents';
import AdminReports from './pages/admin/AdminReports';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="parceiros" element={<AdminPartnerships />} />
                <Route path="prestadores" element={<AdminProviders />} />
                <Route path="solicitacoes" element={<AdminRequests />} />
                <Route path="moradores" element={<AdminResidents />} />
                <Route path="relatorios" element={<AdminReports />} />
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
              </Route>
            </Route>

            {/* Resident Mobile App Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="services" element={<Services />} />
              <Route path="partnerships" element={<Partnerships />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
