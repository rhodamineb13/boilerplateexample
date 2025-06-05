package entities

import "time"

type Product struct {
	Id          string
	Name        string
	CategoryId  uint
	Description string
	Quantity    uint
	Price       float32
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   time.Time
}

func (p Product) GetID() string {
	return p.Id
}

func (p Product) TableName() string {
	return "products"
}