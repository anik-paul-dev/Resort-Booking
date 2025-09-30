// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Facilities from './pages/Facilities';
import Features from './pages/Features';
import Contact from './pages/Contact';
import RoomAvailability from './pages/RoomAvailability';
import MenuPackages from './pages/MenuPackages';
import About from './pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminRegister from './components/auth/AdminRegister';
import AdminLayout from './pages/AdminLayout';
import UserLayout from './pages/UserLayout';
import PrivateRoute from './components/common/PrivateRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import RoomManagement from './components/admin/RoomManagement';
import FeatureManagement from './components/admin/FeatureManagement';
import FacilityManagement from './components/admin/FacilityManagement';
import CarouselManagement from './components/admin/CarouselManagement';
import UserManagement from './components/admin/UserManagement';
import ReviewManagement from './components/admin/ReviewManagement';
import QueryManagement from './components/admin/QueryManagement';
import Settings from './components/admin/Settings';
import UserDashboard from './components/user/UserDashboard';
import UserProfile from './components/user/UserProfile';
import BookingHistory from './components/user/BookingHistory';
import BookingDetails from './components/user/BookingDetails';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/availability" element={<RoomAvailability />} />
          <Route path="/menu" element={<MenuPackages />} />
          <Route path="/about" element={<About />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="rooms" element={<RoomManagement />} />
            <Route path="features" element={<FeatureManagement />} />
            <Route path="facilities" element={<FacilityManagement />} />
            <Route path="carousel" element={<CarouselManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="reviews" element={<ReviewManagement />} />
            <Route path="queries" element={<QueryManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* User Routes */}
          <Route 
            path="/user" 
            element={
              <PrivateRoute requiredRole="user">
                <UserLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="bookings" element={<BookingHistory />} />
            <Route path="bookings/:id" element={<BookingDetails />} />
            <Route path="reviews" element={<UserDashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;