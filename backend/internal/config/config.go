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
	DATABASE_PASS     string = GetVariable("DB_PASS", "admin")
	DATABASE_SSL_MODE string = GetVariable("DB_SSL_MODE", "disable")
	JWT_ISSUER        string = GetVariable("JWT_ISSUER", "admin")
	LDAP_SERVER       string = GetVariable("LDAP_SERVER", "local.ldapsys.com")
	LDAP_PORT         string = GetVariable("LDAP_PORT", "389")
	LDAP_BIND         string = GetVariable("LDAP_BIND", "cn=admin,dc=local,dc=ldapsys,dc=com")
	LDAP_PASSWORD     string = GetVariable("LDAP_PASS", "admin")
	LDAP_SEARCH_DN    string = GetVariable("LDAP_SEARCH_DN", "dc=local,dc=ldapsys,dc=com"	)
)

func LoadEnv() {
	if err := godotenv.Load(".env"); err != nil {
		panic(err)
	}
}

func GetVariable(variable, fallback string) string {
	LoadEnv()
	env := os.Getenv(variable)
	if env == "" {
		return fallback
	}

	return env
}
