require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.port || 5677;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());


mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => {
    console.log(error);
});

db.once("open", () => {
    console.log("Connected to emps database");
});

//  Add middleware
app.use(express.json());

const employeeRouter = require('./controllers/employeeController');
app.use('/employees', employeeRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});