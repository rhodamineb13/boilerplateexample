package database

func Migrate(entities ...any) {
	if err := DB.AutoMigrate(entities); err != nil {
		panic(err)
	}
}
