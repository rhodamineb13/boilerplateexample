package dto

type AssignTaskDTO struct {
	TaskId     string `json:"task_id" binding:"required"`
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
	Id              string  `json:"id"`
	ClientId        string  `json:"client_id"`
	ClientAddress   string  `json:"client_address"`
	ClientLatitutde float32 `json:"client_latitude"`
	ClientLongitude float32 `json:"client_longitude"`
	Description     string  `json:"description"`
	IsDone          bool    `json:"is_done"`
}
