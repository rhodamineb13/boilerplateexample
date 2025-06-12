package main

import (
	sqlDatabase "godocker/internal/database/sql_database"
	"godocker/internal/handler"
	"godocker/internal/repository"
	"godocker/internal/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	handler := handler.NewAdminHandler(service.NewAdminService(repository.NewAdminRepository(sqlDatabase.DB)))

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"POST", "PUT", "DELETE", "GET", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Cookie", "X-Forwarded-For"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.POST("/login", handler.Login)

	a := r.Group("/api")
	a.POST("/tasks/assign-task", handler.AssignTask)
	a.GET("/employees", handler.GetEmployees)
	a.GET("/me", handler.Me)
	a.GET("/tasks/", handler.ListAllTasks)

	r.Run()
}
