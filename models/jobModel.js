const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    requiredSkills: [String],
    responsibilities: [String],
    experience: { type: String },
    education: { type: String },
    additionalRequirements: { type: String },
    salary: { type: String },
    location: { type: String },
    benefits: { type: String },
    deadline: { type: Date },
    applicants: [
      {
        name: String,
        email: String,
        cv: String,
        appliedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobs", jobSchema);
