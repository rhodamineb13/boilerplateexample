package entities

import (
	"backend/internal/models/enums"
	"time"
)

type Task struct {
	Id              string             `gorm:"type:uuid;primaryKey;default:uuid_generate_v4();not null"`
	EmployeeId      string             `gorm:"type:varchar(255);not null"`
	ClientName      string             `gorm:"type:varchar(255);not null"`
	ClientAddress   string             `gorm:"type:varchar(255);not null"`
	ClientLatitude  float32            `gorm:"type:float;not null"`
	ClientLongitude float32            `gorm:"type:float;not null"`
	Description     string             `gorm:"type:varchar(255);not null"`
	IsDone          bool               `gorm:"type:boolean;not null;default:false"`
	Priority        enums.TaskPriority `gorm:"type:varchar(10);not null"`
	CreatedAt       time.Time          `gorm:"not null;default:now()"`
	UpdatedAt       time.Time          `gorm:"not null;default:now()"`
	DeletedAt       time.Time          `gorm:"column:deleted_at"`
	Employee        Employee           `gorm:"foreignKey:EmployeeId;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT"`
}
