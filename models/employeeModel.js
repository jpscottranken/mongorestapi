const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String
    },
    salary: {
        type: Number
    },
    hireDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', employeeSchema);