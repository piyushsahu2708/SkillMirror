import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },
    credibilityScore: {
      type: Number,
      default: 0,
    },
    avatarUrl: { type: String },
    headline: { type: String },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
