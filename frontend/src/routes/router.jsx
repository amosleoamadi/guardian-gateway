import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/auth/Login";
import VerifyOtp from "../pages/auth/VerifyOtp";
import MyCourses from "../pages/dashboard/MyCourses";
import ExamResults from "../pages/dashboard/ExamResult";
import TuitionFees from "../pages/dashboard/TuitionFees";
import Profile from "../pages/dashboard/Profile";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/Dashboard";

export const Routing = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication Flow */}
        <Route path="" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Main Portal Pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="results" element={<ExamResults />} />
          <Route path="fees" element={<TuitionFees />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
