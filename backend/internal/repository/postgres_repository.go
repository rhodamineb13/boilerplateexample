package repository

import (
	"context"
	"godocker/internal/frontoffice/models/entities"

	"gorm.io/gorm"
)

type sqlRepository[T entities.Entity] struct {
	*gorm.DB
}

func (sr *sqlRepository[T]) Create(ctx context.Context, entity T) error {
	return sr.DB.WithContext(ctx).Create(entity).Error
}

func (sr *sqlRepository[T]) Update(ctx context.Context, entity T) error {
	return sr.DB.WithContext(ctx).Save(entity).Error
}

func (sr *sqlRepository[T]) Delete(ctx context.Context, id string) error {
	var s T
	return sr.DB.WithContext(ctx).Where("id = ?", id).Delete(&s).Error
}

func (sr *sqlRepository[T]) Get(ctx context.Context, page, pageSize uint) ([]T, error) {
	var entities []T
	err := sr.DB.WithContext(ctx).Offset(int(page-1) * int(pageSize)).Limit(int(pageSize)).Find(&entities).Error
	if err != nil {
		return nil, err
	}
	return entities, nil
}

func (sr *sqlRepository[T]) GetByID(ctx context.Context, id string) (*T, error) {
	var entity *T
	err := sr.DB.WithContext(ctx).Where("id = ?", id).First(&entity).Error
	if err != nil {
		return nil, err
	}
	return entity, nil
}

func (sr *sqlRepository[T]) Driver() Driver {
	return SQL
}

func NewSQLRepository[T entities.Entity](db *gorm.DB) BaseRepository[T] {
	return &sqlRepository[T]{DB: db}
}
