package backOfficeEntities

type CityOrRegency struct {
	Id                string   `gorm:"id;primaryKey;default:uuid_generate_v4()"`
	ProvinceId        string   `gorm:"column:province_id;type:uuid;not null"`
	CityOrRegencyName string   `gorm:"column:city_or_regency_name;type:uuid;not null"`
	Province          Province `gorm:"foreignKey:ProvinceId"`
	Districts         []District
}

func (cr CityOrRegency) GetID() string {
	return cr.Id
}

func (cr CityOrRegency) GetTableName() string {
	return "city_or_regency"
}
