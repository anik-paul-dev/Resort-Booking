import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

// Public pages
import Home from './components/public/Home';
import Rooms from './components/public/Rooms';
import RoomDetails from './components/public/RoomDetails';
import Features from './components/public/Features';
import Facilities from './components/public/Facilities';
import RoomAvailability from './components/public/RoomAvailability';
import MenuPackages from './components/public/MenuPackages';
import Contact from './components/public/Contact';
import Login from './components/public/Login';
import Register from './components/public/Register';
import VerifyEmail from './components/public/VerifyEmail';
import ForgotPassword from './components/public/ForgotPassword';
import ResetPassword from './components/public/ResetPassword';

// User pages
import UserDashboard from './components/user/UserDashboard';
import UserProfile from './components/user/UserProfile';
import UserBookings from './components/user/UserBookings';
import BookingReceipt from './components/user/BookingReceipt';

// Admin pages
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import ManageRooms from './components/admin/ManageRooms';
import ManageUsers from './components/admin/ManageUsers';
import ManageFeatures from './components/admin/ManageFeatures';
import ManageFacilities from './components/admin/ManageFacilities';
import ManageCarousel from './components/admin/ManageCarousel';
import ManageQueries from './components/admin/ManageQueries';
import ManageReviews from './components/admin/ManageReviews';
import Settings from './components/admin/Settings';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Header />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomDetails />} />
              <Route path="/features" element={<Features />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/room-availability" element={<RoomAvailability />} />
              <Route path="/menu-packages" element={<MenuPackages />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email/:id" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              {/* User Routes */}
              <Route path="/user" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
              <Route path="/user/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="/user/bookings" element={<PrivateRoute><UserBookings /></PrivateRoute>} />
              <Route path="/user/bookings/:id/receipt" element={<PrivateRoute><BookingReceipt /></PrivateRoute>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
              <Route path="/admin/rooms" element={<AdminRoute><AdminLayout><ManageRooms /></AdminLayout></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminLayout><ManageUsers /></AdminLayout></AdminRoute>} />
              <Route path="/admin/features" element={<AdminRoute><AdminLayout><ManageFeatures /></AdminLayout></AdminRoute>} />
              <Route path="/admin/facilities" element={<AdminRoute><AdminLayout><ManageFacilities /></AdminLayout></AdminRoute>} />
              <Route path="/admin/carousel" element={<AdminRoute><AdminLayout><ManageCarousel /></AdminLayout></AdminRoute>} />
              <Route path="/admin/queries" element={<AdminRoute><AdminLayout><ManageQueries /></AdminLayout></AdminRoute>} />
              <Route path="/admin/reviews" element={<AdminRoute><AdminLayout><ManageReviews /></AdminLayout></AdminRoute>} />
              <Route path="/admin/settings" element={<AdminRoute><AdminLayout><Settings /></AdminLayout></AdminRoute>} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;