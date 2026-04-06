import React, { useState } from "react";
import logo from "../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [matricNo, setMatricNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // API URL - make it configurable
  const API_BASE_URL = "https://guardian-gateway-backend.onrender.com";

  // Validation function
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!matricNo.trim()) {
      setError("Matric number is required");
      return false;
    }
    if (matricNo.trim().length < 5) {
      setError("Please enter a valid matric number");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        matricNo,
      });

      const data = response;

      if (response.status === 200) {
        navigate("/verify-otp", { state: { email: email.trim() } });
      } else {
        setError(data.data.message || "Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      console.error("Login error:", err);

      if (err.response) {
        // Backend responded with error
        setError(err.response.data.message || "Something went wrong");
      } else if (err.request) {
        // Request sent but no response
        setError("No response from server. Check backend.");
      } else {
        setError("Request error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6 bg-white p-8 rounded-xl shadow-2xl"
        >
          <div className="flex flex-col items-center">
            <img src={logo} alt="ESTAM Logo" className="h-24 w-auto mb-4" />
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Student Portal Login
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter University Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-4 border-[1.5px] border-gray-300 rounded-lg text-base bg-gray-50 outline-none transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter Matric Number"
                value={matricNo}
                onChange={(e) => setMatricNo(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-4 border-[1.5px] border-gray-300 rounded-lg text-base bg-gray-50 outline-none transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-orange-500 text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 mt-2.5 hover:bg-orange-600 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Get Access Code"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
