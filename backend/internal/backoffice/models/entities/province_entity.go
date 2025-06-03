package backOfficeEntities

type Province struct {
	Id                string `gorm:"id;primaryKey;default:uuid_generate_v4()"`
	Name              string `gorm:"province_name;type:VARCHAR(100);not null"`
	CitiesOrRegencies []CityOrRegency
}

func (pe Province) GetId() string {
	return pe.Id
}

func (pe Province) GetTableName() string {
	return "provinces"
}
