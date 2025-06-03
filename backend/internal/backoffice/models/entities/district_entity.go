package backOfficeEntities

import "time"

type District struct {
	Id              string        `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	CityOrRegencyId string        `gorm:"column:city_or_regency_id;type:uuid;not null"`
	PostalCode      string        `gorm:"column:postal_code;type:integer;not null"`
	DistrictName    string        `gorm:"column:district_name;type:uuid;not null"`
	CreatedAt       time.Time     `gorm:"type:timestamp;not null;default:NOW()"`
	UpdatedAt       time.Time     `gorm:"type:timestamp;not null;default:NOW()"`
	DeletedAt       *time.Time    `gorm:"type:timestamp"`
	CityOrRegency   CityOrRegency `gorm:"foreignKey:CityOrRegencyId"`
	Subdistricts    []*Subdistrict
}

func (d District) GetID() string {
	return d.Id
}

func (d District) GetTableName() string {
	return "district"
}
