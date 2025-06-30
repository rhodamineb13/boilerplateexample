package entities

import (
	employeeRole "backend/internal/models/enums/employee_role"
	"time"
)

type Employee struct {
	Id             string             `gorm:"type:uuid;primaryKey;default:uuid_generate_v4();not null"`
	Name           string             `gorm:"type:varchar(255);not null"`
	Username       string             `gorm:"type:varchar(32);not null;unique"`
	Email          string             `gorm:"type:varchar(255);not null;unique"`
	Password       string             `gorm:"type:text;not null"`
	Role           employeeRole.EmployeeRole `gorm:"type:varchar(32);not null"`
	DaysPermission int                `gorm:"column:days_permission;type:integer;not null;default:0"`
	DaysAWOL       int                `gorm:"column:days_awol;type:integer;not null;default:0"`
	DaysLate       int                `gorm:"column:days_late;type:integer;not null;default:0"`
	CreatedAt      time.Time          `gorm:"type:timestamp with time zone;not null;default:now()"`
	UpdatedAt      time.Time          `gorm:"type:timestamp with time zone;not null;default:now()"`
	DeletedAt      *time.Time         `gorm:"type:timestamp with time zone;index"`
}
