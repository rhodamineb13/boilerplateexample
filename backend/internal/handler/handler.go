package handler

import (
	"godocker/internal/models/dto"
	"godocker/internal/models/enums"
	"godocker/internal/models/response"
	"godocker/internal/service"
	"godocker/internal/utils/validator"
	"log"
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

	taskId := c.Param("id")

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

func (h *AdminHandler) GetEmployees(c *gin.Context) {
	var emps []dto.EmployeeDTO
	var err error

	role := c.Query("role")

	if role == "" {
		emps, err = h.service.GetEmployees(c, nil)
	} else {
		if !validator.ValidateRole(role) {
			c.JSON(http.StatusBadRequest, response.Response{
				StatusCode: http.StatusBadRequest,
				Message:    "invalid role",
				Data:       nil,
			})
			return
		}
		r := enums.EmployeeRole(role)
		emps, err = h.service.GetEmployees(c, &r)
	}

	if err != nil {
		c.JSON(http.StatusNotFound, response.Response{
			StatusCode: http.StatusInternalServerError,
			Message:    "unexpected error trying to retrieve data",
			Data:       emps,
		})
		return
	}

	c.JSON(http.StatusOK, response.Response{
		StatusCode: http.StatusOK,
		Message:    "successfully queried data",
		Data:       emps,
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

func (h *AdminHandler) RealLiveTrack(c *gin.Context) {}

func (h *AdminHandler) Logout(c *gin.Context) {

	c.SetCookie("auth_token", "", -1, "/", "localhost", true, false)
	c.JSON(http.StatusOK, &response.Response{
		StatusCode: http.StatusOK,
		Message:    "log out success",
		Data:       nil,
	})
}
