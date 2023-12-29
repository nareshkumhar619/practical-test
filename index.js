const express = require('express')
const app = express();
const port = 8000
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cors = require('cors')

const DATABASE_URL = "mongodb+srv://nareshkumhar619:xmfLhZatD6zGxmaP@cluster0.gtqsaen.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DATABASE_URL , {useNewUrlParser:true , useUnifiedTopology:true})
const db = mongoose.connection
db.on('error',(err)=> console.log(err))
db.once('open', () => console.log('connected to database'))

app.use(cors());
// define employee schema
const EmployeeSchema =new mongoose.Schema({
    name:String,
    dob:Date,
    employeeId:String,
    address:String,
    gender:String,
    department:String,
    basicSalary:String
})
const Employee = mongoose.model('Employee' ,EmployeeSchema )

app.use(bodyParser.json())

// Routes
app.post('/api/employees', async(req,res) => {
    try{
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).send(employee)
    }catch (error) {
        res.status(400).send(error)
    }
});

app.get('/api/employees', async(req,res) => {
    try{
        const employees =await Employee.find()
        res.status(200).send(employees)
    }catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
