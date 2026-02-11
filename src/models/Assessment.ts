import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctIndex: { type: Number, required: true },
});

const assessmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  duration: { type: Number, required: true }, // in minutes
  description: { type: String },
  type: { type: String, enum: ['MCQ', 'Coding', 'Mixed'] },
  questions: [questionSchema],
});

assessmentSchema.virtual('questionCount').get(function() {
  return this.questions.length;
});

export default mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);
