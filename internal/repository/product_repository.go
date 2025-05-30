package repository

import (
	"context"
	"godocker/internal/models/entities"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"gorm.io/gorm"
)

type ProductRepository interface {
	GetByCategory(context.Context, uint) ([]entities.Product, error)
}

type productRepository struct {
	BaseRepository[entities.Product]
}

func NewProductRepository(driver Driver) ProductRepository {
	switch driver {
	case Postgres:
		return &productRepository{
			NewSQLRepository[entities.Product](&gorm.DB{}),
		}
	case MongoDB:
		return &productRepository{
			NewMongoRepository[entities.Product](&mongo.Client{}),
		}
	default:
		panic("undefined driver")
	}
}

func (pr *productRepository) GetByCategory(ctx context.Context, categoryId uint) ([]entities.Product, error) {
	var products []entities.Product
	return products, nil
}
