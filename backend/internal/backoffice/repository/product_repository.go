package backOfficeRepository

import (
	"context"
	backOfficeEntities "godocker/internal/backoffice/models/entities"
	sqlDatabase "godocker/internal/database/sql_database"
	"godocker/internal/repository"
)

type ProductRepository interface {
	GetByCategory(context.Context, uint) ([]backOfficeEntities.Product, error)
}

type productRepository struct {
	repository repository.BaseRepository[backOfficeEntities.Product]
}

func NewProductRepository(driver repository.Driver) ProductRepository {
	switch driver {
	case repository.SQL:
		return &productRepository{
			repository: repository.NewSQLRepository[backOfficeEntities.Product](sqlDatabase.DB),
		}
	case repository.MongoDB:
		return &productRepository{}
	default:
		panic("undefined driver")
	}
}

func (pr *productRepository) GetByCategory(ctx context.Context, categoryId uint) ([]backOfficeEntities.Product, error) {
	var products []backOfficeEntities.Product
	return products, nil
}
