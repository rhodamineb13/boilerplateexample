package backOfficeEntities

type District struct {
	Id              string        `gorm:"id;primaryKey;default:uuid_generate_v4()"`
	CityOrRegencyId string        `gorm:"column:city_or_regency_id;type:uuid;not null"`
	DistrictName    string        `gorm:"column:district_name;type:uuid;not null"`
	CityOrRegency   CityOrRegency `gorm:"foreignKey:CityOrRegencyId"`
	Subdistricts    []Subdistrict
}

func (d District) GetID() string {
	return d.Id
}

func (d District) GetTableName() string {
	return "district"
}
