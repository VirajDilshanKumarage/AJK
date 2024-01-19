/* eslint-disable no-undef */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Employee.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import DatePicker from 'react-datepicker'; // Import the date picker library
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar, FaLeaf } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirectDocument } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Loader from '../../Component/Loader/Loader';

function Employee() {
  /**
   * This function written to handle all the mappings and data validation for for employee model
   */

  /** BEGIN fetchDepartmentData()  */
  const baseUrlDepartment='http://localhost:5148/api/Departments';
  const [departmentData,setDepartmentData]=useState([]);

    const fetchDepartmentData=async ()=>{
      
      try{
      const get_url=`${baseUrlDepartment}/getAllDepartment`; //end point
      const response = await axios.get(get_url);
      setDepartmentData(response.data);
      }catch(error) {
           console.error("Error if fetching employe data",error);
      }
    }

    useEffect(()=>{
      fetchDepartmentData();
    },[])
  /** End fetchDepartmentData()  */





  //base usrl for employee model
  const baseUrlEmployee = 'http://localhost:5148/api/Employees';

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


  //validation const for save form error message
  const [errorMessage,setErrorMessage] = useState('');
  const [errorMessageNIC,setErrorMessageNIC] = useState('');
  const [errorMessageFirstName,setErrorMessageFirstName] = useState('');
  const [errorMessageLastName,setErrorMessageLastName] = useState('');
  const [errorMessageEmailAddress,setErrorMessageEmailAddress] = useState('');
  const [errorMessageMobileNumber,setErrorMessageMobileNumber] = useState('');
  const [errorMessageDateOfBirth,setErrorMessageDateOfBirth] = useState('');
  const [errorMessageGender,setErrorMessageGender] = useState('');
  const [errorMessageSalary,setErrorMessageSalary] = useState('');
  const [errorMessageDepartment,setErrorMessageDepartment] = useState('');
  //clear error messages which in save modal
  const clearErrorMessageSave=()=>{
    setErrorMessage('');
    setErrorMessageNIC('');
    setErrorMessageFirstName('');
    setErrorMessageLastName('');
    setErrorMessageEmailAddress('');
    setErrorMessageMobileNumber('');
    setErrorMessageDateOfBirth('');
    setErrorMessageGender('');
    setErrorMessageSalary('');
    setErrorMessageDepartment('');
  }


   //validation const for edit form error message
   const [errorMessageEdit,setErrorMessageEdit] = useState('');
   const [errorMessageNICEdit,setErrorMessageNICEdit] = useState('');
   const [errorMessageFirstNameEdit,setErrorMessageFirstNameEdit] = useState('');
   const [errorMessageLastNameEdit,setErrorMessageLastNameEdit] = useState('');
   const [errorMessageEmailAddressEdit,setErrorMessageEmailAddressEdit] = useState('');
   const [errorMessageMobileNumberEdit,setErrorMessageMobileNumberEdit] = useState('');
   const [errorMessageDateOfBirthEdit,setErrorMessageDateOfBirthEdit] = useState('');
   const [errorMessageGenderEdit,setErrorMessageGenderEdit] = useState('');
   const [errorMessageSalaryEdit,setErrorMessageSalaryEdit] = useState('');
   const [errorMessageDepartmentEdit,setErrorMessageDepartmentEdit] = useState('');
   //clear error message which in edit model
   const clearErrorMessageEdit=()=>{
    setErrorMessageEdit('');
    setErrorMessageNICEdit('');
    setErrorMessageFirstNameEdit('');
    setErrorMessageLastNameEdit('');
    setErrorMessageEmailAddressEdit('');
    setErrorMessageMobileNumberEdit('');
    setErrorMessageDateOfBirthEdit('');
    setErrorMessageGenderEdit('');
    setErrorMessageSalaryEdit('');
    setErrorMessageDepartmentEdit('');
   }


  //save employee data
  const [nicNumberSave,setNicNumberSave] = useState('');
  const [firstNameSave,setFirstNameSave] = useState('');
  const [lastNameSave,setLastNameSave] = useState('');
  const [emailAddressSave,setEmailAddressSave] = useState('');
  const [mobileNumberSave,setMobileNumberSave] = useState('');
  const [dateOfBirthSave,setDateOfBirthSave] = useState(null);
  const [genderSave,setGenderSave] = useState('');
  const [salarySave,setSalarySave] = useState(0.0);
  const [departmentIdSave,setDepartmentIdSave] = useState(0);

  //edit employee data
  const [nicNumberEdit,setNicNumberEdit] = useState('');
  const [firstNameEdit,setFirstNameEdit] = useState('');
  const [lastNameEdit,setLastNameEdit] = useState('');
  const [emailAddressEdit,setEmailAddressEdit] = useState('');
  const [mobileNumberEdit,setMobileNumberEdit] = useState('');
  const [dateOfBirthEdit,setDateOfBirthEdit] = useState(null);
  const [genderEdit,setGenderEdit] = useState('');
  const [salaryEdit,setSalaryEdit] = useState(0.0);
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
      
        try{
        const get_url=`${baseUrlEmployee}/getAllEmployees`; //end point
        const response = await axios.get(get_url);
        setEmployeeData(response.data);
        }catch(error) {
             console.error("Error if fetching employe data",error);
        }
  }

  useEffect(()=>{
       fetchEmployeeData();
  },[])


 

  //adding
  const handleSave = ()=>{
      
         const post_url =`${baseUrlEmployee}/saveNewEmployee`; // end point
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
        
        clearErrorMessageSave();

        // validation for add for
          function isDataFilled(data) {
            if(data.dateOfBirth==''){
              setErrorMessage("All fields are required");
              return false;
            }
            for (const value of Object.values(data)) {
              if (value === null || value === undefined) {
                 setErrorMessage("All fields are required");
                 return false;
              }
            }
            setErrorMessage('');
            return true;
          }

          function nicValidation(data){

            for (const employee of employeeData) {
              if (employee.nicNumber === data.nicNumber) {
                  setErrorMessageNIC("NIC already used by another employee");
                  return false;
              }
          }

          
            if(data.nicNumber.length===12 || data.nicNumber.length===10){
              setErrorMessageNIC('');
              return true;
            }
            setErrorMessageNIC("Enter a valid nic number");
            return false;
          }


          function firstNameValidation(data){
            if(data.firstName.length>1 && !/\d/.test(data.firstName)){
               setErrorMessageFirstName('');
               return true
            }
            setErrorMessageFirstName("Enter valid name for first name");
            return false
          }

          function lastNameValidation(data){
            if(data.lastName.length>1 && !/\d/.test(data.lastName)){
               setErrorMessageLastName('');
               return true
            }
            setErrorMessageLastName("Enter valid name for last name");
            return false
          }

          function emailAddressValidation(data){
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailAddress)){
              setErrorMessageEmailAddress('');
              return true;
            }
            setErrorMessageEmailAddress("Enter valid email");
            return false;
          }
          

          function mobileNumberValidation(data){
            if(data.mobileNumber.length===10 &&  /^\d+$/.test(data.mobileNumber)){
              setErrorMessageMobileNumber('');
              return true;
            }
            setErrorMessageMobileNumber('Enter valid mobile number eg: 0777111222');
            return false;
          }

          function dateOfBirthValidation(data) {
            if (data.dateOfBirth === '') {
              setErrorMessageDateOfBirth("Set birthday");
              return false;
            }
          
            const dateString = data.dateOfBirth;
            const dateObject = new Date(dateString);
          
            // Check if the user is at least 17 years old
            const today = new Date();
            const minValidDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
          
            if (dateObject < minValidDate) {
              // Format the date to "YYYY-MM-DD"
              const formattedDate = dateObject.toISOString().split('T')[0];
          
              if (/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
                setErrorMessageDateOfBirth('');
                return true;
              } else {
                setErrorMessageDateOfBirth("Date format is not valid");
              }
            } else {
              setErrorMessageDateOfBirth("Employee must be at least 18 years old");
            }
          
            return false;
          }
          

          function genderValidation(data){
             if(data.gender.toLowerCase()==='male' || data.gender.toLowerCase()==='female'){
                  setErrorMessageGender('');
                  return true;
             }
             setErrorMessageGender('Enter valid value');
             return false;
          }

          function salaryValidation(data){
            if(data.salary>=500.00 && /^\d+(\.\d+)?$/.test(data.salary)){
              setErrorMessageSalary('')
              return true;
            }
            setErrorMessageSalary('Enter valid number (min 500.00 Rs)');
            return false;
          }


          function departmentValidation(data){
                 console.log(departmentData);
                 if(departmentData && departmentData.length>0){

                      for (const department of departmentData) {
                        if (department.departmentId == data.departmentId) {
                            setErrorMessageDepartment('');
                            return true;
                        }
                        setErrorMessageDepartment('Select an existing department');
                       return false;
                      }
                      
                 
                 }
                 setErrorMessageDepartment('There are no any department, Add a department first');
                 return false;

                     
          }
        
        
       

           if(isDataFilled(data) && nicValidation(data) && firstNameValidation(data) && lastNameValidation(data) && emailAddressValidation(data) 
              && mobileNumberValidation(data) && dateOfBirthValidation(data) && genderValidation(data) && salaryValidation(data) && departmentValidation(data)){

                    try{
                      axios.post(post_url,data)
                      .then((result)=>{
                        fetchEmployeeData();
                        handleCloseAdd();
                        clearSave();
                        toast.success("new employee addedd successfully");
                    })
                }catch(error){
                    console.error("Error in save data",error);

                  }
              
           }else{
               
               toast.error("Employee details are invalid");
               return;
           }


         
           
  }


 //get employee by id
  const [NameOfEmployee, setNameOfEmployee] =useState(''); //set the name of the employe to use in delete toast to show employee's name
  const getEmployeeById =(_employeeId)=>{
    const getById_url =`${baseUrlEmployee}/getEmployeeById/${_employeeId}`;
      try{
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


        setNameOfEmployee(employee.firstName+" "+employee.lastName);
        
      })
    }catch(error) {
        console.error("Error in get employee by id",error)
    }
  }


  //editing :just open the updat modal and fill the current data
  const handleEdit = (_employeeId)=>{ 
    
     handleShowEdit();
     setEmpID(_employeeId); //set the empID to use in handleUpdate() 

     getEmployeeById(_employeeId);  
    
    
  }


  //handle update this is the fuction to update data in database
  const handleUpdate=()=>{
    

       
      const UpdateEmployee =(_employeeId)=>{
      const put_url = `${baseUrlEmployee}/updateEmployee/${_employeeId}`;
  
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

      clearErrorMessageEdit();

      // validation for edit for
      function isDataFilled(updatedData) {
        const requiredFields = ['nicNumber', 'firstName', 'lastName', 'emailAddress', 'mobileNumber', 'dateOfBirth', 'gender', 'salary', 'departmentId'];
        for (const field of requiredFields) {
            if (!updatedData[field]) {
                setErrorMessageEdit("All fields are required");
                return false;
            }
        }
        setErrorMessageEdit('');
        return true;
     }
    

     

      function nicValidationEdit(updatedData){

        for (const employee of employeeData) {
          // Skip the current employee being updated
          if (employee.employeeId === _employeeId) {
              continue;
          }
      
          if (employee.nicNumber === updatedData.nicNumber) {
              setErrorMessageNICEdit("NIC already used by another employee");
              return false;
          }
       }
      

        if(updatedData.nicNumber.length===12 || updatedData.nicNumber.length===10){
          setErrorMessageNICEdit('');
          return true;
        }
        setErrorMessageNICEdit("Enter a valid nic number");
        return false;
      }


      function firstNameValidation(updatedData){
        if(updatedData.firstName.length>1 && !/\d/.test(updatedData.firstName)){
           setErrorMessageFirstNameEdit('');
           return true
        }
        setErrorMessageFirstNameEdit("Enter valid name for first name, cant use numbers");
        return false
      }

      function lastNameValidation(updatedData){
        if(updatedData.lastName.length>1 && !/\d/.test(updatedData.lastName)){
           setErrorMessageLastNameEdit('');
           return true
        }
        setErrorMessageLastNameEdit("Enter valid name for last name, can't use numbers");
        return false
      }

      function emailAddressValidation(updatedData){
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedData.emailAddress)){
          setErrorMessageEmailAddressEdit('');
          return true;
        }
        setErrorMessageEmailAddressEdit("Enter valid email");
        return false;
      }
      

      function mobileNumberValidation(updatedData){
        if(updatedData.mobileNumber.length===10 &&  /^\d+$/.test(updatedData.mobileNumber)){
          setErrorMessageMobileNumberEdit('');
          return true;
        }

        setErrorMessageMobileNumberEdit('Enter valid mobile number eg: 0777111222');
        return false;
      }

      function dateOfBirthValidation(updatedData) {
        if (updatedData.dateOfBirth === '') {
          setErrorMessageDateOfBirthEdit("Set birthday");
          return false;
        }
      
        const dateString = updatedData.dateOfBirth;
        const dateObject = new Date(dateString);
      
        // Check if the user is at least 17 years old
        const today = new Date();
        const minValidDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      
        if (dateObject < minValidDate) {
          // Format the date to "YYYY-MM-DD"
          const formattedDate = dateObject.toISOString().split('T')[0];
      
          if (/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
            setErrorMessageDateOfBirthEdit('');
            return true;
          } else {
            setErrorMessageDateOfBirthEdit("Date format is not valid");
          }
        } else {
          setErrorMessageDateOfBirthEdit("Employee must be at least 18 years old");
        }
      
        return false;
      }
      

      function genderValidation(updatedData){
         if(updatedData.gender.toLowerCase()==='male' || updatedData.gender.toLowerCase()==='female'){
              setErrorMessageGenderEdit('');
              return true;
         }
         setErrorMessageGenderEdit('Enter valid value');
         return false;
      }

      function salaryValidation(updatedData){
        if(updatedData.salary>=500.00 && /^\d+(\.\d+)?$/.test(updatedData.salary)){
          setErrorMessageSalaryEdit('')
          return true;
        }
        setErrorMessageSalaryEdit('Enter valid number (min 500.00 Rs');
        return false;
      }


      function departmentValidation(updatedData){

            for (const department of departmentData) {
                    if (department.departmentId == updatedData.departmentId) {
                        setErrorMessageDepartmentEdit('');
                        return true;
                    }
            }

            setErrorMessageDepartmentEdit('Select an existing department');
            return false;
      }
      
      
      if(isDataFilled(updatedData) && nicValidationEdit(updatedData) && firstNameValidation(updatedData) && lastNameValidation(updatedData) && emailAddressValidation(updatedData) 
      && mobileNumberValidation(updatedData) && dateOfBirthValidation(updatedData) && genderValidation(updatedData) && salaryValidation(updatedData) && departmentValidation(updatedData)){

          try{
            axios.put(put_url,updatedData)
            .then((result)=>{
                fetchEmployeeData();
                clearEdit();
                toast.success("update successfully");
            })
          }catch(error){
            console.error("Error in update (end point)",error);
          }

          
          handleCloseEdit();
          setEmpID(0); // once update is complete then reset the empID

        }
        else{
          toast.error("Employee details are invalid");
          return;
        }

    }

    UpdateEmployee(empID);
     
  
      

  }



  // define a const for set the employee id that I need to delete
  const [empIDToDelete,setempIDToDelete] =useState(0);
  //deleting 
  const handleDelete = ()=>{
      
      
      const delete_url =`${baseUrlEmployee}/deleteEmployee/${empIDToDelete}`; 

      try{
      axios.delete(delete_url)
      .then((result)=>{
          console.log(result);
          fetchEmployeeData();
          setempIDToDelete(0); // reset the employeeIDToDelete
          handleCloseDelete();
          toast.warning(NameOfEmployee.concat("'s information is permernatly deleted"));
          setNameOfEmployee(null);
          console.log(NameOfEmployee);
      })
    }catch(error){
      console.error("Error in delete (end point)",error);
    }

      
  }


  


  return (
    <>
    <ToastContainer />
    <div className='EmployeeContent'>
      <h5 className="d-flex justify-content-center align-items-center">Employee Details</h5>
      <hr/>
      <Button variant="success" onClick={()=>handleShowAdd()}>Add Employee</Button>
      <Table striped bordered hover className='EmployeeTable'>
        <thead>
          <tr>
            <th className="text-center">NIC</th>
            <th className="text-center">First Name</th>
            <th className="text-center">Last Name</th>
            <th className="text-center">Email Address</th>
            <th className="text-center">Mobile Number</th>
            <th className="text-center">Date of Birth</th>
            <th className="text-center">Age</th>
            <th className="text-center">Gender</th>
            <th className="text-center">Salary</th>
            <th className="text-center">Department Name</th>
            <th className="text-center">Action</th>
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
                <td colSpan={2} className="d-flex justify-content-center align-items-center">
                  <Button variant="primary" onClick={() => handleEdit(employee.employeeId)}>Edit</Button> &nbsp;
                  <Button variant="danger" onClick={() => {getEmployeeById(employee.employeeId); setempIDToDelete(employee.employeeId); handleShowDelete();}}>Delete</Button>
                </td>
              </tr>
            ))
            :""

            }
        </tbody>
        
      </Table>
 
      { employeeData && employeeData.length === 0 ?
           <Alert variant="danger"  dismissible>
           <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
           <p>
             No data or Serve is not up & runnig at this moment. 
            </p>
            <Button variant="light" onClick={()=>fetchEmployeeData()}>Fetch</Button>
         </Alert>:
          ""
       }
      
    </div>




     {/* add modal */}
     <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                 <div>{errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}</div>
                  <Form.Label htmlFor="nic">nic</Form.Label>
                  <Form.Control
                    type="text"
                    id="nicSave"
                    aria-describedby="nicHelpBlock"
                    value={nicNumberSave}
                    onChange={(e)=>setNicNumberSave(e.target.value)}
                  />
                  {errorMessageNIC && <div style={{ color: 'red' }}>{errorMessageNIC}</div>}
                  <br></br>

                  <Form.Label htmlFor="firstname">firstName</Form.Label>
                  <Form.Control
                    type="text"
                    id="firstNameSave"
                    aria-describedby="firstNameHelpBlock"
                    value={firstNameSave}
                    onChange={(e)=>setFirstNameSave(e.target.value)}
                  />
                  {errorMessageFirstName && <div style={{ color: 'red' }}>{errorMessageFirstName}</div>}

                  <br></br>

                  <Form.Label htmlFor="lastName">lastName</Form.Label>
                  <Form.Control
                    type="text"
                    id="lastNameSave"
                    aria-describedby="lastNameHelpBlock"
                    value={lastNameSave}
                    onChange={(e)=>setLastNameSave(e.target.value)}
                  />
                  {errorMessageLastName && <div style={{ color: 'red' }}>{errorMessageLastName}</div>}


                  <br></br>
                  <Form.Label htmlFor="email">emailAddress</Form.Label>
                  <Form.Control
                    type="text"
                    id="emailSave"
                    aria-describedby="emailHelpBlock"
                    value={emailAddressSave}
                    onChange={(e)=>setEmailAddressSave(e.target.value)}
                  />
                  {errorMessageEmailAddress && <div style={{ color: 'red' }}>{errorMessageEmailAddress}</div>}

                   <br></br>
                  <Form.Label htmlFor="mobile">mobileNumber</Form.Label>
                  <Form.Control
                    type="text"
                    id="mobileSave"
                    aria-describedby="mobileHelpBlock"
                    value={mobileNumberSave}
                    onChange={(e)=>setMobileNumberSave(e.target.value)}
                  />
                  {errorMessageMobileNumber && <div style={{ color: 'red' }}>{errorMessageMobileNumber}</div>}

                  
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
                        <FaCalendar className='FaCalendar'/>
                      </span>
                    </div>
                  </div>
                  {errorMessageDateOfBirth && <div style={{ color: 'red' }}>{errorMessageDateOfBirth}</div>}
      

                  
                  <br/>
                  <Form.Label htmlFor="gender">Gender</Form.Label>
                  <Form.Select
                    id="genderSave"
                    aria-describedby="genderHelpBlock"
                    value={genderSave}
                    onChange={(e) => setGenderSave(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    
                  </Form.Select>
                  {errorMessageGender && <div style={{ color: 'red' }}>{errorMessageGender}</div>}


                  
                   <br></br>
                  <Form.Label htmlFor="salary">salary</Form.Label>
                  <Form.Control
                    type="text"
                    id="salarySave"
                    aria-describedby="salaryHelpBlock"
                    value={salarySave}
                    onChange={(e)=>setSalarySave(e.target.value)}
                  />
                  {errorMessageSalary && <div style={{ color: 'red' }}>{errorMessageSalary}</div>}

                  
                  <br></br>
                  <Form.Label htmlFor="department">Department</Form.Label>
                  <Form.Select
                    id="departmentSave"
                    aria-describedby="departmentHelpBlock"
                    value={departmentIdSave}
                    onChange={(e) => setDepartmentIdSave(e.target.value)}
                  >
                    <option value=''>Select department</option>
                    {departmentData.map((department) => (
                      <option key={department.departmentId} value={department.departmentId}>
                        {department.departmentName}
                      </option>
                    ))}
                  </Form.Select>
                  {errorMessageDepartment && <div style={{ color: 'red' }}>{errorMessageDepartment}</div>}
                  


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


    
    {/* edit modal */}
    <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>{errorMessageEdit && <div style={{ color: 'red' }}>{errorMessageEdit}</div>}</div>
        <Form.Label htmlFor="nic">nic</Form.Label>
                  <Form.Control
                    type="text"
                    id="nicEdit"
                    aria-describedby="nicHelpBlock"
                    value={nicNumberEdit}
                    onChange={(e)=>setNicNumberEdit(e.target.value)}
                  />
                  {errorMessageNICEdit && <div style={{ color: 'red' }}>{errorMessageNICEdit}</div>}
                  <br></br>

                  <Form.Label htmlFor="firstname">firstName</Form.Label>
                  <Form.Control
                    type="text"
                    id="firstNameEdit"
                    aria-describedby="firstNameHelpBlock"
                    value={firstNameEdit}
                    onChange={(e)=>setFirstNameEdit(e.target.value)}
                  />
                  {errorMessageFirstNameEdit && <div style={{ color: 'red' }}>{errorMessageFirstNameEdit}</div>}
                  <br></br>

                  <Form.Label htmlFor="lastName">lastName</Form.Label>
                  <Form.Control
                    type="text"
                    id="lastNameEdit"
                    aria-describedby="lastNameHelpBlock"
                    value={lastNameEdit}
                    onChange={(e)=>setLastNameEdit(e.target.value)}
                  />
                  {errorMessageLastNameEdit && <div style={{ color: 'red' }}>{errorMessageLastNameEdit}</div>}


                  <br></br>
                  <Form.Label htmlFor="email">emailAddress</Form.Label>
                  <Form.Control
                    type="text"
                    id="emailEdit"
                    aria-describedby="emailHelpBlock"
                    value={emailAddressEdit}
                    onChange={(e)=>setEmailAddressEdit(e.target.value)}
                  />
                  {errorMessageEmailAddressEdit && <div style={{ color: 'red' }}>{errorMessageEmailAddressEdit}</div>}

                   <br></br>
                  <Form.Label htmlFor="mobile">mobileNumber</Form.Label>
                  <Form.Control
                    type="text"
                    id="mobileEdit"
                    aria-describedby="mobileHelpBlock"
                    value={mobileNumberEdit}
                    onChange={(e)=>setMobileNumberEdit(e.target.value)}
                  />
                  {errorMessageMobileNumberEdit && <div style={{ color: 'red' }}>{errorMessageMobileNumberEdit}</div>}

                  
                  <br></br>
                  <Form.Label htmlFor="DOB">Date of Birth</Form.Label>
                  <div className="input-group">
                    <DatePicker
                      id="DOBEdit"
                      selected={dateOfBirthEdit}
                      onChange={(date) => setDateOfBirthEdit(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      ref={datePickerRef}
                    />
                    <div className="input-group-append" onClick={openDatePicker}>
                      <span className="input-group-text">
                        <FaCalendar className='FaCalendar'/>
                      </span>
                    </div>
                  </div>
                  {errorMessageDateOfBirthEdit && <div style={{ color: 'red' }}>{errorMessageDateOfBirthEdit}</div>}
      

                  
                  <br/>
                  <Form.Label htmlFor="gender">Gender</Form.Label>
                  <Form.Select
                    id="genderEdit"
                    aria-describedby="genderHelpBlock"
                    value={genderEdit}
                    onChange={(e) => setGenderEdit(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                  {errorMessageGenderEdit && <div style={{ color: 'red' }}>{errorMessageGenderEdit}</div>}


                  
                   <br></br>
                  <Form.Label htmlFor="salary">salary</Form.Label>
                  <Form.Control
                    type="text"
                    id="salaryEdit"
                    aria-describedby="salaryHelpBlock"
                    value={salaryEdit}
                    onChange={(e)=>setSalaryEdit(e.target.value)}
                  />
                  {errorMessageSalaryEdit && <div style={{ color: 'red' }}>{errorMessageSalaryEdit}</div>}

                  
                  <br></br>
                  <Form.Label htmlFor="department">Department</Form.Label>
                  <Form.Select
                    id="departmentEdit"
                    aria-describedby="departmentHelpBlock"
                    value={departmentIdEdit}
                    onChange={(e) => setDepartmentIdEdit(e.target.value)}
                  >
                    <option value=''>Select department</option>
                    {departmentData.map((department) => (
                      <option key={department.departmentId} value={department.departmentId}>
                        {department.departmentName}
                      </option>
                    ))}
                  </Form.Select>
                  {errorMessageDepartmentEdit && <div style={{ color: 'red' }}>{errorMessageDepartmentEdit}</div>}
                  
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
        <Modal.Body>Do you need to permernatly delete this employee ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancle
          </Button>
          <Button variant="danger" onClick={()=>handleDelete()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>



       
      
      
      
      
      </>
      
      
      
      
      
      
      
    

   
  );
};

export default Employee







