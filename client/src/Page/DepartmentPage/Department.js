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

function Department() {
   const baseUrlDepartment='http://localhost:5148/api/Departments';

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
  const [errorMessageDepartmentEdit,setErrorMessageDepartmentEdit]=useState('Please fill all fields');
  const [errorMessageDepartmentCodeEdit,setErrorMessageDepartmentCodeEdit]=useState('Please enter valid department code');
  const [errorMessageDepartmentNameEdit,setErrorMessageDepartmentNameEdit]=useState('Please enter valid department name');
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



   const handleSave=()=>{
   
   // clearErrorMessageSave();

      const post_url=`${baseUrlDepartment}/saveNewDepartment`;

      const newDepartment ={
        "departmentCode": departmentCodeSave,
        "departmentName": departmentNameSave
      }

      
      //validation for all field check all input fields are filled
      function isFilled(data){
         if(data.departmentCode!='' && data.departmentName!=''){
           setErrorMessageDepartmentSave('');
           return true;
         }
         setErrorMessageDepartmentSave('All fields are required');
         return false;
      }

      //validation for Department code in save modal
      function validationDepartmentCode(data){
        if(data.departmentCode!='' && data.departmentCode.length>1){
           setErrorMessageDepartmnetCodeSave('');
           return true;
        }
        setErrorMessageDepartmnetCodeSave('Enter valid departmnet code');
        return false;
      }

      //validation for department name in save modal :- customize the validation and constrains
      function validationDepartmentName(data){
        if(data.departmentName!=''&&data.departmentName.length>1){
          setErrorMessageDepartmentNameSave('');
          return true;
        }
        setErrorMessageDepartmentNameSave('Enter valid department name');
          return false;
      }

      if(isFilled(newDepartment) && validationDepartmentCode(newDepartment) && validationDepartmentName(newDepartment)){

        try{
          axios.post(post_url,newDepartment)
          .then((result)=>{
            handleCloseAdd();
            fetchDepartmentData();
            clearSave();
            toast.success('New Department Added Successfully');

          })
        }catch(error){
          console.log("Error: endpoint, post, newDepartment, Department.js",error);
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
   const [departmentNeedToUpdate,setdepartmentNeedToUpdate] =useState(0);
   const [departmentCodeEdit,setDepartmentCodeEdit]=useState('');
   const [departmentNameEdit,setDepartmentNameEdit] =useState('');
   //clear data in edit modal
   const clearEdit=()=>{
    setDepartmentCodeEdit('');
    setDepartmentNameEdit('');
   }

   const handleEdit=()=>{
   const put_url =`${baseUrlDepartment}/updateDepartment/${departmentNeedToUpdate}`;

    const updateDepartment={
      "departmentCode": departmentCodeEdit,
      "departmentName": departmentNameEdit
    }
    
    clearErrorMessageEdit();     
  
      //validation for all field check all input fields are filled
    function isFilled(data){
        if(data.departmentCode!='' && data.departmentName!=''){
          setErrorMessageDepartmentEdit('');
          return true;
        }
        setErrorMessageDepartmentEdit('All fields are required');
        return false;

     }

     //validation for Department code in edit modal
      function validationDepartmentCode(data){

        for (const department of departmentData) {
          // Skip the current employee being updated
          if (department.employeeId == departmentNeedToUpdate) {
              continue;
          }
      
          if (department.departmentCode == data.departmentCode) {
              setErrorMessageDepartmentCodeEdit("Department code already used");
              return false;
          }
       }

        if(data.departmentCode!='' && data.departmentCode.length>1){
            setErrorMessageDepartmentCodeEdit('');
            return true;
        }
        setErrorMessageDepartmentCodeEdit('Enter valid department code');
        return false;

        
       }

     //validation for department name in edit modal :- customize the validation and constrains
     function validationDepartmentName(data){
       if(data.departmentName!=''&&data.departmentName.length>1){
         setErrorMessageDepartmentNameEdit('');
         return true;
       }
       setErrorMessageDepartmentNameEdit('Enter valid department name');
         return false;
     }


    if(isFilled(updateDepartment) && validationDepartmentCode(updateDepartment) && validationDepartmentName(updateDepartment)){

    try{
      axios.put(put_url,updateDepartment)
      .then((result=>{
        handleCloseEdit();
        clearEdit();
        fetchDepartmentData();
        toast.success("Department successfully updated");
        setdepartmentNeedToUpdate(0);

      }))

    }catch(error){
       console.error('Error: endpoit, put, hendleEdit, Department',error);
       toast.error("anable to update");
    }
  }else{

    console.error("Error: validation, handleEdit");
    toast.error('Department details invalid');

  }

    
  }


   //handle delete department
   const handleDelete=(departmentId)=>{
    alert(departmentId);
   }





  return (

    <>
    <ToastContainer />
    <div className='DepartmentContent'>
      <h5>Department Details</h5> <Button variant="success" onClick={()=>handleShowAdd()}>Add Department</Button>
        <Table striped bordered hover className='DepartmentTable'>
      <thead>
        <tr>
          <th>Department Code</th>
          <th>Department Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          departmentData && departmentData.length>0?
          departmentData.map((department)=>
                  <tr key={department.departmentId}>
                    <td>{department.departmentCode}</td>
                    <td>{department.departmentName}</td>
                    <td>
                         <Button variant='primary' onClick={()=>{getDepartmentById(department.departmentId); setdepartmentNeedToUpdate(department.departmentId); handleShowEdit()}} >Edit</Button> &nbsp;
                         <Button variant='danger' onClick={()=>{handleDelete(department.departmentId)}}>Delete</Button>
                    </td>
                </tr>
          ):""
        }
      </tbody>
    </Table>
    { departmentData && departmentData.length === 0 ?
           <Alert variant="danger"  dismissible>
           <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
           <p>
             No data or Serve is not up & runnig at this moment. 
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
          <Button variant="secondary" onClick={handleCloseEdit}>
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
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancle
          </Button>
          <Button variant="danger" onClick={handleCloseDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>


  </>

       
  
  )
}

export default Department