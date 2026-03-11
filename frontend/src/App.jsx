import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Courses from './pages/public/Courses';
import Facilities from './pages/public/Facilities';
import CampusLife from './pages/public/CampusLife';
import AdmissionProcess from './pages/public/AdmissionProcess';
import ApplyNow from './pages/public/ApplyNow';
import Contact from './pages/public/Contact';
import Gallery from './pages/public/Gallery';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import DashboardOverview from './pages/admin/DashboardOverview';
import LeadsManagement from './pages/admin/LeadsManagement';
import BulkUpload from './pages/admin/BulkUpload';
import CampaignPanel from './pages/admin/CampaignPanel';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!token) return <Navigate to="/admin/login" />;

  return children;
};

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<Courses />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="campus-life" element={<CampusLife />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="admission-process" element={<AdmissionProcess />} />
          <Route path="apply" element={<ApplyNow />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard Routes (Protected) */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="leads" element={<LeadsManagement />} />
          <Route path="upload" element={<BulkUpload />} />
          <Route path="campaigns" element={<CampaignPanel />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
