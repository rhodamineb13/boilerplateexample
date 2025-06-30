package dto

import (
	taskPriorityEnum "backend/internal/models/enums/task_priority"
	"time"
)

type TaskDTO struct {
	Tasks      []Task `json:"tasks"`
	NextCursor string `json:"next_cursor"`
}

type Task struct {
	Id            string                        `json:"id"`
	EmployeeId    string                        `json:"employee_id"`
	EmployeeName  string                        `json:"employee_name"`
	ClientName    string                        `json:"client_name"`
	ClientAddress string                        `json:"client_address"`
	Latitude      float32                       `json:"latitude"`
	Longitude     float32                       `json:"longitude"`
	DueDate       *time.Time                    `json:"due_date,omitempty"`
	Priority      taskPriorityEnum.TaskPriority `json:"priority"`
	Description   string                        `json:"description"`
}

type AssignTaskDTO struct {
	TaskId     string `json:"task_id"`
	EmployeeId string `json:"employee_id" binding:"required"`
}
