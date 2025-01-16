// models/Company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    industry: { type: String, required: true },
    website: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
