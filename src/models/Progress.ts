import mongoose, { Schema, models } from "mongoose";

const ProblemSchema = new Schema(
  {
    level: { type: Number, required: true },
    problem: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { _id: false }
);

const ProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  completedProblems: [ProblemSchema], // Array of completed problems
});

export default models.Progress || mongoose.model("Progress", ProgressSchema);
