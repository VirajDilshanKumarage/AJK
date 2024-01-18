using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;


namespace EmployeesController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
       public class EmployeesController : ControllerBase
    {
         private string connetionString ="DefaultConnection";
        private readonly IConfiguration _configuration;
        public EmployeesController(IConfiguration configuration)
        {
               _configuration = configuration;
        }


       

        [HttpGet("getAllEmployees")]
        public IActionResult GetAllEmployees()
        {

            List<GetEmployee> getEmployeeList =new List<GetEmployee>();
            
            string storedProcedure ="GetEmployeeDetailsWithDepartmentName";// stroed procedure for get all emplyee's details with department name instead of department code

            using (SqlConnection connection =new SqlConnection(_configuration.GetConnectionString(connetionString)))
            {
                DataTable employeeTable = new DataTable();
                using (SqlCommand sqlCommand = new SqlCommand(storedProcedure,connection))
                {
                    connection.Open();
                    SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
                    sqlDataAdapter.Fill(employeeTable);
                }

                for(int i=0;i<employeeTable.Rows.Count;i++)
                {
                        GetEmployee getEmployeeObj = new GetEmployee();
                        getEmployeeObj.EmployeeId =Convert.ToInt32(employeeTable.Rows[i]["employee_id"]);
                        getEmployeeObj.NicNumber= employeeTable.Rows[i]["nic_number"].ToString();
                        getEmployeeObj.FirstName= employeeTable.Rows[i]["first_name"].ToString();
                        getEmployeeObj.LastName= employeeTable.Rows[i]["last_name"].ToString();
                        getEmployeeObj.EmailAddress= employeeTable.Rows[i]["email_address"].ToString();
                        getEmployeeObj.MobileNumber= employeeTable.Rows[i]["mobile_number"].ToString();
                        getEmployeeObj.DateOfBirth = Convert.ToDateTime(employeeTable.Rows[i]["date_of_birth"]);
                        getEmployeeObj.Age =Convert.ToInt32(employeeTable.Rows[i]["age"]);
                        getEmployeeObj.Gender= employeeTable.Rows[i]["gender"].ToString();
                        getEmployeeObj.Salary= Convert.ToDecimal(employeeTable.Rows[i]["salary"]);
                        getEmployeeObj.DepartmentName= employeeTable.Rows[i]["department_name"].ToString();

                        getEmployeeList.Add(getEmployeeObj);
                }

                connection.Close();

            }
            return Ok(getEmployeeList);
        
        }


        [HttpGet("getEmployeeById/{employeeID}")]
        public IActionResult GetEmplyeeById(int employeeID)
        {  
             GetEmployee employee = null;
            string storedProcedure ="GetEmployeeById";
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString(connetionString)))
            {    
                
                connection.Open();
                using( SqlCommand sqlCommand = new SqlCommand(storedProcedure,connection))
                {
                       sqlCommand.CommandType=CommandType.StoredProcedure;
                       sqlCommand.Parameters.AddWithValue("@EmployeeId",employeeID);

                       using (SqlDataReader reader = sqlCommand.ExecuteReader())
                       {
                             if(reader.Read())
                             {
                                employee = new GetEmployee();
                                employee.EmployeeId=(int)reader["employee_id"];
                                employee.NicNumber=reader["nic_number"].ToString();
                                employee.FirstName=reader["first_name"].ToString();
                                employee.LastName=reader["last_name"].ToString();
                                employee.EmailAddress=reader["email_address"].ToString();
                                employee.MobileNumber=reader["mobile_number"].ToString();
                                employee.DateOfBirth=Convert.ToDateTime(reader["date_of_birth"]);
                                employee.Age=(int)reader["age"];
                                employee.Gender=reader["gender"].ToString();
                                employee.Salary=Convert.ToDecimal(reader["salary"]);
                                employee.DepartmentName=reader["department_name"].ToString();
                             }

                            connection.Close();
                       }
                       
                }
            }

            return Ok(employee);
        }

        

        

        [HttpPost("saveNewEmployee")]
        public IActionResult CreateEmployee([FromBody] SaveEmployee saveEmployeeObj)
        {
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString(connetionString)))
            {
                connection.Open();

                using (SqlCommand sqlCommand = new SqlCommand("InsertEmployee",connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;
                    
                    sqlCommand.Parameters.AddWithValue("@NicNumber", saveEmployeeObj.NicNumber);
                    sqlCommand.Parameters.AddWithValue("@FirstName",saveEmployeeObj.FirstName);
                    sqlCommand.Parameters.AddWithValue("@LastName", saveEmployeeObj.LastName);
                    sqlCommand.Parameters.AddWithValue("@EmailAddress", saveEmployeeObj.EmailAddress);
                    sqlCommand.Parameters.AddWithValue("@MobileNumber", saveEmployeeObj.MobileNumber);
                    sqlCommand.Parameters.AddWithValue("@DateOfBirth",saveEmployeeObj.DateOfBirth);
                    sqlCommand.Parameters.AddWithValue("@Gender", saveEmployeeObj.Gender);
                    sqlCommand.Parameters.AddWithValue("@Salary", saveEmployeeObj.Salary);
                    sqlCommand.Parameters.AddWithValue("@DepartmentId", saveEmployeeObj.DepartmentId);


                    int rowsAffected = sqlCommand.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok(saveEmployeeObj);
                    }
                    else
                    {
                        return BadRequest("Failed to create employee");
                    }
                } 
            }
        }




        [HttpPut("updateEmployee/{employeeID}")]
        public IActionResult UpdateEmployee(int employeeID, [FromBody] UpdateEmployee updatedEmployee)
        {
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString(connetionString)))
            {
                connection.Open();

                using (SqlCommand sqlCommand = new SqlCommand("UpdateEmployee", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;

                    sqlCommand.Parameters.AddWithValue("@EmployeeId", employeeID);
                    sqlCommand.Parameters.AddWithValue("@NicNumber", updatedEmployee.NicNumber);
                    sqlCommand.Parameters.AddWithValue("@FirstName", updatedEmployee.FirstName);
                    sqlCommand.Parameters.AddWithValue("@LastName", updatedEmployee.LastName);
                    sqlCommand.Parameters.AddWithValue("@EmailAddress", updatedEmployee.EmailAddress);
                    sqlCommand.Parameters.AddWithValue("@MobileNumber", updatedEmployee.MobileNumber);
                    sqlCommand.Parameters.AddWithValue("@DateOfBirth", updatedEmployee.DateOfBirth);
                    sqlCommand.Parameters.AddWithValue("@Gender", updatedEmployee.Gender);
                    sqlCommand.Parameters.AddWithValue("@Salary", updatedEmployee.Salary);
                    sqlCommand.Parameters.AddWithValue("@DepartmentId", updatedEmployee.DepartmentId);

                    int rowsAffected = sqlCommand.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok("Employee updated successfully");
                    }
                    else
                    {
                        return BadRequest("Failed to update employee");
                    }
                }
            }
        }




        [HttpDelete("deleteEmployee/{employeeID}")]
        public IActionResult DeleteEmployee(int employeeID)
        {
            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString(connetionString)))
            {
                connection.Open();

                using (SqlCommand sqlCommand = new SqlCommand("DeleteEmployee", connection))
                {
                    sqlCommand.CommandType = CommandType.StoredProcedure;

                 
                    sqlCommand.Parameters.AddWithValue("@EmployeeId", employeeID);

                    int rowsAffected = sqlCommand.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok("Employee deleted successfully");
                    }
                    else
                    {
                        return NotFound("Employee not found or failed to delete");
                    }
                }
            }
        }
        
    }
}