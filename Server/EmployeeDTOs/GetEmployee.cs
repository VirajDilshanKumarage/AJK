using System.ComponentModel.DataAnnotations;

public class GetEmployee
{
    [Key]

    public int EmployeeId {get; set;}
    public string NicNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string EmailAddress { get; set; }
    public string MobileNumber { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public decimal Salary { get; set; }
  
    public string DepartmentName { get; set; }
   
    // Add more fields as required
}