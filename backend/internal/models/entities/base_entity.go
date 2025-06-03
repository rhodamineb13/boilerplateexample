package entities

type Entity interface {
	GetID() string
	TableName() string
}
