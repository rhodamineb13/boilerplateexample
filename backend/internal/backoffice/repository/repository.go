package backOfficeRepository

import (
	"context"
	backOfficeEntities "godocker/internal/backoffice/models/entities"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"gorm.io/gorm"
)

type Driver uint8

const (
	Postgres Driver = iota
	MongoDB
)

type CRUD[T backOfficeEntities.Entity] interface {
	Create(context.Context, *T) error
	Update(context.Context, *T) error
	Delete(context.Context, uint) error
	Get(context.Context, uint, uint) ([]T, error)
	GetByID(context.Context, uint) (*T, error)
}

type BaseRepository[T backOfficeEntities.Entity] interface {
	CRUD[T]
}

type sqlRepository[T backOfficeEntities.Entity] struct {
	db *gorm.DB
}

type mongoRepository[T backOfficeEntities.Entity] struct {
	db *mongo.Client
}

func NewSQLRepository[T backOfficeEntities.Entity](db *gorm.DB) *sqlRepository[T] {
	return &sqlRepository[T]{
		db: db,
	}
}

func NewMongoRepository[T backOfficeEntities.Entity](db *mongo.Client) *mongoRepository[T] {
	return &mongoRepository[T]{
		db: db,
	}
}

func (sr *sqlRepository[T]) Create(context.Context, *T) error {
	return nil
}

func (sr *sqlRepository[T]) Update(context.Context, *T) error {
	return nil
}

func (sr *sqlRepository[T]) Delete(context.Context, uint) error {
	return nil
}

func (sr *sqlRepository[T]) Get(context.Context, uint, uint) ([]T, error) {
	return nil, nil
}

func (sr *sqlRepository[T]) GetByID(context.Context, uint) (*T, error) {
	return nil, nil
}

func (sr *sqlRepository[T]) DB() *gorm.DB {
	return sr.db
}

func (mr *mongoRepository[T]) Create(context.Context, *T) error {
	return nil
}

func (mr *mongoRepository[T]) Update(context.Context, *T) error {
	return nil
}

func (mr *mongoRepository[T]) Delete(context.Context, uint) error {
	return nil
}

func (mr *mongoRepository[T]) Get(context.Context, uint, uint) ([]T, error) {
	return nil, nil
}

func (mr *mongoRepository[T]) GetByID(context.Context, uint) (*T, error) {
	return nil, nil
}

func (mr *mongoRepository[T]) DB() *mongo.Client {
	return mr.db
}
