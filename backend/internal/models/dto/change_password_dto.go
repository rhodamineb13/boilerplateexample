package dto

type ChangePasswordDTO struct {
	EmployeeUname   string
	CurrentPassword string `form:"current_password"`
	NewPassword     string `form:"new_password"`
}
