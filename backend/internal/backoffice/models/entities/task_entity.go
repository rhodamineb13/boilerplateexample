package backOfficeEntities

import "time"

type Task struct {
	Id          string     `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	ClientId    string     `gorm:"column:client_id;type:uuid;not null"`
	Description string     `gorm:"column:description;type:text;not null"`
	IsDone      bool       `gorm:"column:is_done;not null"`
	CreatedAt   time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	UpdatedAt   time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	DeletedAt   *time.Time `gorm:"type:timestamp"`
	Client      Client     `gorm:"foreignKey:ClientId"`
}
