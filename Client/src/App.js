import "./App.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    dob: new Date(),
    employeeId: "",
    address: "",
    gender: "Male",
    department: "",
    basicSalary: 0,
  });
  const [absentDays, setAbsentDays] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [CalculatedSalary, setCalculatedSalary] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8000/api/employees");
  }, []);

const handleChange = (e) => {
  const {name,value} = e.target;
  setEmployeeData({...employeeData,[name]: value})
}
const handleDateChange = (date) => {
  setEmployeeData({...employeeData, dob:date})
}
const handleSubmit = () => {
  axios.post('http://localhost:8000/api/employees', employeeData)
    .then(response => {
      console.log(response.data.message);
      setEmployees([...employees, employeeData]);
      setEmployeeData({
        name: '',
        dob: new Date(),
        employeeId: '',
        address: '',
        gender: '',
        department: '',
        basicSalary: 0,
      });
    })
    .catch(error => console.error('Error registering employee:', error));
};
 
const handleCalculateSalary = () => {
  
  const salary = employeeData.basicSalary - (absentDays * 50);
  setCalculatedSalary(salary);
};

  return (
    <div className="App">
      <h1> Employee Registration</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="fromName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={employeeData.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fromDob">
              <Form.Label>Dob</Form.Label>
              <Form.Control
                selected={employeeData.name}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy"
              />
            </Form.Group>
          </Col>
         </Row> 
         <Row>
          <Col>
            <Form.Group controlId="fromEmployeeId">
              <Form.Label>EmploeeId</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter id"
                name="employeeId"
                value={employeeData.employeeId}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fromAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                name="address"
                value={employeeData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
         </Row> 
         <Row>
          <Col>
            <Form.Group controlId="fromGender">
              <Form.Label>Gender</Form.Label>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                value="Male"
                checked={employeeData.gender === 'Male'}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="female"
                name="gender"
                Value="female"
                checked={employeeData.gender === 'female'}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fromDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"  
                name="department"
                value={employeeData.department}
                onChange={handleChange}
              />
              <option value=""> Select Department</option>
              <option value="HR"> HR</option>
              <option value="IT"> IT</option>
              <option value="Finance"> Finance</option>
            </Form.Group>
          </Col>
         </Row>
         <Row> 
          <Col>
            <Form.Group controlId="fromName">
              <Form.Label>BasicSalary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter basicSalary"
                name="name"
                value={employeeData.basicSalary}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="Submit">Register</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>dob</th>
            <th>Employee Id</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Department</th>
            <th>BasicSalary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.dob}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.address}</td>
              <td>{employee.gender}</td>
              <td>{employee.department}</td>
              <td>{employee.basicSalary}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
