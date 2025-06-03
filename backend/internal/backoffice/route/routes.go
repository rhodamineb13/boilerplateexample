package backOfficeRoute

import (
	backOfficeHandler "godocker/internal/backoffice/handler"

	"github.com/gin-gonic/gin"
)

func AddRoute(r *gin.Engine) {
	taskHandler := &backOfficeHandler.TaskHandler{}

	b := r.Group("/backoffice")
	b.Use()

	task := b.Group("/task")
	task.POST("", taskHandler.AssignTask)
	task.GET("", taskHandler.ListTaskById)

	form := b.Group("/form")
	form.POST("/post-form")

}
