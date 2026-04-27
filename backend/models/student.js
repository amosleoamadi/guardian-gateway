import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  matricNo: { type: String, required: true },
  name: {
    type: String,
    required: false,
  },
  otp: String,
});

export default mongoose.model("Student", studentSchema);
