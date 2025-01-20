'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value.toString().length === 10,
            message: "Mobile no. must be 10 digits",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: "Please enter a valid email address",
        },
    },
}, { timestamps: true });

module.exports = mongoose.model('Admin', authSchema, 'Admin');
