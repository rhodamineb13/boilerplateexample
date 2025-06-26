package entities

import (
	"mime/multipart"
	"time"
)

type News struct {
	Id         string                `gorm:"column:id;type:uuid;primaryKey;not null;default:uuid_generate_v4()"`
	Title      string                `gorm:"column:title;type:text;not null"`
	Subtitle   string                `gorm:"column:subtitle;type:text;not null"`
	EmployeeId string                `gorm:"column:employee_id;type:text;not null"`
	ImageURL   string                `gorm:"column:image_url;type:text;not null"`
	Content    string                `gorm:"column:content;type:text;not null"`
	CreatedAt  time.Time             `gorm:"column:created_at;type:timestamp_tz;not null;default:NOW()"`
	UpdatedAt  time.Time             `gorm:"updated_at;type:timestamp_tz;not null;default:NOW()"`
	DeletedAt  time.Time             `gorm:"deleted_at;type:timestamp_tz;not null;default:NOW()"`
	Image      *multipart.FileHeader `gorm:"-"`
	Employee   Employee              `gorm:"foreignKey:EmployeeId"`
}
