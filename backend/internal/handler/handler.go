package handler

import (
	"fmt"
	"godocker/internal/models/dto"
	"godocker/internal/models/enums"
	"godocker/internal/models/response"
	"godocker/internal/service"
	"godocker/internal/utils/validator"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AdminHandler struct {
	service service.AdminService
}

func NewAdminHandler(service service.AdminService) *AdminHandler {
	return &AdminHandler{service: service}
}

func (h *AdminHandler) AssignTask(c *gin.Context) {
	var req dto.AssignTaskDTO

	if err := c.ShouldBindJSON(&req); err != nil {
		return
	}

	if err := h.service.AssignTask(c, req); err != nil {
		return
	}

	c.JSON(http.StatusOK, &response.Response{
		StatusCode: http.StatusOK,
		Message:    "success",
		Data:       nil,
	})
}

func (h *AdminHandler) ListAllTasks(c *gin.Context) {
	var pagination *dto.Pagination

	if err := c.ShouldBindQuery(&pagination); err != nil {
		return
	}

	list, err := h.service.ListAllTasks(c, pagination)
	if err != nil {
		return
	}

	c.JSON(http.StatusOK, &response.Response{
		StatusCode: http.StatusOK,
		Message:    "success",
		Data:       list,
	})

}

func (h *AdminHandler) GetEmployees(c *gin.Context) {
	role := c.Query("role")

	if !validator.ValidateRole(role) {
		c.JSON(http.StatusBadRequest, "invalid role")
		return
	}
	emps, err := h.service.GetEmployees(c, enums.EmployeeRole(role))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"aaa": "bbbb"})
		return
	}

	c.JSON(http.StatusOK, emps)

}

func (h *AdminHandler) Login(c *gin.Context) {
	var login dto.LoginDTO

	if err := c.ShouldBindJSON(&login); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("bad request: %v", err),
		})

		return
	}

	tok, err := h.service.Login(c, login)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": fmt.Sprintf("bad request: %v", err),
		})
		return
	}

	c.SetCookie("auth_token", tok, 3600*24, "/", "localhost", true, true)
}

func (h *AdminHandler) Me(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"authenticated": true,
	})
}

func (h *AdminHandler) RealLiveTrack(c *gin.Context) {}
