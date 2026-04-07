import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Student from "./models/student.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️ Incoming request: ${req.method} ${req.url}`);
  next();
});

// ==================== UPDATED CORS FOR RENDER ====================
// Allow multiple origins (your frontend will be added after deployment)
const allowedOrigins = [
  "guardian-gateway-roan.vercel.app", // Your frontend URL (UPDATE AFTER FRONTEND DEPLOY)
  "http://localhost:3000", // React local development
  "http://localhost:5173", // Vite local development
  "http://localhost:5000", // Local backend
  "http://localhost:5174/",
].filter(Boolean);

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

// Email Transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP ERROR:", error);
  } else {
    console.log("✅ SMTP Ready");
  }
});

// ==================== ROUTES ====================

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "ESTAM Backend API is running!",
    status: "active",
    timestamp: new Date().toISOString(),
    cors_enabled_for: allowedOrigins,
  });
});

// Test CORS route
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
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

    res.json({ success: true, message: "OTP sent!", email: student.email });

    transporter.sendMail({
      from: `"ESTAM Portal" <${process.env.EMAIL_USER}>`,
      to: student.email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #ff9800;">Welcome to ESTAM Portal</h2>
          <p>Your OTP code is:</p>
          <h1 style="font-size: 32px; letter-spacing: 5px; color: #333;">${generatedOtp}</h1>
          <p>This code expires after use.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("❌ EMAIL FAILED:", error);
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// RESEND OTP ROUTE
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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: "Your New OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #ff9800;">New OTP Code</h2>
          <p>You requested a new OTP code. Here is your new code:</p>
          <h1 style="font-size: 32px; letter-spacing: 5px; color: #333;">${generatedOtp}</h1>
          <p>This code will expire after use.</p>
          <hr />
          <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: "New OTP sent successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error sending OTP",
      error: error.message, // expose real issue
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for:`, allowedOrigins);
});
