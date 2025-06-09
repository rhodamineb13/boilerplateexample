package backOfficeRepository

import (
	"context"
	backOfficeEntities "godocker/internal/backoffice/models/entities"
	mongoDatabase "godocker/internal/database/mongo_database" // Add MongoDB database package
	sqlDatabase "godocker/internal/database/sql_database"
	"godocker/internal/repository"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"gorm.io/gorm"
)

type EmployeeRepository interface {
	repository.CRUD[backOfficeEntities.Employee]
	GetEmployeeByUsername(ctx context.Context, username string) (*backOfficeEntities.Employee, error)
}

// SQL-specific implementation
type sqlEmployeeRepository struct {
	repository.BaseRepository[backOfficeEntities.Employee]
	db *gorm.DB
}

// MongoDB-specific implementation
type mongoEmployeeRepository struct {
	repository.BaseRepository[backOfficeEntities.Employee]
	collection *mongo.Collection
}

func NewEmployeeRepository(driver repository.Driver) EmployeeRepository {
	switch driver {
	case repository.SQL:
		baseRepo := repository.NewSQLRepository[backOfficeEntities.Employee](sqlDatabase.DB)
		return &sqlEmployeeRepository{
			BaseRepository: baseRepo,
			db:             sqlDatabase.DB,
		}
	case repository.MongoDB:
		client := mongoDatabase.Client // Initialize MongoDB client properly
		baseRepo := repository.NewMongoRepository[backOfficeEntities.Employee](
			client,
			"backoffice",
			"employees", // Changed to employees collection
		)
		return &mongoEmployeeRepository{
			BaseRepository: baseRepo,
			collection:     client.Database("backoffice").Collection("employees"),
		}
	default:
		panic("undefined driver")
	}
}

// SQL implementation
func (ser *sqlEmployeeRepository) GetEmployeeByUsername(ctx context.Context, username string) (*backOfficeEntities.Employee, error) {
	var employee backOfficeEntities.Employee
	err := ser.db.WithContext(ctx).
		Where("username = ?", username).
		First(&employee).
		Error

	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &employee, nil
}

// MongoDB implementation
func (mer *mongoEmployeeRepository) GetEmployeeByUsername(ctx context.Context, username string) (*backOfficeEntities.Employee, error) {
	filter := bson.M{"username": username}
	var employee backOfficeEntities.Employee
	err := mer.collection.FindOne(ctx, filter).Decode(&employee)

	if err == mongo.ErrNoDocuments {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &employee, nil
}
