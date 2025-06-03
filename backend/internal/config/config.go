package config

import (
	"os"

	"github.com/joho/godotenv"
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
