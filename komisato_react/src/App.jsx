// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Header from './components/common/Header';
import ToastContainer from './components/common/ToastContainer';
import AuthPage from './components/auth/AuthPage';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import GuestDashboard from './components/guest/GuestDashboard';

// Employee routes components
import EmployeesPage from './components/employee/EmployeesPage';
import OrdersPage from './components/employee/OrdersPage';
import ServicesPage from './components/employee/ServicesPage';
import ClientsPage from './components/employee/ClientsPage';
import SessionsPage from './components/employee/SessionsPage';

// Guest routes components
import GuestOrdersPage from './components/guest/GuestOrdersPage';
import GuestServicesPage from './components/guest/GuestServicesPage';
import GuestEmployeesPage from './components/guest/GuestEmployeesPage';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, currentRole } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  const { isAuthenticated, currentRole } = useAuthStore();

  return (
    <Router>
      <div className="app-container">
        <ToastContainer />
        {isAuthenticated && <Header />}
        
        <div className="main-content">
          <Routes>
            {/* Public routes */}
            <Route 
              path="/auth" 
              element={
                !isAuthenticated ? <AuthPage /> : <Navigate to="/" />
              } 
            />
            
            {/* Employee routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  {currentRole === 'employee' ? <EmployeeDashboard /> : <GuestDashboard />}
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/employees" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EmployeesPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <OrdersPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/services" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <ServicesPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/clients" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <ClientsPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/sessions" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <SessionsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Guest routes */}
            <Route 
              path="/my-orders" 
              element={
                <ProtectedRoute allowedRoles={['guest']}>
                  <GuestOrdersPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/guest-services" 
              element={
                <ProtectedRoute allowedRoles={['guest']}>
                  <GuestServicesPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/our-team" 
              element={
                <ProtectedRoute allowedRoles={['guest']}>
                  <GuestEmployeesPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;