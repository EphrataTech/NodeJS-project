const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController.js');

// Routes for base path: /employees
router.route('/')
    .get(employeeController.getAllEmployees)       // GET all employees
    .post(employeeController.createNewEmployee)    // POST new employee (and return all)
    .put(employeeController.updateEmployee)        // UPDATE employee
    .delete(employeeController.deleteEmployee);    // DELETE employee

// Route for: /employees/:id
router.route('/:id')
    .get(employeeController.getEmployee);          // GET employee by ID

module.exports = router;