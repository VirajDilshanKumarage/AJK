/* eslint-disable no-undef */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Employee.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker'; // Import the date picker library
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';

function Employee() {

  //add modal
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  //edite modal
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //delete modal
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  //popup the calender
  const datePickerRef = useState(null);

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };


  //save employee data
  const [nicNumber,setNicNumber] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [emailAddress,setEmailAddress] = useState('');
  const [mobileNumber,setMobileNumber] = useState('');
  const [dateOfBirth,setDateOfBirth] = useState(null);
  const [gender,setGender] = useState('');
  const [salary,setSalary] = useState(0);
  const [department,setDepartment] = useState(null);


  //clear method
  const clear= ()=>{
    setNicNumber('');
    setFirstName('');
    setLastName('');
    setEmailAddress('');
    setMobileNumber('');
    setDateOfBirth('')
    setGender('');
    setSalary(0);
    setDepartment(null);
  }


  


  const [employeeData, setEmployeeData] = useState([]);



  //fetching
  const fetchEmployeeData=async ()=>{
        const get_url="http://localhost:5148/api/Employees/getAllEmployees";
        const response = await axios.get(get_url);
        setEmployeeData(response.data);
  }

  useEffect(()=>{
       fetchEmployeeData();
  },[])


 

  //adding
  const handleSave = ()=>{
         

         const post_url ="http://localhost:5148/api/Employees/saveNewEmployee";
         const data = {
          "nicNumber": nicNumber,
          "firstName": firstName,
          "lastName": lastName,
          "emailAddress": emailAddress,
          "mobileNumber": mobileNumber,
          "dateOfBirth": dateOfBirth,
          "gender": gender,
          "salary": salary,
          "departmentId": department
        }
        console.log(data);
        axios.post(post_url,data)
        .then((result)=>{
          fetchEmployeeData();
          clear();
        })
  }


  //editing
  const handleEdit = (_employeeId)=>{
    
    handleShowEdit();
    
  }

  //deleting
  const handleDelete = (_employeeId)=>{
    handleShowDelete();
  }


  return (
    <><div className='Content'>
      <h5>Employee Details</h5> <Button variant="success" onClick={()=>handleShowAdd()}>Add Employee</Button>
      <Table striped bordered hover className='Table'>
        <thead>
          <tr>
            <th>NIC</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Mobile Number</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Department Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeData && employeeData.length > 0 ?
            employeeData.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.nicNumber}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailAddress}</td>
                <td>{employee.mobileNumber}</td>
                <td>{new Date(employee.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                <td>{employee.age}</td>
                <td>{employee.gender}</td>
                <td>{employee.salary.toFixed(2)}</td>
                <td>{employee.departmentName}</td>
                <td colSpan={2}>
                  <Button variant="primary" onClick={() => handleEdit(employee.employeeId)}>Edit</Button> &nbsp;
                  <Button variant="danger" onClick={() => handleDelete(employee.employeeId)}>Delete</Button>
                </td>
              </tr>
            ))
            :
            "Loading..."}
        </tbody>
      </Table>
    </div>
    
    {/* edit modal */}
    <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Label htmlFor="nic">nic</Form.Label>
                  <Form.Control
                    type="text"
                    id="nic"
                    aria-describedby="nicHelpBlock"
                    value={nicNumber}
                    onChange={(e)=>setNicNumber(e.target.value)}
                  />
                  <br></br>

                  <Form.Label htmlFor="firstname">firstName</Form.Label>
                  <Form.Control
                    type="text"
                    id="firstName"
                    aria-describedby="firstNameHelpBlock"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                  />

                  <br></br>

                  <Form.Label htmlFor="lastName">lastName</Form.Label>
                  <Form.Control
                    type="text"
                    id="lastName"
                    aria-describedby="lastNameHelpBlock"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                  />


                  <br></br>
                  <Form.Label htmlFor="email">emailAddress</Form.Label>
                  <Form.Control
                    type="text"
                    id="email"
                    aria-describedby="emailHelpBlock"
                    value={emailAddress}
                    onChange={(e)=>setEmailAddress(e.target.value)}
                  />

                   <br></br>
                  <Form.Label htmlFor="mobile">mobileNumber</Form.Label>
                  <Form.Control
                    type="text"
                    id="mobile"
                    aria-describedby="mobileHelpBlock"
                    value={mobileNumber}
                    onChange={(e)=>setMobileNumber(e.target.value)}
                  />

                  
                  <br></br>
                  <Form.Label htmlFor="DOB">Date of Birth</Form.Label>
                  <div className="input-group">
                    <DatePicker
                      id="DOB"
                      selected={dateOfBirth}
                      onChange={(date) => setDateOfBirth(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      ref={datePickerRef}
                    />
                    <div className="input-group-append" onClick={openDatePicker}>
                      <span className="input-group-text">
                        <FaCalendar />
                      </span>
                    </div>
                  </div>
      

                  
                  <br/>
                  <Form.Label htmlFor="gender">gender</Form.Label>
                  <Form.Control
                    type="text"
                    id="gender"
                    aria-describedby="genderHelpBlock"
                    value={gender}
                    onChange={(e)=>setGender(e.target.value)}
                  />


                  
                   <br></br>
                  <Form.Label htmlFor="salary">salary</Form.Label>
                  <Form.Control
                    type="text"
                    id="salary"
                    aria-describedby="salaryHelpBlock"
                    value={salary}
                    onChange={(e)=>setSalary(e.target.value)}
                  />

                  
                  <br></br>
                  <Form.Label htmlFor="departmentId">department</Form.Label>
                  <Form.Control
                    type="text"
                    id="department"
                    aria-describedby="departmentHelpBlock"
                    value={department}
                    onChange={(e)=>setDepartment(e.target.value)}
                  />
                  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      
      
      
      {/* delete modal */}
    <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCloseDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>



        {/* add modal */}
    <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                  <Form.Label htmlFor="nic">nic</Form.Label>
                  <Form.Control
                    type="text"
                    id="nic"
                    aria-describedby="nicHelpBlock"
                    value={nicNumber}
                    onChange={(e)=>setNicNumber(e.target.value)}
                  />
                  <br></br>

                  <Form.Label htmlFor="firstname">firstName</Form.Label>
                  <Form.Control
                    type="text"
                    id="firstName"
                    aria-describedby="firstNameHelpBlock"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                  />

                  <br></br>

                  <Form.Label htmlFor="lastName">lastName</Form.Label>
                  <Form.Control
                    type="text"
                    id="lastName"
                    aria-describedby="lastNameHelpBlock"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                  />


                  <br></br>
                  <Form.Label htmlFor="email">emailAddress</Form.Label>
                  <Form.Control
                    type="text"
                    id="email"
                    aria-describedby="emailHelpBlock"
                    value={emailAddress}
                    onChange={(e)=>setEmailAddress(e.target.value)}
                  />

                   <br></br>
                  <Form.Label htmlFor="mobile">mobileNumber</Form.Label>
                  <Form.Control
                    type="text"
                    id="mobile"
                    aria-describedby="mobileHelpBlock"
                    value={mobileNumber}
                    onChange={(e)=>setMobileNumber(e.target.value)}
                  />

                  
                  <br></br>
                  <Form.Label htmlFor="DOB">Date of Birth</Form.Label>
                  <div className="input-group">
                    <DatePicker
                      id="DOB"
                      selected={dateOfBirth}
                      onChange={(date) => setDateOfBirth(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      ref={datePickerRef}
                    />
                    <div className="input-group-append" onClick={openDatePicker}>
                      <span className="input-group-text">
                        <FaCalendar />
                      </span>
                    </div>
                  </div>
      

                  
                  <br/>
                  <Form.Label htmlFor="gender">gender</Form.Label>
                  <Form.Control
                    type="text"
                    id="gender"
                    aria-describedby="genderHelpBlock"
                    value={gender}
                    onChange={(e)=>setGender(e.target.value)}
                  />


                  
                   <br></br>
                  <Form.Label htmlFor="salary">salary</Form.Label>
                  <Form.Control
                    type="text"
                    id="salary"
                    aria-describedby="salaryHelpBlock"
                    value={salary}
                    onChange={(e)=>setSalary(e.target.value)}
                  />

                  
                  <br></br>
                  <Form.Label htmlFor="departmentId">department</Form.Label>
                  <Form.Control
                    type="text"
                    id="department"
                    aria-describedby="departmentHelpBlock"
                    value={department}
                    onChange={(e)=>setDepartment(e.target.value)}
                  />
                  


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      
      
      
      
      </>
      
      
      
      
      
      
      
    

   
  );
};

export default Employee







