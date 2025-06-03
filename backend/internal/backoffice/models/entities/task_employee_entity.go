package backOfficeEntities

import "time"

type TaskEmployee struct {
	Id         string     `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	EmployeeId string     `gorm:"column:employee_id;type:uuid;not null"`
	TaskId     string     `gorm:"column:task_id;type:uuid;not null"`
	CreatedAt  time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	UpdatedAt  time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	DeletedAt  *time.Time `gorm:"type:timestamp"`
	Employee   Employee   `gorm:"foreignKey:EmployeeId"`
	Task       Task       `gorm:"foreignKey:TaskId"`
}
