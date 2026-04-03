import mongoose from "mongoose";
import dotenv from "dotenv";
import student from "./models/student.js";

dotenv.config();

const students = [
  {
    email: "dealing467@gmail.com",
    matricNo: "ESTAM/2026/102",
    name: "Dealing Student",
  },
  {
    email: "john.doe@estam.edu",
    matricNo: "ESTAM/2026/103",
    name: "John Doe",
  },
  {
    email: "amadiamos146@gmail.com",
    matricNo: "ESTAM/2026/104",
    name: "Amadi Amos",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to Database for seeding...");

    let added = 0;
    let updated = 0;

    for (const studentData of students) {
      const result = await student.updateOne(
        { email: studentData.email },
        { $set: studentData },
        { upsert: true },
      );

      if (result.upsertedCount > 0) {
        added++;
      } else if (result.modifiedCount > 0) {
        updated++;
      }
    }

    console.log(`✅ Seeding completed! Added: ${added}, Updated: ${updated}`);

    // Display all students in database
    const allStudents = await student.find({});
    console.log("\n📚 Current students in database:");
    allStudents.forEach((s) => {
      console.log(`   - ${s.name || "No name"} (${s.email})`);
    });
  } catch (error) {
    console.error("❌ Seeding error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from database");
    process.exit();
  }
};

seedDatabase();
