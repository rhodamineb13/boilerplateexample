package repository

import (
	"context"
	"godocker/internal/models/entities"
	"godocker/internal/models/enums"

	"gorm.io/gorm"
)

type AdminRepository interface {
	AssignTask(context.Context, string, string) error
	ListTask(context.Context, int, int, string) (int, []entities.Task, error)
	GetEmployees(context.Context, *enums.EmployeeRole) ([]entities.Employee, error)
	FindEmployee(context.Context, string) (*entities.Employee, error)
}

type adminRepository struct {
	db *gorm.DB
}

func NewAdminRepository(db *gorm.DB) AdminRepository {
	return &adminRepository{db: db}
}

func (r *adminRepository) AssignTask(ctx context.Context, taskId string, employeeId string) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		var task entities.Task

		if err := tx.Where("id = ?", taskId).First(&task).Error; err != nil {
			return err
		}

		task.EmployeeId = employeeId

		if err := tx.Save(&task).Error; err != nil {
			return err
		}

		return nil

	})
}

func (r *adminRepository) ListTask(ctx context.Context, limit int, page int, search string) (int, []entities.Task, error) {
	var tasks []entities.Task
	var total int64

	r.db.WithContext(ctx).Model(&entities.Task{}).Count(&total)


	db := r.db.WithContext(ctx)
	if search != "" {
		pattern := "%" + search + "%"
		db.Where("client_name ILIKE ? OR client_address ILIKE ? OR description ILIKE ?", pattern)
	}

	err := db.Limit(limit).Offset((page-1)*limit).Find(&tasks).Error


	// err := r.db.WithContext(ctx).Where("created_at > ?", created_at).Or("created_at = ? AND id > ?", created_at, id).Find(&tasks).Error

	return int(total), tasks, err
}

func (r *adminRepository) GetEmployees(ctx context.Context, role *enums.EmployeeRole) ([]entities.Employee, error) {
	var employees []entities.Employee

	if role == nil {
		err := r.db.WithContext(ctx).Find(&employees).Error
		return employees, err
	}

	err := r.db.WithContext(ctx).Where("role = ?", role).Find(&employees).Error

	return employees, err
}

func (r *adminRepository) FindEmployee(ctx context.Context, username string) (*entities.Employee, error) {
	var emp *entities.Employee

	err := r.db.WithContext(ctx).Where("username = ?", username).First(&emp).Error

	return emp, err
}