// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema(
//     {
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         role: {
//             type: String,
//             enum: ['Employer', 'JobSeeker'],
//             required: true,
//         },
//         contactNumber: { type: String, required: true },
//         profile: {
//             company: { type: String }, // For Employers
//             jobTitle: { type: String }, // For Employers
//             jobPreferences: { type: String }, // For Job Seekers
//         },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['Employer', 'JobSeeker'],
            required: true,
        },
        contactNumber: { type: String, required: true },
        profile: {
            name: { type: String }, // For Job Seekers
            skills: { type: [String] }, // Array of skills for Job Seekers
            company: { type: String }, // For Employers
            jobTitle: { type: String }, // For Employers
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

