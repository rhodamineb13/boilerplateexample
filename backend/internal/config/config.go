package config

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	DATABASE_HOST     string = GetVariable("DB_HOST", "localhost")
	DATABASE_PORT     string = GetVariable("DB_PORT", "5432")
	DATABASE_NAME     string = GetVariable("DB_NAME", "postgres")
	DATABASE_USER     string = GetVariable("DB_USER", "postgres")
	DATABASE_PASS     string = GetVariable("DB_USER", "admin")
	DATABASE_SSL_MODE string = GetVariable("DB_SSL_MODE", "disable")
	JWT_ISSUER        string = GetVariable("JWT_ISSUER", "admin")
)

func LoadEnv() {
	if err := godotenv.Load(".env"); err != nil {
		panic(err)
	}
}

func GetVariable(variable, fallback string) string {
	env := os.Getenv(variable)
	if env == "" {
		return fallback
	}

	return env
}
