CREATE DATABASE AJK

use AJK
-- delete table
DROP TABLE Employee;


-- create table called employee
CREATE TABLE Employee (
    employee_id INT IDENTITY(1,1) PRIMARY KEY,
    nic_number VARCHAR(20) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email_address VARCHAR(100),
	mobile_number VARCHAR(10),
    date_of_birth DATE,
    age AS DATEDIFF(YEAR, date_of_birth, GETDATE()) - CASE WHEN GETDATE() < DATEADD(YEAR, DATEDIFF(YEAR, date_of_birth, GETDATE()), date_of_birth) THEN 1 ELSE 0 END,
    gender VARCHAR(10),
	salary DECIMAL(10, 2),
    department_id INT,
	FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

-- add foreign key
ALTER TABLE Employee
ADD CONSTRAINT FK_Employee_Department
FOREIGN KEY (department_id) REFERENCES Department(department_id);


-- create table called Department
CREATE TABLE Department (
    department_id INT IDENTITY(1,1) PRIMARY KEY,
    department_code VARCHAR(50),
    department_name VARCHAR(50)
);




-- insert a employee
INSERT INTO Employee (
    nic_number,
    first_name,
    last_name,
    email_address,
    mobile_number,
    date_of_birth,
    gender,
    salary,
    department_id
)
VALUES (
    '200018201577', -- Replace with actual NIC number
    'Viraj',         -- Replace with actual first name
    'Dilshan',          -- Replace with actual last name
    'viraj123e@email.com', -- Replace with actual email address
    '0722910835',   -- Replace with actual mobile number
    '2000-06-30',   -- Replace with actual date of birth
    'Male',         -- Replace with actual gender
    50000.00,       -- Replace with actual salary
    1            -- Replace with actual department code
);


-- insert a department
INSERT INTO Department(
    department_code,
	department_name
)
VALUES (
    
    'IT100' ,           -- Replace with actual department code
	'IT'                -- Replace with actual department name
);


-- get all employees
select * from Employee

-- get all department
select * from Department




-- to get all emplyee details with department name
-- Create a stored procedure
CREATE PROCEDURE GetEmployeeDetailsWithDepartmentName
AS
BEGIN
    SELECT
	    e.employee_id,
        e.nic_number,
        e.first_name,
        e.last_name,
        e.email_address,
        e.mobile_number,
        e.date_of_birth,
        e.age,
        e.gender,
        e.salary,
        d.department_name
    FROM
        Employee e
    JOIN
        Department d ON e.department_id = d.department_id;
END;

-- execute the created stored procedure GetEmployeeDetailsWithDepartmentName
EXEC GetEmployeeDetailsWithDepartmentName;


--- stored procedure to insert an employee
CREATE PROCEDURE InsertEmployee
    @NicNumber VARCHAR(20),
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @EmailAddress VARCHAR(100),
    @MobileNumber VARCHAR(10),
    @DateOfBirth DATE,
    @Gender VARCHAR(10),
    @Salary DECIMAL(10, 2),
    @DepartmentId INT
AS
BEGIN
    INSERT INTO Employee (
        nic_number,
        first_name,
        last_name,
        email_address,
        mobile_number,
        date_of_birth,
        gender,
        salary,
        department_id
    )
    VALUES (
        @NicNumber,
        @FirstName,
        @LastName,
        @EmailAddress,
        @MobileNumber,
        @DateOfBirth,
        @Gender,
        @Salary,
        @DepartmentId
    );
END;




-- stored procedure for updateing an employee
CREATE PROCEDURE UpdateEmployee
    @EmployeeId INT,
    @NicNumber VARCHAR(20),
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @EmailAddress VARCHAR(100),
    @MobileNumber VARCHAR(10),
    @DateOfBirth DATE,
    @Gender VARCHAR(10),
    @Salary DECIMAL(10, 2),
    @DepartmentId INT
AS
BEGIN
    UPDATE Employee
    SET
	    nic_number = @NicNumber,
        first_name = @FirstName,
        last_name = @LastName,
        email_address = @EmailAddress,
        mobile_number = @MobileNumber,
        date_of_birth = @DateOfBirth,
        gender = @Gender,
        salary = @Salary,
        department_id = @DepartmentId
    WHERE
        employee_id = @EmployeeId;
END;



-- stored procedure for deleting employee
CREATE PROCEDURE DeleteEmployee
    @EmployeeId INT
AS
BEGIN
    DELETE FROM Employee
    WHERE employee_id = @EmployeeId;
END;








-- to get all departments details
-- Create a stored procedure
CREATE PROCEDURE GetDepartmentsDetails
AS
BEGIN
    SELECT
	     d.department_id,
         d.department_code,
		 d.department_name
    FROM
        Department d
END;




--- stored procedure to insert a Department
CREATE PROCEDURE InsertNewDepartment
    @DepartmentCode VARCHAR(50),
	@DepartmentName VARCHAR(50)
AS
BEGIN
    INSERT INTO Department(
        department_code,
		department_name
    )
    VALUES (
        @DepartmentCode,
		@DepartmentName
    );
END;




-- stored procedure for updating department
CREATE PROCEDURE UpdateDepartment
    @DepartmentId INT,
	@DepartmentCode VARCHAR(50),
	@DepartmentName VARCHAR(50)
AS
BEGIN
    UPDATE Department
    SET
	   department_code=@DepartmentCode,
	   department_name=@DepartmentName
    WHERE
       department_id = @DepartmentId
END;


-- stored procedure for deleting a department
CREATE PROCEDURE DeleteDepartment
    @DepartmentId INT
AS
BEGIN
    DELETE FROM Department
    WHERE department_id = @DepartmentId;
END;


-- chek fk constrain
CREATE PROCEDURE CheckNumberOfEmployeeInDepartment
   @DepartmentId INT
AS
BEGIN
    SELECT COUNT (*)
	FROM Employee 
	WHERE department_id=@DepartmentId;
END;








-- get emplyee by id
CREATE PROCEDURE GetEmployeeById 
    @EmployeeId INT
AS
BEGIN
    SELECT
        e.employee_id,
        e.nic_number,
        e.first_name,
        e.last_name,
        e.email_address,
        e.mobile_number,
        e.date_of_birth,
        e.age,
        e.gender,
        e.salary,
        d.department_name
    FROM
        Employee e
    JOIN
        Department d ON e.department_id = d.department_id
    WHERE
        e.employee_id = @EmployeeId;
END;


-- get employee by nic
CREATE PROCEDURE GetEmployeeByNIC
   @EmployeeNic VARCHAR(20)
AS
BEGIN
  SELECT nic_number
  FROM Employee
  WHERE nic_number=@EmployeeNic
END;


-- get department by id
CREATE PROCEDURE GetDepartmentById
   @DepartmentId INT
AS
BEGIN
   SELECT department_code,department_name
   FROM Department
   WHERE department_id=@DepartmentId
END;


-- exec CheckNumberOfEmployeeInDepartment 1;
DROP PROCEDURE IF EXISTS GetDepartmentById;