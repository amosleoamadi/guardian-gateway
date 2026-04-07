import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Student from "./models/student.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️ Incoming request: ${req.method} ${req.url}`);
  next();
});

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to Database"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ==================== BREVO SETUP ====================
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// ==================== ROUTES ====================

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "ESTAM Backend API is running!",
    status: "active",
    timestamp: new Date().toISOString(),
  });
});

// LOGIN ROUTE (SEND OTP)
app.post("/login", async (req, res) => {
  try {
    const { email, matricNo } = req.body;

    if (!email || !matricNo) {
      return res
        .status(400)
        .json({ message: "Email and Matric Number are required" });
    }

    const student = await Student.findOne({
      email: email.trim(),
      matricNo: matricNo.trim(),
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    student.otp = generatedOtp;
    await student.save();

    // Respond immediately
    res.json({ success: true, message: "OTP sent!", email: student.email });

    // Send email via Brevo API (non-blocking)
    emailApi
      .sendTransacEmail({
        sender: {
          email: process.env.EMAIL_USER, // MUST be verified in Brevo
          name: "ESTAM Portal",
        },
        to: [{ email: student.email }],
        subject: "Your OTP Code",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #ff9800;">Welcome to ESTAM Portal</h2>
            <p>Your OTP code is:</p>
            <h1 style="font-size: 32px; letter-spacing: 5px; color: #333;">${generatedOtp}</h1>
            <p>This code expires after use.</p>
          </div>
        `,
      })
      .then(() => console.log("✅ OTP email sent"))
      .catch((err) => console.error("❌ Email error:", err));
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    res.status(500).json({
      message: "Error sending OTP",
      error: error.message,
    });
  }
});

// VERIFY OTP
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const student = await Student.findOne({
      email: email.trim(),
      otp: otp.trim(),
    });

    if (!student) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    student.otp = null;
    await student.save();

    res.json({
      success: true,
      message: "Login successful",
      email: student.email,
      matricNo: student.matricNo,
      name: student.name,
    });
  } catch (error) {
    console.error("❌ VERIFY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// RESEND OTP
app.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const student = await Student.findOne({ email: email.trim() });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    student.otp = generatedOtp;
    await student.save();

    // Respond immediately
    res.json({
      success: true,
      message: "New OTP sent successfully!",
    });

    // Send email via Brevo API
    emailApi
      .sendTransacEmail({
        sender: {
          email: process.env.EMAIL_USER,
          name: "ESTAM Portal",
        },
        to: [{ email: student.email }],
        subject: "Your New OTP Code",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #ff9800;">New OTP Code</h2>
            <p>You requested a new OTP code. Here is your new code:</p>
            <h1 style="font-size: 32px; letter-spacing: 5px; color: #333;">${generatedOtp}</h1>
            <p>This code will expire after use.</p>
          </div>
        `,
      })
      .then(() => console.log("✅ Resend OTP email sent"))
      .catch((err) => console.error("❌ Resend email error:", err));
  } catch (error) {
    console.error("❌ RESEND ERROR:", error);
    res.status(500).json({
      message: "Error resending OTP",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
