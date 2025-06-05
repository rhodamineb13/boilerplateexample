package backOfficeDTO

type TaskDTO struct {
	TaskId        string        `json:"task_id,omitempty"`
	ApplicationId string        `json:"application_id"`
	Description   string        `json:"description"`
	Client        TaskClientDTO `json:"client"`
	IsDone        bool          `json:"is_done"`
}

type TaskClientDTO struct {
	ClientId            string `json:"client_id,omitempty"`
	ClientName          string `json:"client_name"`
	ClientAddress       string `json:"client_address"`
	ClientSubdistrict   string `json:"client_subdistrict"`
	ClientDistrict      string `json:"client_district"`
	ClientCityOrRegency string `json:"client_city_or_regency"`
	ClientProvince      string `json:"client_province"`
	ClientPostalCode    uint32 `json:"client_postal_code"`
}

type TaskEmployeeDTO struct {
	EmployeeId   string    `json:"employee_id,omitempty"`
	Tasks        []*TaskDTO `json:"tasks"`
}
