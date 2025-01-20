const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const envFound = dotenv.config();

const User = require('../../User/model/user.model')

const registerUser = async (req, res) => {
    const { email, password, role, contactNumber, name, skills, companyName, jobTitle } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Validate role
        if (!['Employer', 'JobSeeker'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        // Validate required fields for JobSeekers
        if (role === 'JobSeeker') {
            if (!name) {
                return res.status(400).json({ message: 'Name is required for JobSeekers' });
            }
            if (!skills || !Array.isArray(skills) || skills.length === 0) {
                return res.status(400).json({ message: 'At least one skill is required for JobSeekers' });
            }
        }

        // Validate required fields for Employers
        if (role === 'Employer') {
            if (!companyName) {
                return res.status(400).json({ message: 'Company name is required for Employers' });
            }
            // if (!jobTitle) {
            //     return res.status(400).json({ message: 'Job title is required for Employers' });
            // }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            contactNumber,
            profile: {
                ...(role === 'JobSeeker' && { name, skills }),
                ...(role === 'Employer' && { company: companyName, jobTitle }),
            },
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const redirectUrl = user.role === 'Employer' ? '/employer/dashboard' : '/jobseeker/dashboard';

        res.json({ message: 'Login successful', token, redirectUrl });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};




module.exports = { registerUser, loginUser };
