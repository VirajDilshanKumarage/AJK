import React, { useEffect, useState } from 'react'
import './Department.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

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



  //get all department 
  const [departmentData,setDepartmentData]=useState([]);

    //fetching all employees
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








  return (

    <>
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
                    <td>Otto</td>
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
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseAdd}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    

  {/* update department modal */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Deparment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>



  {/* delete department modal */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>Comfirm the Delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCloseDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


  </>

       
  
  )
}

export default Department