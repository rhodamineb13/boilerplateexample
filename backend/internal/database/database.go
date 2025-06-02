package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/driver/mysql"
)

var DB *gorm.DB

type Driver uint

const (
	Postgres uint = iota + 1
	MySQL
)

func Connect(driver Driver) {
	var err error
	switch driver {
	case Driver(Postgres):
		dsn := ""
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
	}
}
