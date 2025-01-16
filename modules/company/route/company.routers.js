// routes/company.routes.js
const express = require('express');
const CompanyController = require('../../company/controler/company.controler');
const router = express.Router();

// POST route to create a company
router.post('/create', CompanyController.createCompany);

// for bulk 

router.post('/bulk-create', CompanyController.bulkCreateCompanies);

router.get('/', CompanyController.getAllCompanies);

// Get a single company by ID
router.get('/:id', CompanyController.getCompanyById);

// Update a company
router.put('/:id', CompanyController.updateCompany);

// Delete a company
router.delete('/:id', CompanyController.deleteCompany);

module.exports = router;
