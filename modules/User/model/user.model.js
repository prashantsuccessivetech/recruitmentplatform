const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Employer', 'JobSeeker'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
