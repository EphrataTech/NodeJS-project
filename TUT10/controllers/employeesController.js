const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'model', 'employees.json');
const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };

    // Check if both names are provided
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ message: 'First and last names are required.' });
    }

    // Update in-memory data
    const updatedEmployees = [...data.employees, newEmployee];
    data.setEmployees(updatedEmployees);

    // Write to JSON file
    fs.writeFile(dataPath, JSON.stringify(updatedEmployees, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to save new employee' });
        }

        // ✅ Respond with 201 Created and full list
        res.status(201).json(updatedEmployees);
    });
};

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
    const id = parseInt(req.body.id);
    const employee = data.employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(400).json({ message: `Employee ID ${id} not found` });
    }

    const filteredArray = data.employees.filter(emp => emp.id !== id);
    data.setEmployees(filteredArray);

    // ✅ Write the updated array to the employees.json file
    fs.writeFile(filePath, JSON.stringify(filteredArray, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error writing file' });
        }

        res.json(filteredArray); // Respond after saving
    });
};

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}