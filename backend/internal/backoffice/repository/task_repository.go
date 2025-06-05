package backOfficeRepository

import (
	"context"
	backOfficeEntities "godocker/internal/backoffice/models/entities"
	sqlDatabase "godocker/internal/database/sql_database"
	"godocker/internal/repository"

	"go.mongodb.org/mongo-driver/v2/mongo"
)

type TaskRepository interface {
	AssignTask(ctx context.Context, taskID string, employeeID string) error
	ListTaskByEmployee(ctx context.Context, employeeID string, page, pageSize uint) ([]backOfficeEntities.Task, error)
	SetDone(ctx context.Context, taskID string) error
}
type taskRepository struct {
	repository repository.BaseRepository[backOfficeEntities.Task]
}

func NewTaskRepository(driver repository.Driver) TaskRepository {
	switch driver {
	case repository.SQL:
		return &taskRepository{
			repository: repository.NewSQLRepository[backOfficeEntities.Task](sqlDatabase.DB),
		}
	case repository.MongoDB:
		return &taskRepository{
			repository: repository.NewMongoRepository[backOfficeEntities.Task](&mongo.Client{}, "backoffice", "tasks"),
		}
	default:
		panic("undefined driver")
	}
}
func (tr *taskRepository) AssignTask(ctx context.Context, taskID string, employeeID string) error {
	// Implementation for assigning a task to an employee
	return nil
}
func (tr *taskRepository) ListTaskByEmployee(ctx context.Context, employeeID string, page, pageSize uint) ([]backOfficeEntities.Task, error) {
	// Implementation for listing tasks assigned to an employee
	var tasks []backOfficeEntities.Task
	return tasks, nil
}
func (tr *taskRepository) SetDone(ctx context.Context, taskID string) error {
	// Implementation for marking a task as done
	return nil
}
func (tr *taskRepository) Create(ctx context.Context, entity backOfficeEntities.Task) error {
	return tr.repository.Create(ctx, entity)
}
func (tr *taskRepository) Update(ctx context.Context, entity backOfficeEntities.Task) error {
	return tr.repository.Update(ctx, entity)
}
func (tr *taskRepository) Delete(ctx context.Context, id string) error {
	return tr.repository.Delete(ctx, id)
}
func (tr *taskRepository) Get(ctx context.Context, page, pageSize uint) ([]backOfficeEntities.Task, error) {
	return tr.repository.Get(ctx, page, pageSize)
}
func (tr *taskRepository) GetByID(ctx context.Context, id string) (*backOfficeEntities.Task, error) {
	entity, err := tr.repository.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if entity == nil {
		return nil, nil // No document found
	}
	return entity, nil
}
