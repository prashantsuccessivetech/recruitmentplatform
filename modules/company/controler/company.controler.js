// controllers/company.controller.js
// const Company = require('../models/Company');

const Company = require('../../company/model/company.model');


// Create a new company
const createCompany = async (req, res) => {
    const { name, email, address, phoneNumber, industry, website } = req.body;

    try {
        // Check if the company already exists
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company with this email already exists' });
        }

        // Create a new company
        const newCompany = new Company({ name, email, address, phoneNumber, industry, website });
        await newCompany.save();

        res.status(201).json({ message: 'Company created successfully', company: newCompany });
    } catch (error) {
        res.status(500).json({ message: 'Error creating company', error });
    }
};

const bulkCreateCompanies = async (req, res) => {
    const companies = req.body; // Expecting an array of company objects

    if (!Array.isArray(companies) || companies.length === 0) {
        return res.status(400).json({ message: 'Please provide an array of companies to create.' });
    }

    try {
        // Validate and check for duplicates in the provided data
        const emails = companies.map(company => company.email);
        const existingCompanies = await Company.find({ email: { $in: emails } });

        if (existingCompanies.length > 0) {
            const existingEmails = existingCompanies.map(company => company.email);
            return res.status(400).json({
                message: 'Some companies with these emails already exist',
                existingEmails
            });
        }

        // Insert all companies in bulk
        const newCompanies = await Company.insertMany(companies);

        res.status(201).json({ message: 'Companies created successfully', companies: newCompanies });
    } catch (error) {
        res.status(500).json({ message: 'Error creating companies', error });
    }
};


// Get all companies
const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching companies', error });
    }
};

// Get a single company by ID
const getCompanyById = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching company', error });
    }
};

// Update a company
const updateCompany = async (req, res) => {
    const { id } = req.params;
    const { name, email, address, phoneNumber, industry, website } = req.body;

    try {
        const updatedCompany = await Company.findByIdAndUpdate(
            id,
            { name, email, address, phoneNumber, industry, website },
            { new: true, runValidators: true }
        );

        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
    } catch (error) {
        res.status(500).json({ message: 'Error updating company', error });
    }
};

// Delete a company
const deleteCompany = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCompany = await Company.findByIdAndDelete(id);

        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting company', error });
    }
};

module.exports = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
    bulkCreateCompanies
};
