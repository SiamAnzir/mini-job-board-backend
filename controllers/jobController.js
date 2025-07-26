const Job = require("../models/jobModel");

exports.getJobs = async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
};

exports.getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

exports.postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      requiredSkills,
      responsibilities,
      experience,
      education,
      additionalRequirements,
      salary,
      location,
      benefits,
      deadline,
    } = req.body;
    const job = new Job({
      title,
      description,
      company,
      requiredSkills,
      responsibilities,
      experience,
      education,
      additionalRequirements,
      salary,
      location,
      benefits,
      deadline,
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create job", error: err.message });
  }
};
