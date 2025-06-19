package dto

import (
	"backend/internal/models/enums"
	"time"
)

type TaskDTO struct {
	Tasks      []Task `json:"tasks"`
	NextCursor string `json:"next_cursor"`
}

type Task struct {
	Id            string             `json:"id"`
	EmployeeId    string             `json:"employee_id"`
	ClientName    string             `json:"client_name"`
	ClientAddress string             `json:"client_address"`
	Latitude      float32            `json:"latitude"`
	Longitude     float32            `json:"longitude"`
	DueDate       time.Time          `json:"due_date"`
	Priority      enums.TaskPriority `json:"priority"`
	Description   string             `json:"description"`
}

type AssignTaskDTO struct {
	TaskId     string `json:"task_id"`
	EmployeeId string `json:"employee_id" binding:"required"`
}
