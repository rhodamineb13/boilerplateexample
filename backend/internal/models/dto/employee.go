package dto

import employeeRole "backend/internal/models/enums/employee_role"

type EmployeeDTO struct {
	Id       string             `json:"id"`
	Name     string             `json:"name"`
	Username string             `json:"username"`
	Email    string             `json:"email"`
	Role     employeeRole.EmployeeRole `json:"role"`
}
