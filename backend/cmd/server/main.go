package main

import (
	"backend/internal/config"
	sqlDatabase "backend/internal/database/sql_database"
	"backend/internal/handler"
	"backend/internal/middleware"
	"backend/internal/repository"
	"backend/internal/service"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	sqlDatabase.Connect(sqlDatabase.Postgres)
	handler := handler.NewAdminHandler(service.NewAdminService(repository.NewAdminRepository(sqlDatabase.DB)))

	r := gin.Default()

	// Apply CORS middleware first, before any route definitions
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
		},
		AllowMethods: []string{
			"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS",
		},
		AllowHeaders: []string{
			"Origin", "Content-Length", "Content-Type", "Authorization",
			"Accept", "X-Requested-With", "Cache-Control", "Cookie",
		},
		ExposeHeaders: []string{
			"Content-Length", "Content-Type", "Cookie",
		},
		MaxAge:           12 * time.Hour,
		AllowCredentials: true,
	}))

	r.POST("/login", handler.Login)

	// Define the API group after CORS middleware
	a := r.Group("/api").Use(middleware.Auth())
	{
		a.POST("/tasks/assign-task", handler.AssignTask)
		a.GET("/employees", handler.GetEmployees)
		a.GET("/me", handler.Me)
		a.GET("/tasks", handler.ListAllTasks)
		a.POST("/logout", handler.Logout)
		a.POST("/ws", handler.HandleWS)
		a.POST("/location", handler.HandleSurveyorLocation)
	}

	r.Run()
}
