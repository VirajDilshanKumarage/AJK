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
import { BsBuilding } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillSave } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';




function Department() {
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
  

  // api http urls
  const baseUrlDepartment='http://localhost:5148/api/Departments';
  const baseUrlExceptionHandle='http://localhost:5148/api/ExceptionHandles';

  //const for Add department modal
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => {setShowAdd(false); clearErrorMessageSave()}
  const handleShowAdd = () => {
    fetchDepartmentData();//just refreshing department data to check the server is up & running ro down
    setShowAdd(true)
  };

  //const for Edit department modal
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => {setShowEdit(false); clearErrorMessageEdit()}
  const handleShowEdit = () => setShowEdit(true);

  //const for Delete department modal
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => {
    setDeleteConfirmation('');
    setErrorMessageDeleteConfirmation('');
    setShowDelete(false)
  };
  const handleShowDelete = () => setShowDelete(true);

  //const for Alert box
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);
  

  //validation pattern for department name connot include number for department name
  const PatternForDepartmentName = /\d/;  // regular expression for validate department name use in save and edit modal

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

  //validation cost in delete modal to check the deletion is confirm or not
  const [errorMessageDeleteConfirmation,setErrorMessageDeleteConfirmation] =useState('');



  //get all department 
  const [departmentData,setDepartmentData]=useState([]);
  const fetchDepartmentData=async ()=>{
      
      try{
      const get_url=`${baseUrlDepartment}/getAllDepartment`; //end point
      const response = await axios.get(get_url);
      setDepartmentData(response.data);
      }catch(error) {
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


  //save department methodt
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
        
        if(data.departmentName!=='' && data.departmentName.length>1 && !PatternForDepartmentName.test(data.departmentName)){
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
        console.error("Error: validation, Department, new Department, inside the hadleSave method");
        toast.error('Department details invalid');
      }

       
  } 




  //get existing department details and fill the edit modal using get department by id
  const getDepartmentById=async (_departmentId)=>{
          const getById_url =`${baseUrlDepartment}/getDepartmentById/${_departmentId}`;

          try {
            const response = await axios.get(getById_url);
            // Fill the input rows in the edit form
            const department = response.data;
            setDepartmentCodeEdit(department.departmentCode);
            setDepartmentNameEdit(department.departmentName);
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
  
  //update data handleing
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
       if(data.departmentName!=='' && data.departmentName.length>1 && !PatternForDepartmentName.test(data.departmentName)){
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
  const [deleteConfirmation,setDeleteConfirmation] =useState('');//set delete conformation string;
  const handleDelete = async () => {
    const delete_url = `${baseUrlDepartment}/deleteDepartment/${departmentIdNeedToDelete}`;
  
    try {
      // Check if there is a foreign key constraint violation
      const isForeignKeyViolation = await checkForeignKeyConstraintViolations(departmentIdNeedToDelete);
       
      if(deleteConfirmation.toLocaleLowerCase()=='confirm'){
          setErrorMessageDeleteConfirmation('');
          setDeleteConfirmation('');

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
                  serverResponseFaliur_1();
                
                } else if (error.request) {
                  // The request was made, but no response was received
                  console.error('No response received from the server:', error.request);
                  serverResponseFaliur_2();
                  
                } else {
                  // Something went wrong in setting up the request
                  console.error('Error setting up the request:', error.message);
                  serverResponseFaliur_3();
                  
                }
              } else {
                // Not an Axios error, handle it accordingly
                console.error('Non-Axios error occurred:', error);
                serverResponseFaliur_4();
                
              }
            }

          } else {
            // There is a foreign key constraint violation, handle accordingly
            handleCloseDelete();
            handleShowAlert();
          // toast.error('Employees are depend on this department');
          }
     }
     else{
          setDeleteConfirmation('');
          setErrorMessageDeleteConfirmation("This action is Not Confirm, type as 'confirm' to delete this department");
     }
    } catch (error) {
      console.error("Error checking foreign key constraint", error);
      toast.error("Failed to check foreign key constraint");
    }
  };
  





  
 

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


                  {/* tost message */}
                  <ToastContainer />
                  {/* table of cantent */}
                  <div className='DepartmentContent'>
                    <h5 className="d-flex justify-content-center align-items-center" >Department Details</h5> 
                    <hr/>
                    <Button variant="success" onClick={()=>handleShowAdd()} className='AddDepartmentButton'>Add Department<BsBuilding className='m-2'/></Button>
                      <Table striped bordered hover className='DepartmentTable'>
                    <thead >
                      <tr>
                        <th className="text-center">department code</th>
                        <th className="text-center">department name</th>
                        <th className="text-center">action</th>
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
                                      <Button variant='primary' onClick={()=>{getDepartmentById(department.departmentId); setdepartmentIdNeedToUpdate(department.departmentId); handleShowEdit()}} >Edit<BsPencil className='m-1'/></Button> &nbsp;
                                      <Button variant='danger' onClick={()=>{setDepartmentIdNeedToDelete(department.departmentId); handleShowDelete();}}>Delete<BsTrash className='m-1'/></Button>
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
                          {/* when the click fetch button in department component it should  call the fetchDepartmentData() */}

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
                              <div>{errorMessageDepartmentSave && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDepartmentSave}</div>}</div>
                              <Form.Label htmlFor="departmentCode">Department Code</Form.Label>
                              <Form.Control
                                type="text"
                                id="depID"
                                value={departmentCodeSave}
                                placeholder='eg: IT102'
                                onChange={(e)=>setDepartmentCodeSave(e.target.value)}
                              />
                              {errorMessageDepartmentCodeSave && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDepartmentCodeSave}</div>}
                              <br></br>
                              <Form.Label htmlFor="departmentName">Deparment Name</Form.Label>
                              <Form.Control
                                type="text"
                                id="depName"
                                value={departmentNameSave}
                                placeholder='eg: Information Technology'
                                onChange={(e)=>setDepartmentNameSave(e.target.value)}
                              />
                              {errorMessageDepartmentNameSave && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDepartmentNameSave}</div>}

                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAdd}>
                              Close
                              <AiOutlineClose className='m-1'/>
                            </Button>
                            <Button variant="success" onClick={()=>{handleSave()}}>
                              Save
                              <AiFillSave className='m-1'/>
                            </Button>
                          </Modal.Footer>
                  </Modal>
                

                  {/* update department modal */}
                  <Modal show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Deparment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div>{errorMessageDepartmentEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDepartmentEdit}</div>}</div>
                        <Form.Label htmlFor="departmentCode">Department Code</Form.Label>
                        <Form.Control
                          type="text"
                          id="depID"
                          value={departmentCodeEdit}
                          placeholder='eg: IT102'
                          onChange={(e)=>setDepartmentCodeEdit(e.target.value)}
                        />
                        {errorMessageDepartmentCodeEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDepartmentCodeEdit}</div>}
                        <br></br>
                        <Form.Label htmlFor="departmentName">Deparment Name</Form.Label>
                        <Form.Control
                          type="text"
                          id="depName"
                          value={departmentNameEdit}
                          placeholder='eg: Information Technology'
                          onChange={(e)=>setDepartmentNameEdit(e.target.value)}
                        />
                        {errorMessageDepartmentNameEdit && <div className='ErrorMessage'><BsFillExclamationTriangleFill className='m-2'/>{errorMessageDepartmentNameEdit}</div>}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={()=>{handleCloseEdit(); setdepartmentIdNeedToUpdate(0);/*reset the department id need to update*/}}>
                        Close
                        <AiOutlineCheck className='m-1'/>
                      </Button>
                      <Button variant="primary" onClick={()=>{handleEdit()}}>
                        Update
                        <AiFillEdit className='m-1'/>
                      </Button>
                    </Modal.Footer>
                  </Modal>


                  {/* delete department modal */}
                  <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Department</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you need to permernatly delete this Department information ? if so just type as '<span style={{color:'red'}}>confirm</span>' then click ok
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
                      <Button variant="secondary" onClick={()=>{handleCloseDelete(); setDepartmentIdNeedToDelete(0);/**reset department id need to delete when close the modal*/}}>
                        Cancle
                        <AiOutlineClose className='m-1'/>
                      </Button>
                      <Button variant="danger" onClick={()=>{handleDelete()}}>
                        Ok
                        <AiOutlineCheck className='m-1'/>
                      </Button>
                    </Modal.Footer>
                  </Modal>

              </>

      
  )
}

export default Department