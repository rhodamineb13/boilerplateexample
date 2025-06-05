package backOfficeRepository

import (
	"context"
	backOfficeEntities "godocker/internal/backoffice/models/entities"
	sqlDatabase "godocker/internal/database/sql_database"
	"godocker/internal/repository"

	"go.mongodb.org/mongo-driver/v2/mongo"
)

type ClientRepository interface {
	repository.CRUD[backOfficeEntities.Client]
}

type clientRepository struct {
	repository.BaseRepository[backOfficeEntities.Client]
}

func NewClientRepository(driver repository.Driver) ClientRepository {
	switch driver {
	case repository.SQL:
		return &clientRepository{
			BaseRepository: repository.NewSQLRepository[backOfficeEntities.Client](sqlDatabase.DB),
		}
	case repository.MongoDB:
		return &clientRepository{
			BaseRepository: repository.NewMongoRepository[backOfficeEntities.Client](&mongo.Client{}, "backoffice", "clients"),
		}
	default:
		panic("undefined driver")
	}
}

func (cr *clientRepository) Create(ctx context.Context, entity backOfficeEntities.Client) error {
	return cr.BaseRepository.Create(ctx, entity)
}
func (cr *clientRepository) Update(ctx context.Context, entity backOfficeEntities.Client) error {
	return cr.BaseRepository.Update(ctx, entity)
}
func (cr *clientRepository) Delete(ctx context.Context, id string) error {
	return cr.BaseRepository.Delete(ctx, id)
}
func (cr *clientRepository) Get(ctx context.Context, page, pageSize uint) ([]backOfficeEntities.Client, error) {
	return cr.BaseRepository.Get(ctx, page, pageSize)
}
func (cr *clientRepository) GetByID(ctx context.Context, id string) (*backOfficeEntities.Client, error) {
	entity, err := cr.BaseRepository.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if entity == nil {
		return nil, nil // No document found
	}
	return entity, nil
}
