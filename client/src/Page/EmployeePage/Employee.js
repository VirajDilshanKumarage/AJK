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
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillSave } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';


function Employee() {


  /** server faliures handle BEGIN ->AS follows*/
  //const for server error
  const [serverErrorMessage,setServerErrorMessage]=useState('');

  //const fro Server error alert box :- showAlertServerError
  const [showAlertServerError, setShowAlertServerError] = useState(false);
  const handleCloseAlertServerError = () => {
     setShowAlertServerError(false);
     setServerErrorMessage('');
  }
  const handleShowAlertServerError = () => {
     handleCloseAdd();
     handleCloseDelete();
     handleCloseEdit();
     setShowAlertServerError(true);
  }
   

  //function for server down error 1
  function serverResponseFaliur_1(){
    setServerErrorMessage("Server responded with an error. Please check your input and try again.");
    handleShowAlertServerError();
  }

  //function for server down error 2
  function serverResponseFaliur_2(){
    setServerErrorMessage("No response received from the server. Please try again later.");
    handleShowAlertServerError();
  }

  //function for server down error 3
  function serverResponseFaliur_3(){
    setServerErrorMessage("Error setting up the request. Please try again.");
    handleShowAlertServerError();
  }

   //function for server down error 4
  function serverResponseFaliur_4(){
    setServerErrorMessage("An error occurred. Please try again later.");
    handleShowAlertServerError();
  }
  /**END server faliures handled */
   


 

  /** BEGIN fetchDepartmentData()  
   * This function written to handle all the mappings and data validation in  employee model to validate department input field
   */
  const baseUrlDepartment='http://localhost:5148/api/Departments';
  const [departmentData,setDepartmentData]=useState([]);

  const fetchDepartmentData=async ()=>{
      
    try{
      const get_url = `${baseUrlDepartment}/getAllDepartment`;
      const response = await axios.get(get_url);
      setDepartmentData(response.data);
    }catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error, check if it's a network error
          if (error.response) {
            // The request was made, but the server responded with an error status
            serverResponseFaliur_1();
          } else if (error.request) {
            // The request was made, but no response was received
            serverResponseFaliur_2();
          } else {
            // Something went wrong in setting up the request
            serverResponseFaliur_3();
          }
      } else {
        // Not an Axios error, handle it accordingly
        serverResponseFaliur_4();
      }
    }
  }

  useEffect(()=>{
      fetchDepartmentData(); //to refreshing only the department data
  },[])
  /** End fetchDepartmentData()  */


  //base usrl for employee model
  const baseUrlEmployee = 'http://localhost:5148/api/Employees';

  //add modal
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => {
    fetchDepartmentData();//refreshig loaded department details because those details are use in add modal;
    setShowAdd(true);
  }

  //edite modal
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //delete modal
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => {
    setDeleteConfirmation('');
    setErrorMessageDeleteConfirmation('');
    setShowDelete(false)
  };
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

  //validation cost in delete modal to check the deletion is confirm or not
  const [errorMessageDeleteConfirmation,setErrorMessageDeleteConfirmation] =useState('');


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
        }catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios error, check if it's a network error
              if (error.response) {
                // The request was made, but the server responded with an error status
                serverResponseFaliur_1();
              } else if (error.request) {
                // The request was made, but no response was received
                serverResponseFaliur_2();
              } else {
                // Something went wrong in setting up the request
                serverResponseFaliur_3();
              }
          } else {
            // Not an Axios error, handle it accordingly
            serverResponseFaliur_4();
          }
        }
  }

  useEffect(()=>{
       fetchEmployeeData(); //refresh the employee data only without refreshing whole web page:- using useEffect
  },[])


 

  //adding ne employee
  const handleSave = async ()=>{
      
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
        
          clearErrorMessageSave();//just error messages for save madal

          // validation for all fields in add modal :- all fields are required
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
          
          //validation for nic number in add modal
          function nicValidation(data){
              fetchEmployeeData();

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

          //validation for first name field in add modal
          function firstNameValidation(data){
            if(data.firstName.length>1 && !/\d/.test(data.firstName)){
               setErrorMessageFirstName('');
               return true
            }
            setErrorMessageFirstName("Enter valid mane as first name. can't use numbers");
            return false
          }
          
          //validation for last name field in add modal
          function lastNameValidation(data){
            if(data.lastName.length>1 && !/\d/.test(data.lastName)){
               setErrorMessageLastName('');
               return true
            }
            setErrorMessageLastName("Enter valid name as last name. can't use numbers");
            return false
          }
          
          //validation for email address field in add modal
          function emailAddressValidation(data){
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailAddress)){
              setErrorMessageEmailAddress('');
              return true;
            }
            setErrorMessageEmailAddress("Enter valid email");
            return false;
          }
          
          //validation for mobile number field in add modal
          function mobileNumberValidation(data){
            if(data.mobileNumber.length===10 &&  /^\d+$/.test(data.mobileNumber)){
              setErrorMessageMobileNumber('');
              return true;
            }
            setErrorMessageMobileNumber('Enter valid mobile number eg: 0777111222');
            return false;
          }
          
          //validation for date of birth field in add modal
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
          
          //validation for gender field add modal
          function genderValidation(data){
             if(data.gender.toLowerCase()==='male' || data.gender.toLowerCase()==='female'){
                  setErrorMessageGender('');
                  return true;
             }
             setErrorMessageGender('Enter valid value');
             return false;
          }

          //validation for salary field add modal
          function salaryValidation(data){
            if(data.salary>=500.00 && /^\d+(\.\d+)?$/.test(data.salary)){
              setErrorMessageSalary('')
              return true;
            }
            setErrorMessageSalary('Enter valid number (min 500.00 Rs)');
            return false;
          }

          //validation for department field add modal
          function departmentValidation(data){
                 fetchDepartmentData();
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
        
        
       
          //checking all the validation for add modal
          if(isDataFilled(data) && nicValidation(data) && firstNameValidation(data) && lastNameValidation(data) && emailAddressValidation(data) 
              && mobileNumberValidation(data) && dateOfBirthValidation(data) && genderValidation(data) && salaryValidation(data) && departmentValidation(data)){

                try {
                  const result = await axios.post(post_url, data);
                  fetchEmployeeData();
                  handleCloseAdd();
                  clearSave();
                  toast.success('New employee added successfully');
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        // Axios error, check if it's a network error
                          if (error.response) {
                            // The request was made, but the server responded with an error status
                            serverResponseFaliur_1();

                          } else if (error.request) {
                            // The request was made, but no response was received
                            serverResponseFaliur_2();
                          } else {
                            // Something went wrong in setting up the request
                            serverResponseFaliur_3();
                          }
                    } else {
                      // Not an Axios error, handle it accordingly
                      serverResponseFaliur_4();
                    }
                }
              
          }else{
               
               toast.error("Employee details are invalid");
               return;
          }


         
           
  }


 //get employee by id
  const [NameOfEmployee, setNameOfEmployee] =useState(''); //set the fullname to get full name of an employee
  const getEmployeeById =async (_employeeId)=>{
    const getById_url =`${baseUrlEmployee}/getEmployeeById/${_employeeId}`;
      try{
        const result= await axios.get(getById_url)
        const employee = result.data;

        if(employee.employeeId!=null){
        console.log(result.data);// just see data form console
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
        }
        
      
      }catch (error) {
          if (axios.isAxiosError(error)){
            // Axios error, check if it's a network error
            if (error.response) {
              // The request was made, but the server responded with an error status
              serverResponseFaliur_1();
            } else if (error.request) {
              // The request was made, but no response was received
              serverResponseFaliur_2();
            } else {
              // Something went wrong in setting up the request
              serverResponseFaliur_3();
            }
          }else {
        // Not an Axios error, handle it accordingly
        serverResponseFaliur_4();
          }
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
  
      const UpdateEmployee =async (_employeeId)=>{
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
        setErrorMessageFirstNameEdit("Enter valid name as first name, can't use numbers");
        return false
      }

      function lastNameValidation(updatedData){
        if(updatedData.lastName.length>1 && !/\d/.test(updatedData.lastName)){
           setErrorMessageLastNameEdit('');
           return true
        }
        setErrorMessageLastNameEdit("Enter valid name as last name, can't use numbers");
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

        try {
          const result = await axios.put(put_url, updatedData);
          fetchEmployeeData();
          clearEdit();
          toast.success('Update successful');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios error, check if it's a network error
            if (error.response) {
              // The request was made, but the server responded with an error status
              serverResponseFaliur_1();
            } else if (error.request) {
              // The request was made, but no response was received
              serverResponseFaliur_2();
            } else {
              // Something went wrong in setting up the request
              serverResponseFaliur_3();
            }
          } else {
            // Not an Axios error, handle it accordingly
            serverResponseFaliur_4();
          }
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
  const [deleteConfirmation,setDeleteConfirmation] =useState('');//set delete conformation string;
  //deleting 
  const handleDelete = async ()=>{
    
      
       
      const delete_url =`${baseUrlEmployee}/deleteEmployee/${empIDToDelete}`; 
      
      if(deleteConfirmation.toLowerCase()=='confirm'){
        setErrorMessageDeleteConfirmation('');
        setDeleteConfirmation('');

        try {
          const result = await axios.delete(delete_url);
          
          console.log(result);
          fetchEmployeeData();
          setempIDToDelete(0); // reset the employeeIDToDelete
          handleCloseDelete();
          toast.warning('Employee is permanently deleted');
          setNameOfEmployee(null);
          
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios error, check if it's a network error
            if (error.response) {
              // The request was made, but the server responded with an error status
              serverResponseFaliur_1();
            } else if (error.request) {
              // The request was made, but no response was received
              serverResponseFaliur_2();
            } else {
              // Something went wrong in setting up the request
              serverResponseFaliur_3();
            }
          } else {
            // Not an Axios error, handle it accordingly
            serverResponseFaliur_4();
          }
        }
    }else{
        setErrorMessageDeleteConfirmation("This action is Not Confirm, type as 'confirm' to delete this employee");
        setDeleteConfirmation('');
        
    }

      
  }


  


    return (
    <>
      <ToastContainer />
      <div className='EmployeeBackground'>
      <div className='EmployeeContent'>
        <h5 className="d-flex justify-content-center align-items-center">Employee Details</h5>
        <hr/>
        <Button variant="success" onClick={()=>handleShowAdd()} className='AddEmployeeButton'>Add Employee <BsFillPersonPlusFill className='m-2'/></Button>
        <Table striped bordered hover className='EmployeeTable' >
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
                    <Button variant="primary" onClick={() => handleEdit(employee.employeeId)}>Edit<BsPencil className='m-1'/></Button> &nbsp;
                    <Button variant="danger" onClick={() => { setempIDToDelete(employee.employeeId); handleShowDelete();}}>Delete <BsTrash className='m-1'/></Button>
                  </td>
                </tr>
              ))
              :""

              }
          </tbody>
          
        </Table>
  
        { employeeData && employeeData.length === 0 ?
            <Alert variant="danger"  dismissible>
            <Alert.Heading>Oh snap! You got an error! Data is not Loaded</Alert.Heading>
            <p>
              No data or Servee is not up & runnig at this moment. 
              </p>
              <Button variant="light" onClick={()=>fetchEmployeeData()}>Fetch</Button>
              {/* when the click fetch button in employee component it should call the fetchEmployeeData() */}
          </Alert>:
            ""
        }
        
      </div>
      </div>


      {/* alert box for show server error eg:- server down*/}
      <Modal show={showAlertServerError} variant='danger'>
                    <Modal.Body>
                      <Alert variant='warning'>
                        <div className="d-flex align-items-center">
                          <div>
                            <Alert.Heading>Ooops ! <br></br>Server may be down&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <BsFillExclamationTriangleFill className="mr-2" /></Alert.Heading> 
                            <br></br>
                            <br></br>
                            <p>
                              {serverErrorMessage}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-end">
                          <Button onClick={() => handleCloseAlertServerError()} variant="outline-dark">
                            Got it
                          </Button>
                        </div>
                      </Alert>
                    </Modal.Body>
      </Modal>


      {/* add modal */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                  <div>{errorMessage && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessage}</div>}</div>
                    <Form.Label htmlFor="nic">NIC number</Form.Label>
                    <Form.Control
                      type="text"
                      id="nicSave"
                      aria-describedby="nicHelpBlock"
                      value={nicNumberSave}
                      placeholder='eg: 208018201577 or 974567788v'
                      onChange={(e)=>setNicNumberSave(e.target.value)}
                    />
                    {errorMessageNIC && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageNIC}</div>}
                    <br></br>

                    <Form.Label htmlFor="firstname">First name</Form.Label>
                    <Form.Control
                      type="text"
                      id="firstNameSave"
                      aria-describedby="firstNameHelpBlock"
                      value={firstNameSave}
                      placeholder='eg: John'
                      onChange={(e)=>setFirstNameSave(e.target.value)}
                    />
                    {errorMessageFirstName && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageFirstName}</div>}

                    <br></br>

                    <Form.Label htmlFor="lastName">Last name</Form.Label>
                    <Form.Control
                      type="text"
                      id="lastNameSave"
                      aria-describedby="lastNameHelpBlock"
                      value={lastNameSave}
                      placeholder='eg: Deo'
                      onChange={(e)=>setLastNameSave(e.target.value)}
                    />
                    {errorMessageLastName && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageLastName}</div>}


                    <br></br>
                    <Form.Label htmlFor="email">E-mail</Form.Label>
                    <Form.Control
                      type="text"
                      id="emailSave"
                      aria-describedby="emailHelpBlock"
                      value={emailAddressSave}
                      placeholder='eg: example@gmail.com'
                      onChange={(e)=>setEmailAddressSave(e.target.value)}
                    />
                    {errorMessageEmailAddress && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageEmailAddress}</div>}

                    <br></br>
                    <Form.Label htmlFor="mobile">Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      id="mobileSave"
                      aria-describedby="mobileHelpBlock"
                      value={mobileNumberSave}
                      placeholder='eg: 0712345678'
                      onChange={(e)=>setMobileNumberSave(e.target.value)}
                    />
                    {errorMessageMobileNumber && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageMobileNumber}</div>}

                    
                    <br></br>
                    <Form.Label htmlFor="DOB">Date of Birth</Form.Label>
                    <div className="input-group">
                      <DatePicker
                        id="DOBSave"
                        selected={dateOfBirthSave}
                        onChange={(date) => setDateOfBirthSave(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        placeholderText='eg: 1999-03-01'
                        ref={datePickerRef}
                      />
                      <div className="input-group-append" onClick={openDatePicker}>
                        <span className="input-group-text">
                          <FaCalendar className='FaCalendar'/>
                        </span>
                      </div>
                    </div>
                    {errorMessageDateOfBirth && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDateOfBirth}</div>}
        

                    
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
                    {errorMessageGender && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageGender}</div>}


                    
                    <br></br>
                    <Form.Label htmlFor="salary">Salary (Rs) <span style={{color: 'gray'}}>example: 20000.00</span></Form.Label>
                    <Form.Control
                      type="text"
                      id="salarySave"
                      aria-describedby="salaryHelpBlock"
                      value={salarySave}
                      placeholder='eg: 20000.00'
                      onChange={(e)=>setSalarySave(e.target.value)}
                    />
                    {errorMessageSalary && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageSalary}</div>}

                    
                    <br></br>
                    <Form.Label htmlFor="department">Department</Form.Label>
                    <Form.Select
                      id="departmentSave"
                      aria-describedby="departmentHelpBlock"
                      value={departmentIdSave}
                      placeholder='eg: Information Technology'
                      onChange={(e) => setDepartmentIdSave(e.target.value)}
                    >
                      <option value=''>Select department</option>
                      {departmentData.map((department) => (
                        <option key={department.departmentId} value={department.departmentId}>
                           {department.departmentCode+" :- "}{department.departmentName}
                        </option>
                      ))}
                    </Form.Select>
                    {errorMessageDepartment && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDepartment}</div>}
                    


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Close
              <AiOutlineClose className='m-1'/>
            </Button>
            <Button variant="success" onClick={handleSave}>
              Save
              <AiFillSave className='m-1'/>
            </Button>
          </Modal.Footer>
      </Modal>

      
      {/* edit modal */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Update Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>{errorMessageEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageEdit}</div>}</div>
          <Form.Label htmlFor="nic">NIC number</Form.Label>
                    <Form.Control
                      type="text"
                      id="nicEdit"
                      aria-describedby="nicHelpBlock"
                      value={nicNumberEdit}
                      placeholder='eg: 208018201577 or 974567788v'
                      onChange={(e)=>setNicNumberEdit(e.target.value)}
                    />
                    {errorMessageNICEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageNICEdit}</div>}
                    <br></br>

                    <Form.Label htmlFor="firstname">First name</Form.Label>
                    <Form.Control
                      type="text"
                      id="firstNameEdit"
                      aria-describedby="firstNameHelpBlock"
                      value={firstNameEdit}
                      placeholder='eg: John'
                      onChange={(e)=>setFirstNameEdit(e.target.value)}
                    />
                    {errorMessageFirstNameEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageFirstNameEdit}</div>}
                    <br></br>

                    <Form.Label htmlFor="lastName">Last name</Form.Label>
                    <Form.Control
                      type="text"
                      id="lastNameEdit"
                      aria-describedby="lastNameHelpBlock"
                      value={lastNameEdit}
                      placeholder='eg: Deo'
                      onChange={(e)=>setLastNameEdit(e.target.value)}
                    />
                    {errorMessageLastNameEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageLastNameEdit}</div>}


                    <br></br>
                    <Form.Label htmlFor="email">E-mail</Form.Label>
                    <Form.Control
                      type="text"
                      id="emailEdit"
                      aria-describedby="emailHelpBlock"
                      value={emailAddressEdit}
                      placeholder='eg: example@gmail.com'
                      onChange={(e)=>setEmailAddressEdit(e.target.value)}
                    />
                    {errorMessageEmailAddressEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageEmailAddressEdit}</div>}

                    <br></br>
                    <Form.Label htmlFor="mobile">Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      id="mobileEdit"
                      aria-describedby="mobileHelpBlock"
                      value={mobileNumberEdit}
                      placeholder='0712345678'
                      onChange={(e)=>setMobileNumberEdit(e.target.value)}
                    />
                    {errorMessageMobileNumberEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageMobileNumberEdit}</div>}

                    
                    <br></br>
                    <Form.Label htmlFor="DOB">Date of Birth</Form.Label>
                    <div className="input-group">
                      <DatePicker
                        id="DOBEdit"
                        selected={dateOfBirthEdit}
                        onChange={(date) => setDateOfBirthEdit(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        placeholderText='eg: 1999-03-01'
                        ref={datePickerRef}
                      />
                      <div className="input-group-append" onClick={openDatePicker}>
                        <span className="input-group-text">
                          <FaCalendar className='FaCalendar'/>
                        </span>
                      </div>
                    </div>
                    {errorMessageDateOfBirthEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDateOfBirthEdit}</div>}
        

                    
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
                    {errorMessageGenderEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageGenderEdit}</div>}


                    
                    <br></br>
                    <Form.Label htmlFor="salary">Salary (Rs) <span style={{color: 'gray'}}>example: 20000.00</span></Form.Label>
                    <Form.Control
                      type="text"
                      id="salaryEdit"
                      aria-describedby="salaryHelpBlock"
                      value={salaryEdit}
                      placeholder='eg: 20000.00'
                      onChange={(e)=>setSalaryEdit(e.target.value)}
                    />
                    {errorMessageSalaryEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageSalaryEdit}</div>}

                    
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
                          {department.departmentCode+" :- "}{department.departmentName}
                        </option>
                      ))}
                    </Form.Select>
                    {errorMessageDepartmentEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDepartmentEdit}</div>}
                    
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            <AiOutlineClose className='m-1'/>
            </Button>
            <Button variant="primary" onClick={()=>handleUpdate()}>
              Update<AiFillEdit className='m-1'/>
            </Button>
          </Modal.Footer>
      </Modal>
        
        
      {/* delete modal */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you need to permernatly delete this employee ? if so just type as '<span style={{color:'red'}}>confirm</span>' then click ok
          <div>
                  <Form.Control
                              type="text"
                              id="deleteConfirmation"
                              aria-describedby="deleteConformationHelpBlock"
                              value={deleteConfirmation}
                              placeholder='Type here'
                              onChange={(e)=>setDeleteConfirmation(e.target.value)}
                              className='mt-2'
                  />
                  {errorMessageDeleteConfirmation && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDeleteConfirmation}</div>}

          </div>
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Cancle
            <AiOutlineClose className='m-1'/>
            </Button>
            <Button variant="danger" onClick={()=>handleDelete()}>
              Ok
              <AiOutlineCheck className='m-1'/>
            </Button>
          </Modal.Footer>
      </Modal>
        
    </>
    );



};

export default Employee







