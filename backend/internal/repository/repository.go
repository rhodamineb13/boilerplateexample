package repository

import (
	"backend/internal/models/entities"
	"backend/internal/models/enums"
	"context"
	"io"
	"os"
	"path/filepath"
	"time"

	"gorm.io/gorm"
)

type AdminRepository interface {
	AssignTask(context.Context, string, string) error
	ListTask(context.Context, int, int, string) (int, []entities.Task, error)
	GetUnassignedSurveyors(context.Context) ([]entities.Employee, error)
	FindEmployee(context.Context, string) (*entities.Employee, error)
	FindAssignedSurveyor(context.Context) ([]entities.Employee, error)
	CreateNews(context.Context, *entities.News) error
	GetNews(context.Context) ([]entities.News, error)
	GetLatestNews(context.Context) ([]entities.News, error)
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
		tempDueDate := time.Now().AddDate(0, 0, 1)
		dueDate := time.Date(
			tempDueDate.Year(),
			tempDueDate.Month(),
			tempDueDate.Day(),
			23,
			59,
			59,
			0,
			tempDueDate.Location(),
		)

		task.DueDate = &dueDate

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

	db := r.db.WithContext(ctx).Preload("Employee")
	if search != "" {
		pattern := "%" + search + "%"
		err := db.Where("client_name ILIKE ? OR client_address ILIKE ? OR description ILIKE ?", pattern, pattern, pattern).Find(&tasks).Error

		return int(total), tasks, err
	}

	err := db.Limit(limit).Offset((page - 1) * limit).Find(&tasks).Error

	// err := r.db.WithContext(ctx).Where("created_at > ?", created_at).Or("created_at = ? AND id > ?", created_at, id).Find(&tasks).Error

	return int(total), tasks, err
}

func (r *adminRepository) GetUnassignedSurveyors(ctx context.Context) ([]entities.Employee, error) {
	var surveyors []entities.Employee

	// LEFT JOIN Tasks and filter out any Employee with a matching Task
	err := r.db.
		Joins(
			// join only non‐deleted tasks
			"LEFT JOIN tasks ON tasks.employee_id = employees.id",
		).
		Where("employees.role = ?", enums.Surveyor).
		Where("tasks.employee_id IS NULL"). // no task assigned
		Find(&surveyors).Error

	return surveyors, err
}

func (r *adminRepository) FindEmployee(ctx context.Context, username string) (*entities.Employee, error) {
	var emp *entities.Employee

	err := r.db.WithContext(ctx).Where("username = ?", username).First(&emp).Error

	return emp, err
}

func (r *adminRepository) FindAssignedSurveyor(ctx context.Context) ([]entities.Employee, error) {
	var surveyors []entities.Employee

	// LEFT JOIN Tasks and filter out any Employee with a matching Task
	err := r.db.
		Joins(
			"LEFT JOIN tasks ON tasks.employee_id = employees.id",
		).
		Where("employees.role = ?", enums.Surveyor).
		Where("tasks.employee_id IS NOT NULL").
		Find(&surveyors).Error

	return surveyors, err
}

func (r *adminRepository) CreateNews(ctx context.Context, news *entities.News) error {
	path, err := os.Getwd()
	if err != nil {
		return err
	}

	assetDir := filepath.Join(path, "uploads")
	err = r.db.Transaction(func(tx *gorm.DB) error {
		file, err := news.Image.Open()
		if err != nil {
			return err
		}

		defer file.Close()

		data, err := io.ReadAll(file)
		if err != nil {
			return err
		}

		if err := os.WriteFile(filepath.Join(assetDir, news.ImageURL), data, 0o644); err != nil {
			return err
		}

		return tx.Save(&news).Error
	})

	if err != nil {
		_ = os.Remove(filepath.Join(assetDir, news.ImageURL))
	}

	return err
}

func (r *adminRepository) GetNews(ctx context.Context) ([]entities.News, error) {
	var news []entities.News

	err := r.db.Order("created_at DESC").Find(&news).Error

	return news, err
}

func (r *adminRepository) GetLatestNews(ctx context.Context) ([]entities.News, error) {
	var news []entities.News

	err := r.db.Order("created_at DESC").Limit(3).Find(&news).Error

	return news, err
}