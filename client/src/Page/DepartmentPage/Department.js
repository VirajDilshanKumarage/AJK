import React, { useEffect, useState } from 'react'
import './Department.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Employee from '../EmployeePage/Employee';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';


function Department() {
   const baseUrlDepartment='http://localhost:5148/api/Departments';
   const baseUrlExceptionHandle='http://localhost:5148/api/ExceptionHandles';

  //const for Add department modal
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  //const for Edit department modal
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  //const for Delete department modal
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  //const for Alert box
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);

  //const for validation error messages in add modal
  const [errorMessageDepartmentSave,setErrorMessageDepartmentSave]= useState('');
  const [errorMessageDepartmentCodeSave,setErrorMessageDepartmnetCodeSave] =useState('');
  const [errorMessageDepartmentNameSave,setErrorMessageDepartmentNameSave] = useState('');
  const clearErrorMessageSave=()=>{   
    setErrorMessageDepartmentSave('');
    setErrorMessageDepartmnetCodeSave('');
    setErrorMessageDepartmentNameSave('');
  }


  //const for validation error message in edit modal
  const [errorMessageDepartmentEdit,setErrorMessageDepartmentEdit]=useState('');
  const [errorMessageDepartmentCodeEdit,setErrorMessageDepartmentCodeEdit]=useState('');
  const [errorMessageDepartmentNameEdit,setErrorMessageDepartmentNameEdit]=useState('');
  const clearErrorMessageEdit=()=>{
    setErrorMessageDepartmentEdit('');
    setErrorMessageDepartmentCodeEdit('');
    setErrorMessageDepartmentNameEdit('');
  }

  



  //get all department 
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

   //handle save new departmnet
   const [departmentCodeSave,setDepartmentCodeSave] = useState('');
   const [departmentNameSave,setDepartmentNameSave] = useState('');
   //clear data for save method
   const clearSave=()=>{
    setDepartmentCodeSave('');
    setDepartmentNameSave('');  
   }



   const handleSave=async ()=>{
   
    

      const post_url=`${baseUrlDepartment}/saveNewDepartment`;

      const newDepartment ={
        "departmentCode": departmentCodeSave,
        "departmentName": departmentNameSave
      }

      clearErrorMessageSave();
      //validation for all field check all input fields are filled
      function isFilled(data){
         if(data.departmentCode!=='' && data.departmentName!==''){
           setErrorMessageDepartmentSave('');
           return true;
         }
         setErrorMessageDepartmentSave('All fields are required');
         return false;
      }

      //validation for Department code in save modal
      function validationDepartmentCode(data){
        fetchDepartmentData();
        for( const department of departmentData){
          if(department.departmentCode.toLowerCase() === data.departmentCode.toLowerCase()){
            setErrorMessageDepartmnetCodeSave('Department code is already used, Enter new one');
            return false;
          }
        }

        if(data.departmentCode!=='' && data.departmentCode.length>1){
           setErrorMessageDepartmnetCodeSave('');
           return true;
        }
        setErrorMessageDepartmnetCodeSave('Enter valid departmnet code');
        return false;
      }

      //validation for department name in save modal :- customize the validation and constrains
      function validationDepartmentName(data){
        var regex =/\d/;  // Regular expression to check if there is a number in the string
        if(data.departmentName!=='' && data.departmentName.length>1 && !regex.test(data.departmentName)){
          setErrorMessageDepartmentNameSave('');
          return true;
        }
        setErrorMessageDepartmentNameSave('Enter valid department name, Numbers cannot be used');
          return false;
      }

      if(isFilled(newDepartment) && validationDepartmentCode(newDepartment) && validationDepartmentName(newDepartment)){

        try {
          const result = await axios.post(post_url, newDepartment);
          handleCloseAdd();
          fetchDepartmentData();
          clearSave();
          clearErrorMessageSave();
          toast.success('New Department Added Successfully');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios error, check if it's a network error
            if (error.response) {
              // The request was made, but the server responded with an error status
              console.error('Request made, but server responded with an error:', error.response.data);
              alert('Server responded with an error. Please check your input and try again.');
            } else if (error.request) {
              // The request was made, but no response was received
              console.error('No response received from the server:', error.request);
              alert('No response received from the server. Please try again later.');
            } else {
              // Something went wrong in setting up the request
              console.error('Error setting up the request:', error.message);
              alert('Error setting up the request. Please try again.');
            }
          } else {
            // Not an Axios error, handle it accordingly
            console.error('Non-Axios error occurred:', error);
            alert('An error occurred. Please try again later.');
          }
        }

      }else{
        console.error("Error: validation, Department, new Department, inside the hadleSave method");
        toast.error('Department details invalid');
      }

       
   } 




   //get existing department details and fill the edit modal using get department by id
   const getDepartmentById=(_departmentId)=>{
          const getById_url =`${baseUrlDepartment}/getDepartmentById/${_departmentId}`;

        try{
              
             axios.get(getById_url)
             .then((result)=>{
              //fill the input rows in edit form
              const department = result.data;
              setDepartmentCodeEdit(department.departmentCode);
              setDepartmentNameEdit(department.departmentName);
             })
          }catch(error){
            console.error("Error: endpoin, getDepartmentById, fail to get data",error);
          }

   }



   //handle edit departmnet
   const [departmentIdNeedToUpdate,setdepartmentIdNeedToUpdate] =useState(0);
   const [departmentCodeEdit,setDepartmentCodeEdit]=useState('');
   const [departmentNameEdit,setDepartmentNameEdit] =useState('');
   //clear data in edit modal
   const clearEdit=()=>{
    setDepartmentCodeEdit('');
    setDepartmentNameEdit('');
   }

   const handleEdit=()=>{
   const put_url =`${baseUrlDepartment}/updateDepartment/${departmentIdNeedToUpdate}`;

    const updateDepartment={
      "departmentCode": departmentCodeEdit,
      "departmentName": departmentNameEdit
    }
    
    clearErrorMessageEdit();     
  
      //validation for all field check all input fields are filled
    function isFilled(data){
        if(data.departmentCode!=='' && data.departmentName!==''){
          setErrorMessageDepartmentEdit('');
          return true;
        }
        setErrorMessageDepartmentEdit('All fields are required');
        return false;

     }

     //validation for Department code in edit modal
      function validationDepartmentCode(data){
         fetchDepartmentData();
        for (const department of departmentData) {
          // Skip the current employee being updated
          if (department.departmentId === departmentIdNeedToUpdate) {
              continue;
          }
      
          if (department.departmentCode.toLowerCase() === data.departmentCode.toLowerCase()) {
              setErrorMessageDepartmentCodeEdit("Department code already used");
              return false;
          }
       }

        if(data.departmentCode!=='' && data.departmentCode.length>1){
            setErrorMessageDepartmentCodeEdit('');
            return true;
        }
        setErrorMessageDepartmentCodeEdit('Enter valid department code');
        return false;

        
       }

     //validation for department name in edit modal :- customize the validation and constrains
     function validationDepartmentName(data){
       var regex = /\d/;  // Regular expression to check if there is a number in the string
       if(data.departmentName!=='' && data.departmentName.length>1 && !regex.test(data.departmentName)){
         setErrorMessageDepartmentNameEdit('');
         return true;
       }
       setErrorMessageDepartmentNameEdit('Enter valid department name, Numbers cannot be used');
         return false;
     }


    if(isFilled(updateDepartment) && validationDepartmentCode(updateDepartment) && validationDepartmentName(updateDepartment)){

    try{
      axios.put(put_url,updateDepartment)
      .then((result=>{
        handleCloseEdit();
        clearEdit();
        clearErrorMessageEdit();
        fetchDepartmentData();
        setdepartmentIdNeedToUpdate(0);
        toast.success("Department successfully updated");
       

      }))

    }catch(error){
      if (axios.isAxiosError(error)) {
        // Axios error, check if it's a network error
        if (error.response) {
          // The request was made, but the server responded with an error status
          console.error('Request made, but server responded with an error:', error.response.data);
          alert('Server responded with an error. Please check your input and try again.');
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received from the server:', error.request);
          alert('No response received from the server. Please try again later.');
        } else {
          // Something went wrong in setting up the request
          console.error('Error setting up the request:', error.message);
          alert('Error setting up the request. Please try again.');
        }
      } else {
        // Not an Axios error, handle it accordingly
        console.error('Non-Axios error occurred:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  }else{

    console.error("Error: validation, handleEdit");
    toast.error('Department details invalid');

  }
    
  }




   //exception handleing end points
   //foreign key constrain violation

   const checkForeignKeyConstraintViolations=async (_departmentId)=>{

    const foreignKeyConstraint_url=`${baseUrlExceptionHandle}/foreignKeyConstraint/${_departmentId}`
    //here if the respose data in boolean type and if it is `true`: violated_fk_constrain  `false`: not_violated_fk_constrain
    try{
           const response =await axios.get(foreignKeyConstraint_url);
           console.log("violated_fk_constrain: ",response.data?"yes violated":"no not violated");
           return response.data;
          

    }catch(error){
      console.error("Error: error in check_ForeignKey_Constraint_Violations");
    }

   }


   //handle delete department
   const [departmentIdNeedToDelete,setDepartmentIdNeedToDelete] = useState(0);
   const handleDelete = async () => {
    const delete_url = `${baseUrlDepartment}/deleteDepartment/${departmentIdNeedToDelete}`;
  
    try {
      // Check if there is a foreign key constraint violation
      const isForeignKeyViolation = await checkForeignKeyConstraintViolations(departmentIdNeedToDelete);
  
      if (!isForeignKeyViolation) {
        // No foreign key constraint violation, proceed with deletion
        try {
          var _department_name = null;
          var _department_code=null;
          for(const department of departmentData){
              if(department.departmentId===departmentIdNeedToDelete){
                   _department_name=department.departmentName;
                   _department_code=department.departmentCode;
              }
          }
          
          const response = await axios.delete(delete_url);
          console.log(response.data);
          handleCloseDelete();
          setDepartmentIdNeedToDelete(0);
          fetchDepartmentData();
          toast.warning("Department " + _department_name + " deleted permanentl ( Department code: "+_department_code+" )");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios error, check if it's a network error
            if (error.response) {
              // The request was made, but the server responded with an error status
              console.error('Request made, but server responded with an error:', error.response.data);
              alert('Server responded with an error. Please check your input and try again.');
            } else if (error.request) {
              // The request was made, but no response was received
              console.error('No response received from the server:', error.request);
              alert('No response received from the server. Please try again later.');
            } else {
              // Something went wrong in setting up the request
              console.error('Error setting up the request:', error.message);
              alert('Error setting up the request. Please try again.');
            }
          } else {
            // Not an Axios error, handle it accordingly
            console.error('Non-Axios error occurred:', error);
            alert('An error occurred. Please try again later.');
          }
        }

      } else {
        // There is a foreign key constraint violation, handle accordingly
        handleCloseDelete();
        handleShowAlert();
       // toast.error('Employees are depend on this department');
      }
    } catch (error) {
      console.error("Error checking foreign key constraint", error);
      toast.error("Failed to check foreign key constraint");
    }
  };
  





  //alert for foreign key constrain
 

  return (

    <>
    
        {/* alert box for show foreing key constrain */}
        <Modal show={showAlert} variant='danger'>
  <Modal.Body>
    <Alert variant='warning'>
      <div className="d-flex align-items-center">
        <div>
          <Alert.Heading>Action is restricted ! &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <BsFillExclamationTriangleFill className="mr-2" /></Alert.Heading> 
          <br></br>
          <br></br>
          <p>
            Cannot delete this department because it is referenced by one or more employees.
          </p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={() => handleCloseAlert()} variant="outline-dark">
          Got it
        </Button>
      </div>
    </Alert>
  </Modal.Body>
</Modal>



    <ToastContainer />
    <div className='DepartmentContent'>
      <h5 className="d-flex justify-content-center align-items-center" >Department Details</h5> 
      <hr/>
      <Button variant="success" onClick={()=>handleShowAdd()} className='AddDepartmentButton'>Add Department</Button>
        <Table striped bordered hover className='DepartmentTable'>
      <thead>
        <tr >
          <th className="text-center">Department Code</th>
          <th className="text-center">Department Name</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {
          departmentData && departmentData.length>0?
          departmentData.map((department)=>
                  <tr key={department.departmentId}>
                    <td>{department.departmentCode}</td>
                    <td>{department.departmentName}</td>
                    <td className="d-flex justify-content-center align-items-center">
                         <Button variant='primary' onClick={()=>{getDepartmentById(department.departmentId); setdepartmentIdNeedToUpdate(department.departmentId); handleShowEdit()}} >Edit</Button> &nbsp;
                         <Button variant='danger' onClick={()=>{setDepartmentIdNeedToDelete(department.departmentId); handleShowDelete();}}>Delete</Button>
                    </td>
                </tr>
          ):""
        }
      </tbody>
    </Table>
    { departmentData && departmentData.length === 0 ?
           <Alert variant="danger"  dismissible>
           <Alert.Heading>Oh snap! You got an error! Data is not Loaded</Alert.Heading>
           <p>
             No data or Server is not up & runnig at this moment. 
            </p>
            <Button variant="light" onClick={()=>fetchDepartmentData()}>Fetch</Button>
         </Alert>:
          ""
       }
  </div>




  {/* add department modal */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Deparment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>{errorMessageDepartmentSave && <div style={{ color: 'red' }}>{errorMessageDepartmentSave}</div>}</div>
            <Form.Label htmlFor="departmentCode">Department Code</Form.Label>
            <Form.Control
              type="text"
              id="depID"
              value={departmentCodeSave}
              onChange={(e)=>setDepartmentCodeSave(e.target.value)}
            />
            {errorMessageDepartmentCodeSave && <div style={{ color: 'red' }}>{errorMessageDepartmentCodeSave}</div>}
            <br></br>
            <Form.Label htmlFor="departmentName">Deparment Name</Form.Label>
            <Form.Control
              type="text"
              id="depName"
              value={departmentNameSave}
              onChange={(e)=>setDepartmentNameSave(e.target.value)}
            />
            {errorMessageDepartmentNameSave && <div style={{ color: 'red' }}>{errorMessageDepartmentNameSave}</div>}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleSave()}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    

  {/* update department modal */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Deparment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>{errorMessageDepartmentEdit && <div style={{ color: 'red' }}>{errorMessageDepartmentEdit}</div>}</div>
            <Form.Label htmlFor="departmentCode">Department Code</Form.Label>
            <Form.Control
              type="text"
              id="depID"
              value={departmentCodeEdit}
              onChange={(e)=>setDepartmentCodeEdit(e.target.value)}
            />
            {errorMessageDepartmentCodeEdit && <div style={{ color: 'red' }}>{errorMessageDepartmentCodeEdit}</div>}
            <br></br>
            <Form.Label htmlFor="departmentName">Deparment Name</Form.Label>
            <Form.Control
              type="text"
              id="depName"
              value={departmentNameEdit}
              onChange={(e)=>setDepartmentNameEdit(e.target.value)}
            />
            {errorMessageDepartmentNameEdit && <div style={{ color: 'red' }}>{errorMessageDepartmentNameEdit}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{handleCloseEdit(); setdepartmentIdNeedToUpdate(0);/*reset the department id need to update*/}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleEdit()}}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>



  {/* delete department modal */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you need to permernatly delete this Department information ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{handleCloseDelete(); setDepartmentIdNeedToDelete(0);/**reset department id need to delete when close the modal*/}}>
            Cancle
          </Button>
          <Button variant="danger" onClick={()=>{handleDelete()}}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>


  



  </>

       
  
  )
}

export default Department