package dto

import "backend/internal/models/enums"

type EmployeeDTO struct {
	Id       string             `json:"id"`
	Name     string             `json:"name"`
	Username string             `json:"username"`
	Email    string             `json:"email"`
	Role     enums.EmployeeRole `json:"role"`
}
