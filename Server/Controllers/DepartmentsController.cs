
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;

namespace DepartmentsController.Controllers{
      

    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController:ControllerBase
    {   
        private string connetionString ="DefaultConnection";
        private readonly IConfiguration _configuration;
        public DepartmentsController(IConfiguration configuration){
            _configuration = configuration;
        }


        [HttpGet("getAllDepartment")]
        public IActionResult GetAllDepartments(){

            List<Department> departmentsList = new List<Department>();
            string storedProcedure ="GetDepartmentsDetails";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString(connetionString)))
            {
                connection.Open();
                DataTable departmentTable = new DataTable();
                using (SqlCommand sqlCommand =new SqlCommand(storedProcedure,connection))
                {
                   SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
                   sqlDataAdapter.Fill(departmentTable);
                }

                for(int i=0;i<departmentTable.Rows.Count;i++){
                    Department departmentObj = new Department();
                    departmentObj.DepartmentId = Convert.ToInt32(departmentTable.Rows[i]["department_id"]);
                    departmentObj.DepartmentCode = departmentTable.Rows[i]["department_code"].ToString();
                    departmentObj.DepartmentName = departmentTable.Rows[i]["department_name"].ToString();
                    departmentsList.Add(departmentObj);
                }

                connection.Close();
            }

            return Ok(departmentsList);

        }


        [HttpPost("saveNewDepartment")]
        public IActionResult CreateDepartment([FromBody] SaveDepartment savedepartmentObj)
        {
            string storedProcedure ="InsertNewDepartment";
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString(connetionString)))
            {
                connection.Open();
                using(SqlCommand sqlCommand = new SqlCommand(storedProcedure,connection))
                {
                    sqlCommand.CommandType =CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@DepartmentCode",savedepartmentObj.DepartmentCode);
                    sqlCommand.Parameters.AddWithValue("@DepartmentName",savedepartmentObj.DepartmentName);

                    int rowsAffected = sqlCommand.ExecuteNonQuery();

                    if(rowsAffected>0)
                    {
                        return Ok(savedepartmentObj);
                    }
                    else
                    {
                        return BadRequest("Failed to create department");
                    }
                    
                }
            }

        }


        [HttpPut("updateDepartment/{departmentID}")]
        public IActionResult UpdateDepartment(int departmentID,[FromBody] UpadateDepartment upadateDepartmentObj){

            string storedProcedure ="UpdateDepartment";
            using (SqlConnection connection =new SqlConnection(_configuration.GetConnectionString(connetionString)))
            {
                connection.Open();
                using(SqlCommand sqlCommand=new SqlCommand(storedProcedure,connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    
                    sqlCommand.Parameters.AddWithValue("@DepartmentId",departmentID);
                    sqlCommand.Parameters.AddWithValue("@DepartmentCode",upadateDepartmentObj.DepartmentCode);
                    sqlCommand.Parameters.AddWithValue("@DepartmentName",upadateDepartmentObj.DepartmentName);

                    int rowsAffected =sqlCommand.ExecuteNonQuery();

                    if(rowsAffected>0)
                    {
                        return Ok(upadateDepartmentObj);
                    }
                    else
                    {
                        return BadRequest("fail to update department");
                    }
                }

                
            }

        }


        [HttpDelete("deleteDepartment/{departmentId}")]
        public IActionResult DeleteDepartment(int departmentId)
        {
             string storedProcedureDelete ="DeleteDepartment";
             string storedProcedureForeignkeyConstraint ="CheckNumberOfEmployeeInDepartment";

             using (SqlConnection connection =new SqlConnection(_configuration.GetConnectionString(connetionString)))
             {
                  connection.Open();

                  using (SqlCommand sqlCommandFK = new SqlCommand(storedProcedureForeignkeyConstraint,connection))
                  {
                        sqlCommandFK.CommandType =CommandType.StoredProcedure;
                        sqlCommandFK.Parameters.AddWithValue("@DepartmentId",departmentId);

                        int rowsAffected1 = (int)sqlCommandFK.ExecuteScalar();
                        if(rowsAffected1>0)
                        {
                            return BadRequest("Cannot delete department because it is referenced by one or more employees.");
                        }
                  }


                  using (SqlCommand sqlCommandDelete =new SqlCommand(storedProcedureDelete,connection))
                  {

                     sqlCommandDelete.CommandType =CommandType.StoredProcedure;
                     sqlCommandDelete.Parameters.AddWithValue("@DepartmentId",departmentId);


                     

                     int rowsAffected = sqlCommandDelete.ExecuteNonQuery();
                     
                     if(rowsAffected>0)
                     {
                        return Ok("Department deleted sucessfully");
                     }
                     else
                     {
                        return NotFound("Department not found or failed to delete");
                     }
                  }
             }
        }


        



    }
}