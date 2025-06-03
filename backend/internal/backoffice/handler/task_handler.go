package backOfficeHandler

import "github.com/gin-gonic/gin"

type TaskHandler struct {
}

func (th *TaskHandler) AssignTask(c *gin.Context) {}

func (th *TaskHandler) ListTaskById(c *gin.Context) {}

func (th *TaskHandler) SetDone(c *gin.Context) {}