package backOfficeHandler

import "github.com/gin-gonic/gin"

type EmployeeHandler struct {
	// Define any dependencies or services needed for the handler
}

func NewEmployeeHandler() *EmployeeHandler {
	return &EmployeeHandler{
		// Initialize any services or dependencies here
	}
}

func (h *EmployeeHandler) Login(c *gin.Context) {
}
