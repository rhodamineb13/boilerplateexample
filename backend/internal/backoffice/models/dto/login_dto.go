package backOfficeDTO

type LoginRequestDTO struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginResponseDTO struct {
	EmployeeId string `json:"employee_id"`
	Token      string `json:"token"`
}

