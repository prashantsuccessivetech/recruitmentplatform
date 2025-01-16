// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    jobType: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
