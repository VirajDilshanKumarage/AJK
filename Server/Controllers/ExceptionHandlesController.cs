
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;

namespace ExceptionHandlesController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
       public class ExceptionHandlesController : ControllerBase
    {
        
        private string connetionString ="DefaultConnection";
        private readonly IConfiguration _configuration;
        public ExceptionHandlesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }





        [HttpGet("foreignKeyConstraint/{departmentID}")]
        public IActionResult CheckForeignKeyConstraintViolations(int departmentID)
        {
            string storedProcedure ="CheckForeignKeyConstraints";
            using(SqlConnection connection =new SqlConnection(_configuration.GetConnectionString(connetionString)))
            {
               
             
                  //sql Command for checking fk_constraint violations
                  using (SqlCommand sqlCommandFK = new SqlCommand(storedProcedure,connection))
                  {
                        connection.Open();
                        sqlCommandFK.CommandType =CommandType.StoredProcedure;
                        sqlCommandFK.Parameters.AddWithValue("@DepartmentId",departmentID);

                        int rowsAffected1 = (int)sqlCommandFK.ExecuteScalar();
                        if(rowsAffected1>0)
                        {
                            return Ok(true);// violated the foreign key constrain
                        }
                        else
                        {
                            return Ok(false);// not violated the foreign key constrain
                        }
                  }
                
            }
            
        }
    }
}