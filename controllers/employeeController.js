const express = require('express');
const employeeRouter  = express.Router();
const Employee = require('../models/employeeModel');

//////////////////////////////////////////////////
// GET All:      http://localhost:5677/employee
//////////////////////////////////////////////////
employeeRouter.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.json(employees);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

//////////////////////////////////////////////////
// GET One:      http://localhost:5677/employees/id
//////////////////////////////////////////////////
employeeRouter.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee);
});

//////////////////////////////////////////////////
// POST CREATE:  http://localhost:5677/employees
//////////////////////////////////////////////////
employeeRouter.post('/', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        department: req.body.department,
        salary: req.body.salary,
        hireDate: req.body.hireDate
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee)
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
});

//////////////////////////////////////////////////
// PUT:        http://localhost:5678/employees/id
//////////////////////////////////////////////////
employeeRouter.put('/:id', getEmployee, async (req, res) => {
    if (req.body.name === null) {}
    else {
        res.employee.name = req.body.name;
    }

    if (req.body.department === null) {}
    else {
        res.employee.department = req.body.department;
    }

    if (req.body.salary === null) {}
    else {
        res.employee.salary = req.body.salary;
    }

    if (req.body.hireDate === null) {}
    else {
        res.employee.hireDate = req.body.hireDate;
    }

    try {
        const updatedEmployee = await res.employee.save();
        res.json(updatedEmployee);
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
});

//////////////////////////////////////////////////
// DELETE:       http://localhost:5678/employees/id
//////////////////////////////////////////////////
employeeRouter.delete('/:id', getEmployee, async (req, res) => {
    try {
        await res.employee.remove()
        res.json({ message: "Employee Deleted" });
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id);
        if (employee === null) {
            return res.status(404).json({ message: 'Cannot find that employee' });
        }
    }
    catch(err) {
        return res.status(500).json({ message: err.message });
    }
    
    res.employee = employee;
    next();
}

module.exports = employeeRouter; 