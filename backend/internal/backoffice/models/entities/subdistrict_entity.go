package backOfficeEntities

type Subdistrict struct {
	Id            string `gorm:"id;primaryKey;default:uuid_generate_v4()"`
	DistrictId    string `gorm:"column:district_id;type:uuid;not null"`
	SubdistrictName  string `gorm:"column:subdistrict_name;type:uuid;not null"`
	CityOrRegency `gorm:"foreignKey:DistrictId"`
}

func (sd Subdistrict) GetID() string {
	return sd.Id
}

func (sd Subdistrict) GetTableName() string {
	return "subdistrict"
}
