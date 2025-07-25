const Job = require("../models/jobModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.submitApplication = async (req, res) => {
  try {
    const { jobId, name, email, cvUrl } = req.body;
    const file = req.file;
    let cvLink = "";

    if (!jobId || !name || !email || !(file || cvUrl)) {
      return res.status(400).json({
        message:
          "Missing required fields: name, email, jobId and CV Url or file are required.",
      });
    }

    if (file) {
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

      cvLink = result.secure_url;
    } else if (cvUrl) {
      cvLink = cvUrl;
    } else {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide a CV file or a valid CV URL.",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.applicants.push({ name, email, cv: cvLink });
    await job.save();

    if (file) {
      fs.unlinkSync(file.path);
    }

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error", message: err.message });
  }
};
