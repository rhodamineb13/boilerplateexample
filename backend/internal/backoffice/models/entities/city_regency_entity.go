package backOfficeEntities

import "time"

type CityOrRegency struct {
	Id                string     `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	ProvinceId        string     `gorm:"column:province_id;type:uuid;not null"`
	CityOrRegencyName string     `gorm:"column:city_or_regency_name;type:uuid;not null"`
	Province          Province   `gorm:"foreignKey:ProvinceId"`
	CreatedAt         time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	UpdatedAt         time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	DeletedAt         *time.Time `gorm:"type:timestamp"`
	Districts         []District
}

func (cr CityOrRegency) GetID() string {
	return cr.Id
}

func (cr CityOrRegency) GetTableName() string {
	return "city_or_regency"
}
