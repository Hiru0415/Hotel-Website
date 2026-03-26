import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import DineDrink from "./pages/DineDrink";
import Gallery from "./pages/Gallery";
import EnquiryForm from "./pages/EnquiryForm";
import ContactUs from "./pages/ContactUS";
import Careers from "./pages/Careers";
import Facilities from "./pages/Facilities";
import SpecialOccasions from "./pages/SpecialOccasions";
import Meetings from "./pages/Meetings";
import Colombo from "./pages/Colombo";
import Blog from "./pages/Blog";
import Offers from "./pages/Offers";
import OfferDetails from "./pages/OfferDetails";
import BlogDetails from "./pages/BlogDetails";
import OurStory from "./pages/OurStory";
import GalleryDetails from "./pages/GalleryDetails";
// Admin imports
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BookingsManagement from "./pages/admin/BookingsManagement";
import InquiriesManagement from "./pages/admin/InquiriesManagement";
import MeetingEnquiriesManagement from "./pages/admin/MeetingEnquiriesManagement";
import RoomsManagement from "./pages/admin/RoomsManagement";
import OffersManagement from "./pages/admin/OffersManagement";
import BlogsManagement from "./pages/admin/BlogsManagement";
import CareersManagement from "./pages/admin/CareersManagement";
import AdminsManagement from "./pages/admin/AdminsManagement";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/dine" element={<DineDrink />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/enquiry" element={<EnquiryForm />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/special" element={<SpecialOccasions />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/colombo" element={<Colombo />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offers/:identifier" element={<OfferDetails />} />
        <Route path="/blog/:identifier" element={<BlogDetails />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/gallery/:category" element={<GalleryDetails />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<BookingsManagement />} />
          <Route path="inquiries" element={<InquiriesManagement />} />
          <Route path="meeting-enquiries" element={<MeetingEnquiriesManagement />} />
          <Route path="rooms" element={<RoomsManagement />} />
          <Route path="offers" element={<OffersManagement />} />
          <Route path="blogs" element={<BlogsManagement />} />
          <Route path="careers" element={<CareersManagement />} />
          <Route path="admins" element={<AdminsManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
