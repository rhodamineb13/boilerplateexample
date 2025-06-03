package backOfficeRoute

import (
	backOfficeHandler "godocker/internal/backoffice/handler"

	"github.com/gin-gonic/gin"
)

func AddRoute(r *gin.Engine) {
	taskHandler := &backOfficeHandler.TaskHandler{}
	r.Use()

	task := r.Group("/task")
	task.POST("", taskHandler.AssignTask)
	task.GET("", taskHandler.ListTaskById)
}
