const Job = require("../models/jobModel");

exports.submitApplication = async (req, res) => {
  try {
    const { jobId, name, email, cv } = req.body;

    if (!jobId || !name || !email || !cv) {
      return res.status(400).json({
        message:
          "Missing required fields: name, email, Job Id and CV Url are required.",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.applicants.push({ name, email, cv });
    await job.save();

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};
