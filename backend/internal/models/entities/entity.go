package entities

type Entity interface {
	GetID() uint
	TableName() string
}