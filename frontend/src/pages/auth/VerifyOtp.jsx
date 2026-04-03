import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);

  // Get email from navigation state (passed from login page)
  useEffect(() => {
    const userEmail = location.state?.email;
    if (!userEmail) {
      navigate("/login");
    } else {
      setEmail(userEmail);
    }
  }, [location, navigate]);

  // Auto-submit when OTP reaches 6 digits
  useEffect(() => {
    if (otp.length === 6 && !loading) {
      handleSubmit(new Event("submit"));
    }
  }, [otp]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateOtp = () => {
    if (!otp.trim()) {
      setError("OTP is required");
      return false;
    }
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return false;
    }
    if (!/^\d+$/.test(otp)) {
      setError("OTP must contain only numbers");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateOtp()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://merry-unhilarious-castiel.ngrok-free.dev/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            otp: otp.trim(),
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userEmail", data.email || email);
        localStorage.setItem("userMatric", data.matricNo || "");
        localStorage.setItem("userName", data.name || "Student");
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError("Server connection failed. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setResending(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://merry-unhilarious-castiel.ngrok-free.dev/resend-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("New OTP sent successfully! Check your email.");
        setCountdown(60); // 60 second cooldown
        setOtp(""); // Clear OTP input
      } else {
        setError(data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      console.error("Resend error:", err);
      setError("Failed to resend OTP. Is your backend running?");
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6 bg-white p-8 rounded-xl shadow-2xl"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-center text-3xl font-extrabold text-orange-700">
              Verify Identity
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              A 6-digit code was sent to:
            </p>
            <p className="mt-1 text-center text-base font-bold text-orange-600">
              {email}
            </p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              disabled={loading}
              className="w-full px-4 py-4 border-[1.5px] border-gray-300 rounded-lg text-base bg-gray-50 outline-none transition-all duration-300 text-center tracking-wider focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 disabled:bg-gray-100 disabled:cursor-not-allowed"
              style={{ letterSpacing: "5px" }}
              autoFocus
            />
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

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
                  Verifying...
                </span>
              ) : (
                "Verify & Login"
              )}
            </button>
          </div>

          {/* Resend OTP Button with Countdown */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resending || countdown > 0}
              className="text-sm text-orange-600 hover:text-orange-700 hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:no-underline"
            >
              {resending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-orange-600"
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
              ) : countdown > 0 ? (
                `Resend OTP in ${countdown}s`
              ) : (
                "Didn't receive the code? Click here to resend"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
