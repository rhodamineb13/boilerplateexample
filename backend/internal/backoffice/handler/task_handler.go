package backOfficeHandler

import (
	backOfficeDTO "godocker/internal/backoffice/models/dto"
	backOfficeService "godocker/internal/backoffice/service"

	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	service backOfficeService.TaskService
}

func (th *TaskHandler) AssignTask(c *gin.Context) {
	var taskData backOfficeDTO.TaskEmployeeDTO
	if err := c.ShouldBindJSON(&taskData); err != nil {
		c.JSON(400, gin.H{"error": "Invalid task data"})
		return
	}

	if err := th.service.AssignTask(c.Request.Context(), taskData.EmployeeId, taskData.Tasks[0].TaskId); err != nil {
		c.JSON(500, gin.H{"error": "Failed to assign task", "details": err.Error()})
		return
	}
	// Process the task data here
	c.JSON(200, gin.H{"message": "Task assigned successfully", "data": taskData}) // Here you would typically call a service to handle the business logic
}

func (th *TaskHandler) ListTaskByEmployee(c *gin.Context) {}

func (th *TaskHandler) SetDone(c *gin.Context) {}
