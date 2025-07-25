const Job = require("../models/jobModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.submitApplication = async (req, res) => {
  try {
    const { jobId, name, email } = req.body;
    const file = req.file;

    if (!jobId || !name || !email || !file) {
      return res.status(400).json({
        message:
          "Missing required fields: name, email, jobId and CV file are required.",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "job-cvs",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      fs.createReadStream(file.path).pipe(uploadStream);
    });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.applicants.push({ name, email, cv: result.secure_url });
    await job.save();

    fs.unlinkSync(file.path);

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};
