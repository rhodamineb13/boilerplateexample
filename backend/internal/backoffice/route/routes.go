package backOfficeRoute

import (
	backOfficeHandler "godocker/internal/backoffice/handler"

	"github.com/gin-gonic/gin"
)

func AddRoute(r *gin.Engine) {
	taskHandler := &backOfficeHandler.TaskHandler{}

	b := r.Group("/backoffice")
	b.Use()

	task := b.Group("/tasks")
	task.POST("/assign", taskHandler.AssignTask)
	task.POST("/done", taskHandler.SetDone)
	task.GET("", taskHandler.ListTaskByEmployee)
}
