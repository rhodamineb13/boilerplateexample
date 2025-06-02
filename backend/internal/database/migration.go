package database

import "godocker/internal/models/entities"

func Migrate(entities []entities.Entity) {
	if err := DB.AutoMigrate(entities); err != nil {
		panic(err)
	}
}