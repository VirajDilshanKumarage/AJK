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
  const [nicNumberSave,setNicNumberSave] = useState('');
  const [firstNameSave,setFirstNameSave] = useState('');
  const [lastNameSave,setLastNameSave] = useState('');
  const [emailAddressSave,setEmailAddressSave] = useState('');
  const [mobileNumberSave,setMobileNumberSave] = useState('');
  const [dateOfBirthSave,setDateOfBirthSave] = useState(null);
  const [genderSave,setGenderSave] = useState('');
  const [salarySave,setSalarySave] = useState(0);
  const [departmentIdSave,setDepartmentIdSave] = useState(0);

  //edit employee data
  const [nicNumberEdit,setNicNumberEdit] = useState('');
  const [firstNameEdit,setFirstNameEdit] = useState('');
  const [lastNameEdit,setLastNameEdit] = useState('');
  const [emailAddressEdit,setEmailAddressEdit] = useState('');
  const [mobileNumberEdit,setMobileNumberEdit] = useState('');
  const [dateOfBirthEdit,setDateOfBirthEdit] = useState(null);
  const [genderEdit,setGenderEdit] = useState('');
  const [salaryEdit,setSalaryEdit] = useState(0);
  const [departmentIdEdit,setDepartmentIdEdit] = useState(0);

  //here I create the cons to store the employee id that wanted to update it set in handleEdit() and then use the value in hadleUpdate()
  const [empID , setEmpID] =useState(0);


  //clear method for adding form
  const clearSave= ()=>{
    setNicNumberSave('');
    setFirstNameSave('');
    setLastNameSave('');
    setEmailAddressSave('');
    setMobileNumberSave('');
    setDateOfBirthSave('')
    setGenderSave('');
    setSalarySave(0);
    setDepartmentIdSave(0);
  }

  //clear method for updating form
  const clearEdit= ()=>{
    setNicNumberEdit('');
    setFirstNameEdit('');
    setLastNameEdit('');
    setEmailAddressEdit('');
    setMobileNumberEdit('');
    setDateOfBirthEdit('')
    setGenderEdit('');
    setSalaryEdit(0);
    setDepartmentIdEdit(0);
  }


  


  const [employeeData, setEmployeeData] = useState([]);

  //fetching all employees
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
          "nicNumber": nicNumberSave,
          "firstName": firstNameSave,
          "lastName": lastNameSave,
          "emailAddress": emailAddressSave,
          "mobileNumber": mobileNumberSave,
          "dateOfBirth": dateOfBirthSave,
          "gender": genderSave,
          "salary": salarySave,
          "departmentId": departmentIdSave
        }
        console.log(data); // just render data in console
        axios.post(post_url,data)
        .then((result)=>{
          fetchEmployeeData();
          handleCloseAdd();
          clearSave();
        })
  }


  //editing just open the updat modal and fill the current data
  const handleEdit = (_employeeId)=>{ 
    
     handleShowEdit();
     setEmpID(_employeeId); //set the empID to use in handleUpdate() 

    const getAllEmployeeById =(_employeeId)=>{
      const getById_url =`http://localhost:5148/api/Employees/getEmployeeById/${_employeeId}`;

      axios.get(getById_url)
      .then((result) => {

        console.log(result.data);// just see data form console
        const employee = result.data;
        setNicNumberEdit(employee.nicNumber);
        setFirstNameEdit(employee.firstName);
        setLastNameEdit(employee.lastName);
        setEmailAddressEdit(employee.emailAddress);
        setMobileNumberEdit(employee.mobileNumber);
        setDateOfBirthEdit(new Date(employee.dateOfBirth));
        setGenderEdit(employee.gender); // Fix: Use setGender instead of setDateOfBirth
        setSalaryEdit(employee.salary);
        setDepartmentIdEdit(employee.departmentName); // Fix: Use setDepartment instead of setEmailAddress
      })
    }

    getAllEmployeeById(_employeeId);  
    
    
  }


  //handle update this is the fuction to update data in database
  const handleUpdate=()=>{

      
      const UpdateEmployee =(_employeeId)=>{
      const put_url = `http://localhost:5148/api/Employees/updateEmployee/${_employeeId}`;
  
      const updatedData={
        
          "nicNumber": nicNumberEdit,
          "firstName": firstNameEdit,
          "lastName": lastNameEdit,
          "emailAddress": emailAddressEdit,
          "mobileNumber": mobileNumberEdit,
          "dateOfBirth": dateOfBirthEdit,
          "gender": genderEdit,
          "salary": salaryEdit,
          "departmentId": departmentIdEdit
        
      }
       
      console.log(updatedData);
  
      axios.put(put_url,updatedData)
      .then((result)=>{
          fetchEmployeeData();
          clearEdit();
      })
      }
  
      UpdateEmployee(empID);
      handleCloseEdit();
      setEmpID(0); // once update is complete then reset the empID

  }



  // define a const for set the employee id that I need to delete
  const [empIDToDelete,setempIDToDelete] =useState(0);
  //deleting 
  const handleDelete = ()=>{
      const delete_url =`http://localhost:5148/api/Employees/deleteEmployee/${empIDToDelete}`; 
      axios.delete(delete_url)
      .then((result)=>{
          console.log(result);
          fetchEmployeeData();
          setempIDToDelete(0); // reset the employeeIDToDelete
          handleCloseDelete();
      })
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
                  <Button variant="danger" onClick={() => {setempIDToDelete(employee.employeeId); handleShowDelete()}}>Delete</Button>
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
                    id="nicEdit"
                    aria-describedby="nicHelpBlock"
                    value={nicNumberEdit}
                    onChange={(e)=>setNicNumberEdit(e.target.value)}
                  />
                  <br></br>

                  <Form.Label htmlFor="firstname">firstName</Form.Label>
                  <Form.Control
                    type="text"
                    id="firstNameEdit"
                    aria-describedby="firstNameHelpBlock"
                    value={firstNameEdit}
                    onChange={(e)=>setFirstNameEdit(e.target.value)}
                  />

                  <br></br>

                  <Form.Label htmlFor="lastName">lastName</Form.Label>
                  <Form.Control
                    type="text"
                    id="lastNameEdit"
                    aria-describedby="lastNameHelpBlock"
                    value={lastNameEdit}
                    onChange={(e)=>setLastNameEdit(e.target.value)}
                  />


                  <br></br>
                  <Form.Label htmlFor="email">emailAddress</Form.Label>
                  <Form.Control
                    type="text"
                    id="emailEdit"
                    aria-describedby="emailHelpBlock"
                    value={emailAddressEdit}
                    onChange={(e)=>setEmailAddressEdit(e.target.value)}
                  />

                   <br></br>
                  <Form.Label htmlFor="mobile">mobileNumber</Form.Label>
                  <Form.Control
                    type="text"
                    id="mobileEdit"
                    aria-describedby="mobileHelpBlock"
                    value={mobileNumberEdit}
                    onChange={(e)=>setMobileNumberEdit(e.target.value)}
                  />

                  
                  <br></br>
                  <Form.Label htmlFor="DOB">Date of Birth</Form.Label>
                  <div className="input-group">
                    <DatePicker
                      id="DOBEdit"
                      selected={dateOfBirthEdit}
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
                    id="genderEdit"
                    aria-describedby="genderHelpBlock"
                    value={genderEdit}
                    onChange={(e)=>setGenderEdit(e.target.value)}
                  />


                  
                   <br></br>
                  <Form.Label htmlFor="salary">salary</Form.Label>
                  <Form.Control
                    type="text"
                    id="salaryEdit"
                    aria-describedby="salaryHelpBlock"
                    value={salaryEdit}
                    onChange={(e)=>setSalaryEdit(e.target.value)}
                  />

                  
                  <br></br>
                  <Form.Label htmlFor="departmentId">department</Form.Label>
                  <Form.Control
                    type="text"
                    id="departmentIdEdit"
                    aria-describedby="departmentHelpBlock"
                    value={departmentIdEdit}
                    onChange={(e)=>setDepartmentIdEdit(e.target.value)}
                  />
                  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleUpdate()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      
      
      
      {/* delete modal */}
    <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Comfirm the Delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>handleDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>



        {/* add modal */}
    <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                  <Form.Label htmlFor="nic">nic</Form.Label>
                  <Form.Control
                    type="text"
                    id="nicSave"
                    aria-describedby="nicHelpBlock"
                    value={nicNumberSave}
                    onChange={(e)=>setNicNumberSave(e.target.value)}
                  />
                  <br></br>

                  <Form.Label htmlFor="firstname">firstName</Form.Label>
                  <Form.Control
                    type="text"
                    id="firstNameSave"
                    aria-describedby="firstNameHelpBlock"
                    value={firstNameSave}
                    onChange={(e)=>setFirstNameSave(e.target.value)}
                  />

                  <br></br>

                  <Form.Label htmlFor="lastName">lastName</Form.Label>
                  <Form.Control
                    type="text"
                    id="lastNameSave"
                    aria-describedby="lastNameHelpBlock"
                    value={lastNameSave}
                    onChange={(e)=>setLastNameSave(e.target.value)}
                  />


                  <br></br>
                  <Form.Label htmlFor="email">emailAddress</Form.Label>
                  <Form.Control
                    type="text"
                    id="emailSave"
                    aria-describedby="emailHelpBlock"
                    value={emailAddressSave}
                    onChange={(e)=>setEmailAddressSave(e.target.value)}
                  />

                   <br></br>
                  <Form.Label htmlFor="mobile">mobileNumber</Form.Label>
                  <Form.Control
                    type="text"
                    id="mobileSave"
                    aria-describedby="mobileHelpBlock"
                    value={mobileNumberSave}
                    onChange={(e)=>setMobileNumberSave(e.target.value)}
                  />

                  
                  <br></br>
                  <Form.Label htmlFor="DOB">Date of Birth</Form.Label>
                  <div className="input-group">
                    <DatePicker
                      id="DOBSave"
                      selected={dateOfBirthSave}
                      onChange={(date) => setDateOfBirthSave(date)}
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
                    id="genderSave"
                    aria-describedby="genderHelpBlock"
                    value={genderSave}
                    onChange={(e)=>setGenderSave(e.target.value)}
                  />


                  
                   <br></br>
                  <Form.Label htmlFor="salary">salary</Form.Label>
                  <Form.Control
                    type="text"
                    id="salarySave"
                    aria-describedby="salaryHelpBlock"
                    value={salarySave}
                    onChange={(e)=>setSalarySave(e.target.value)}
                  />

                  
                  <br></br>
                  <Form.Label htmlFor="departmentId">department</Form.Label>
                  <Form.Control
                    type="text"
                    id="departmentIdSave"
                    aria-describedby="departmentIdHelpBlock"
                    value={departmentIdSave}
                    onChange={(e)=>setDepartmentIdSave(e.target.value)}
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







