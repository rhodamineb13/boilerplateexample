package backOfficeEntities

import "time"

type Province struct {
	Id                string     `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Name              string     `gorm:"province_name;type:VARCHAR(100);not null"`
	CreatedAt         time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	UpdatedAt         time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	DeletedAt         *time.Time `gorm:"type:timestamp"`
	CitiesOrRegencies []CityOrRegency
}

func (pe Province) GetId() string {
	return pe.Id
}

func (pe Province) GetTableName() string {
	return "provinces"
}
