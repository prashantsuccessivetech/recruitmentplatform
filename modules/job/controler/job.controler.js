// controllers/job.controller.js

const Job = require('../../job/model/job.model');


// Create a new job
const createJob = async (req, res) => {
    const { title, description, companyId, location, salary, jobType } = req.body;

    try {
        // Create a new job
        const newJob = new Job({ title, description, companyId, location, salary, jobType });
        await newJob.save();

        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        res.status(500).json({ message: 'Error creating job', error });
    }
};

const bulkCreateJobs = async (req, res) => {
    const jobs = req.body; // Expecting an array of job objects

    if (!Array.isArray(jobs) || jobs.length === 0) {
        return res.status(400).json({ message: 'Please provide an array of jobs to create.' });
    }

    try {
        // Insert all jobs in bulk
        const newJobs = await Job.insertMany(jobs);

        res.status(201).json({ message: 'Jobs created successfully', jobs: newJobs });
    } catch (error) {
        res.status(500).json({ message: 'Error creating jobs', error });
    }
};


// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('companyId', 'name email'); // Populate company details
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error });
    }
};

// Get a single job by ID
const getJobById = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id).populate('companyId', 'name email');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job', error });
    }
};

// Update a job
const updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, description, location, salary, jobType } = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { title, description, location, salary, jobType },
            { new: true, runValidators: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: 'Error updating job', error });
    }
};

// Delete a job
const deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job', error });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    bulkCreateJobs
};
