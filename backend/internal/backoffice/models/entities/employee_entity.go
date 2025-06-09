package backOfficeEntities

import "time"

type Employee struct {
	Id          string     `gorm:"primaryKey;default:uuid_generate_v4()"`
	Username    string     `gorm:"column:username;type:text;not null;unique"`
	Name        string     `gorm:"column:name;type:text;not null;unique"`
	DateOfBirth time.Time  `gorm:"column:date_of_birth;type:date;not null"`
	Address     string     `gorm:"column:address;type:text;not null"`
	CreatedAt   time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	UpdatedAt   time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	DeletedAt   *time.Time `gorm:"type:timestamp"`
}

func (e Employee) GetID() string {
	return e.Id
}

func (e Employee) TableName() string {
	return "employees"
}
