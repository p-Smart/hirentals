import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import SignInSelection from "./pages/SignInSelection";
import UserTypeSelection from "./pages/UserTypeSelection";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/admin/Dashboard";
import RenterSignIn from "./pages/RenterSignIn";
import RenterRegister from "./pages/RenterRegister";
import OwnerRegister from "./pages/OwnerRegister";
import OwnerSignIn from "./pages/OwnerSignIn";
import ItemSearch from "./pages/ItemSearch";
import ItemDetail from "./pages/ItemDetail";
import ItemRequests from "./pages/ItemRequests";
import UploadItem from "./pages/UploadItem";
import OwnerReviews from "./pages/OwnerReviews";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<ItemSearch />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reviews" element={<OwnerReviews />} />
            <Route path="/get-started" element={<UserTypeSelection />} />
            <Route path="/signin" element={<SignInSelection />} />
            <Route path="/owner/register" element={<OwnerRegister />} />
            <Route path="/owner/signin" element={<OwnerSignIn />} />
            <Route path="/renter/register" element={<RenterRegister />} />
            <Route path="/renter/signin" element={<RenterSignIn />} />

            <Route path="/item-requests" element={<ItemRequests />} />

            <Route path="/upload-item" element={<UploadItem />} />

            {/* Public Admin Dashboard */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
