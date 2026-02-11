import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment", required: true },
  score: { type: Number, required: true },
  credibilityScore: { type: Number, required: true },
  violations: { type: Number, default: 0 },
  completedAt: { type: Date, default: Date.now },
  assessmentData: { type: String }, // JSON string of answers and timestamps
});

export default mongoose.models.Result || mongoose.model("Result", resultSchema);
