package frontOfficeHandler

import (
	frontOfficeDTO "godocker/internal/frontoffice/models/dto"
	frontOfficeService "godocker/internal/frontoffice/service"
	"github.com/gin-gonic/gin"
)

type EmployeeHandler struct {
	service frontOfficeService.EmployeeService
}

func NewEmployeeHandler(service frontOfficeService.EmployeeService) *EmployeeHandler {
	return &EmployeeHandler{service: service}
}

func (h *EmployeeHandler) Login(c *gin.Context) {
	// Implement login logic here
	var login frontOfficeDTO.LoginRequestDTO

	if err := c.ShouldBindJSON(&login); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request data"})
		return
	}
	// Here you would typically validate the login credentials against a database
	// For now, we'll just return a success message
	token, err := h.service.Login(c, &login)
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid username or password"})
		return
	}
	c.JSON(200, gin.H{"message": "Login successful", "token": token})
}
