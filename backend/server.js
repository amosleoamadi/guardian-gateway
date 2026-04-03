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
app.use(
  cors({
    origin: "https://merry-unhilarious-castiel.ngrok-free.dev",
  }),
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to Database"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// LOGIN ROUTE (SEND OTP)
app.post("/login", async (req, res) => {
  try {
    const { email, matricNo } = req.body;

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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
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

    res.json({ success: true, message: "OTP sent!", email: student.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

// VERIFY OTP
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const student = await Student.findOne({
      email: email.trim(),
      otp: otp.trim(),
    });

    if (!student) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // Clear OTP after successful verification
    student.otp = null;
    await student.save();

    res.json({
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
    res.status(500).json({ message: "Error resending OTP" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
