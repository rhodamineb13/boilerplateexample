package backOfficeEntities

import "time"

type Client struct {
	Id              string `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Name            string
	DateOfBirth     time.Time
	Gender          string
	PhoneNumber     string
	Address         string
	SubdistrictId   string
	DistrictId      string
	CityOrRegencyId string
	ProvinceId      string
	MaritalStatus   string
	Children        uint8
	Job             string
	Salary          uint32
	IDCardPhotoURL  string
	SelfieURL       string
	CreatedAt       time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	UpdatedAt       time.Time  `gorm:"type:timestamp;not null;default:NOW()"`
	DeletedAt       *time.Time `gorm:"type:timestamp"`
}

func (c Client) GetID() string {
	return c.Id
}

func (c Client) TableName() string {
	return "clients"
}