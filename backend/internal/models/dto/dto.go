package dto

import (
	"godocker/internal/models/enums"
	"time"
)

type AssignTaskDTO struct {
	TaskId     string
	EmployeeId string `json:"employee_id" binding:"required"`
}

// type FormDTO struct {
// 	ClientName                 string    `json:"client_name"`
// 	ClientDateOfBirth          time.Time `json:"client_dob"`
// 	ClientEmailAddress         string    `json:"client_email_address,omitempty"`
// 	ClientPhoneNumber          string    `json:"client_phone_number"`
// 	ClientAddress              string    `json:"client_address"`
// 	ClientProvinceId           string    `json:"client_province_id"`
// 	ClientCityId               string    `json:"client_city_id"`
// 	ClientDistrictId           string    `json:"client_district_id"`
// 	ClientSubdistrictId        string    `json:"client_subdistrict_id"`
// 	ClientMaritalStatus        uint8     `json:"client_marital_status"`
// 	ClientNumberOfDependencies uint8     `json:"client_number_of_dependencies"`
// 	ClientJob                  string    `json:"client_job"`
// 	ClientSalary               float32   `json:"client_salary"`
// }

type LoginDTO struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type TaskDTO struct {
	Tasks      []Task `json:"tasks"`
	NextCursor string `json:"next_cursor"`
}

type Task struct {
	Id            string             `json:"id"`
	EmployeeId    string             `json:"employee_id"`
	ClientName    string             `json:"client_name"`
	ClientAddress string             `json:"client_address"`
	Latitude      float32            `json:"latitude"`
	Longitude     float32            `json:"longitude"`
	DueDate       time.Time          `json:"due_date"`
	Priority      enums.TaskPriority `json:"priority"`
	Description   string             `json:"description"`
}
