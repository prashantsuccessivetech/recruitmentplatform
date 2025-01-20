const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    location: { type: String, required: true },
    salary: { 
        type: Number, 
        required: true, 
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'Salary must be a positive number'
        }
    },
    jobType: { 
        type: String, 
        enum: ['Full-Time', 'Part-Time', 'Contract'], 
        required: true, 
        default: 'Full-Time' 
    },
}, { 
    timestamps: true 
});

// Indexes
jobSchema.index({ title: 1, location: 1 });

// Virtuals
jobSchema.virtual('jobDetails').get(function() {
    return `${this.title} - ${this.location}`;
});
jobSchema.set('toJSON', { virtuals: true });

// Middleware
jobSchema.pre('save', function(next) {
    console.log(`Job titled "${this.title}" is being created or updated.`);
    next();
});

module.exports = mongoose.model('Job', jobSchema);
