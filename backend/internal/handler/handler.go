package handler

import (
	"backend/internal/models/dto"
	"backend/internal/models/response"
	"backend/internal/service"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	clients = make(map[*websocket.Conn]bool)
)

type AdminHandler struct {
	service service.AdminService
}

func NewAdminHandler(service service.AdminService) *AdminHandler {
	return &AdminHandler{service: service}
}

func (h *AdminHandler) AssignTask(c *gin.Context) {
	var req dto.AssignTaskDTO

	taskId := c.Param("id")
	if taskId == "" {
		return
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		return
	}

	req.TaskId = taskId

	if err := h.service.AssignTask(c, req); err != nil {
		c.JSON(http.StatusBadRequest, &response.Response{
			StatusCode: http.StatusBadRequest,
			Message:    "bad request, try again",
			Data:       nil,
		})
		return
	}

	c.JSON(http.StatusOK, &response.Response{
		StatusCode: http.StatusOK,
		Message:    "success",
		Data:       nil,
	})
}

func (h *AdminHandler) ListAllTasks(c *gin.Context) {
	var pagination dto.Pagination

	if err := c.ShouldBindQuery(&pagination); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid pagination parameters"})
		return
	}

	res, err := h.service.ListAllTasks(c, pagination)
	if err != nil {
		return
	}

	log.Println(err)

	c.JSON(http.StatusOK, &response.Response{
		StatusCode: http.StatusOK,
		Message:    "success",
		Data:       res,
	})

}

func (h *AdminHandler) Login(c *gin.Context) {
	var login dto.LoginDTO

	if err := c.ShouldBindJSON(&login); err != nil {
		c.JSON(http.StatusBadRequest, response.Response{
			StatusCode: http.StatusBadRequest,
			Message:    "bad request",
			Data:       nil,
		})

		return
	}

	log.Println(login)

	tok, err := h.service.Login(c, login)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusUnauthorized, response.Response{
			StatusCode: http.StatusUnauthorized,
			Message:    "wrong email or password",
			Data:       nil,
		})
		return
	}

	log.Println("token: ", tok)

	c.SetCookie("auth_token", tok, 3600*24, "/", "localhost", false, false)
	c.JSON(http.StatusOK, response.Response{
		StatusCode: http.StatusOK,
		Message:    "successfully logged in",
		Data:       nil,
	})
}

func (h *AdminHandler) Me(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"authenticated": true,
	})
}

func (h *AdminHandler) HandleSurveyorLocation(c *gin.Context) {
	var s dto.SurveyorLocationDTO

	if err := c.ShouldBindJSON(&s); err != nil {
		c.JSON(http.StatusBadRequest, response.Response{
			StatusCode: http.StatusBadRequest,
			Message:    fmt.Sprintf("bad request: %v", err),
			Data:       nil,
		})
		return
	}

	for ws := range clients {
		ws.WriteJSON(s)
	}

	c.Status(http.StatusNoContent)
}

func (h *AdminHandler) HandleWS(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, c.Request.Response.Header)
	if err != nil {
		c.JSON(http.StatusInternalServerError, response.Response{
			StatusCode: http.StatusInternalServerError,
			Message:    fmt.Sprintf("failed in making connection to websocket: %v", err),
			Data:       nil,
		})
	}

	defer conn.Close()

	for {
		if _, _, err = conn.NextReader(); err != nil {
			delete(clients, conn)
			break
		}
	}
}

func (h *AdminHandler) Logout(c *gin.Context) {

	c.SetCookie("auth_token", "", -1, "/", "localhost", true, false)
	c.JSON(http.StatusOK, &response.Response{
		StatusCode: http.StatusOK,
		Message:    "log out success",
		Data:       nil,
	})
}

func (h *AdminHandler) GetUnassignedSurveyors(c *gin.Context) {
	surv, err := h.service.GetUnassignedSurveyors(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, response.Response{
			StatusCode: http.StatusInternalServerError,
			Message:    fmt.Sprintf("unexpected error: %v", err),
			Data:       nil,
		})
		return
	}

	c.JSON(http.StatusOK, response.Response{
		StatusCode: http.StatusOK,
		Message:    "data successfully retrieved",
		Data:       surv,
	})
}

func (h *AdminHandler) GetAssignedSurveyors(c *gin.Context) {
	surv, err := h.service.GetAssignedSurveyors(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, response.Response{
			StatusCode: http.StatusInternalServerError,
			Message:    fmt.Sprintf("unexpected error: %v", err),
			Data:       nil,
		})
		return
	}

	c.JSON(http.StatusOK, response.Response{
		StatusCode: http.StatusOK,
		Message:    "data successfully retrieved",
		Data:       surv,
	})
}

func (h *AdminHandler) CreateNews(c *gin.Context) {
	var req dto.NewsRequestDTO

	employeeId, ok := c.Get("employee_id")
	if !ok {
		c.AbortWithStatusJSON(http.StatusUnauthorized, "bad")
		return
	}

	req.EmployeeId = employeeId.(string)

	if err := c.ShouldBind(&req); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "bad")
		return
	}

	if err := h.service.CreateNews(c, req); err != nil {
		fmt.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, "server error")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": req,
	})
}

func (h *AdminHandler) GetNews(c *gin.Context) {
	news, err := h.service.GetNews(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, response.Response{
			StatusCode: http.StatusInternalServerError,
			Message:    fmt.Sprintf("unexpected error: %v", err),
			Data:       nil,
		})
		return
	}

	c.JSON(http.StatusOK, response.Response{
		StatusCode: http.StatusOK,
		Message:    "data successfully retrieved",
		Data:       news,
	})

}

func (h *AdminHandler) GetLatestNews(c *gin.Context) {

}
