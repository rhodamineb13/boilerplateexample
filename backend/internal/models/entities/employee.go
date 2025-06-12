package entities

import (
	"godocker/internal/models/enums"
	"time"
)

type Employee struct {
	Id        string             `gorm:"type:uuid;primaryKey;default:uuid_generate_v4();not null"`
	Name      string             `gorm:"type:varchar(255);not null"`
	Username  string             `gorm:"type:varchar(32);not null;unique"`
	Email     string             `gorm:"type:varchar(255);not null;unique"`
	Password  string             `gorm:"type:text;not null"`
	Role      enums.EmployeeRole `gorm:"type:varchar(32);not null"`
	CreatedAt time.Time          `gorm:"type:timestamp with time zone;not null;default:now()"`
	UpdatedAt time.Time          `gorm:"type:timestamp with time zone;not null;default:now()"`
	DeletedAt *time.Time         `gorm:"type:timestamp with time zone;index"`
}
