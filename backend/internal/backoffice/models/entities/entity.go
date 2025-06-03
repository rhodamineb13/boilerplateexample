package backOfficeEntities

type Entity interface {
	GetID() string
	TableName() string
}