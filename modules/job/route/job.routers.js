// routes/job.routes.js
const express = require('express');
const router = express.Router();

const JobController = require('../../job/controler/job.controler');

// Create a new job
router.post('/create', JobController.createJob);

// For Bulk

router.post('/bulk-create', JobController.bulkCreateJobs);

// Get all jobs
router.get('/', JobController.getAllJobs);

// Get a single job by ID
router.get('/:id', JobController.getJobById);

// Update a job
router.put('/:id', JobController.updateJob);

// Delete a job
router.delete('/:id', JobController.deleteJob);

module.exports = router;
