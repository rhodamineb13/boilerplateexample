package sqlDatabase

import (
	"fmt"
	"godocker/internal/config"

	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

type Driver uint

const (
	Postgres Driver = iota + 1
	MySQL
)

func Connect(driver Driver) {
	var err error
	switch driver {
	case Driver(Postgres):
		dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", config.DATABASE_HOST, config.DATABASE_USER, config.DATABASE_PASS, config.DATABASE_NAME, config.DATABASE_PORT)
		DB, err = gorm.Open(postgres.Open(dsn))
		if err != nil {
			panic(err)
		}
	case Driver(MySQL):
		dsn := ""
		DB, err = gorm.Open(mysql.Open(dsn))
		if err != nil {
			panic(err)
		}
	default:
		panic("undefined driver")
	}
}
