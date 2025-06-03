package backOfficeEntities

import "time"

type Subdistrict struct {
	Id              string     `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	DistrictId      string     `gorm:"column:district_id;type:uuid;not null"`
	SubdistrictName string     `gorm:"column:subdistrict_name;type:uuid;not null"`
	CreatedAt       time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	UpdatedAt       time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	DeletedAt       *time.Time `gorm:"type:timestamp"`
	CityOrRegency   `gorm:"foreignKey:DistrictId"`
}

func (sd Subdistrict) GetID() string {
	return sd.Id
}

func (sd Subdistrict) GetTableName() string {
	return "subdistrict"
}
