package backOfficeRepository

import (
	"context"
	backOfficeEntities "godocker/internal/backoffice/models/entities"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"gorm.io/gorm"
)

type ProductRepository interface {
	GetByCategory(context.Context, uint) ([]backOfficeEntities.Product, error)
}

type productRepository struct {
	BaseRepository[backOfficeEntities.Product]
}

func NewProductRepository(driver Driver) ProductRepository {
	switch driver {
	case Postgres:
		return &productRepository{
			NewSQLRepository[backOfficeEntities.Product](&gorm.DB{}),
		}
	case MongoDB:
		return &productRepository{
			NewMongoRepository[backOfficeEntities.Product](&mongo.Client{}),
		}
	default:
		panic("undefined driver")
	}
}

func (pr *productRepository) GetByCategory(ctx context.Context, categoryId uint) ([]backOfficeEntities.Product, error) {
	var products []backOfficeEntities.Product
	return products, nil
}
