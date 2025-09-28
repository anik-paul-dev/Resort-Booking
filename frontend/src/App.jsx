import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { AppProvider } from './context/AppContext.jsx';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import PrivateRoute from './components/common/PrivateRoute.jsx';
import AdminRoute from './components/common/AdminRoute.jsx';

// Public pages
import Home from './components/public/Home.jsx';
import Rooms from './components/public/Rooms.jsx';
import RoomDetails from './components/public/RoomDetails.jsx';
import Features from './components/public/Features.jsx';
import Facilities from './components/public/Facilities.jsx';
import RoomAvailability from './components/public/RoomAvailability.jsx';
import MenuPackages from './components/public/MenuPackages.jsx';
import Contact from './components/public/Contact.jsx';
import Login from './components/public/Login.jsx';
import Register from './components/public/Register.jsx';
import VerifyEmail from './components/public/VerifyEmail.jsx';
import ForgotPassword from './components/public/ForgotPassword.jsx';
import ResetPassword from './components/public/ResetPassword.jsx';

// User pages
import UserDashboard from './components/user/UserDashboard.jsx';
import UserProfile from './components/user/UserProfile.jsx';
import UserBookings from './components/user/UserBookings.jsx';
import BookingReceipt from './components/user/BookingReceipt.jsx';

// Admin pages
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import ManageRooms from './components/admin/ManageRooms.jsx';
import ManageUsers from './components/admin/ManageUsers.jsx';
import ManageFeatures from './components/admin/ManageFeatures.jsx';
import ManageFacilities from './components/admin/ManageFacilities.jsx';
import ManageCarousel from './components/admin/ManageCarousel.jsx';
import ManageQueries from './components/admin/ManageQueries.jsx';
import ManageReviews from './components/admin/ManageReviews.jsx';
import Settings from './components/admin/Settings.jsx';

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