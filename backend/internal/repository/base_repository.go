package repository

import (
	"context"
	"godocker/internal/models/entities"
)

type Driver uint8

const (
	SQL Driver = iota
	MongoDB
)

type CRUD[T entities.Entity] interface {
	Create(context.Context, T) error
	Update(context.Context, T) error
	Delete(context.Context, string) error
	Get(context.Context, uint, uint) ([]T, error)
	GetByID(context.Context, string) (*T, error)
}

type BaseRepository[T entities.Entity] interface {
	CRUD[T]
	Driver() Driver
}
