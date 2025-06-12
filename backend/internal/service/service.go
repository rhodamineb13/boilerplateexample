package service

import (
	"context"
	"godocker/internal/models/dto"
	"godocker/internal/models/enums"
	"godocker/internal/repository"
	"godocker/internal/utils/password"
	"godocker/internal/utils/token"
)

type AdminService interface {
	AssignTask(context.Context, dto.AssignTaskDTO) error
	ListAllTasks(context.Context, *dto.Pagination) ([]dto.TaskDTO, error)
	RealLiveTrack(context.Context) error
	GetEmployees(context.Context, enums.EmployeeRole) ([]dto.EmployeeDTO, error) 
	Login(context.Context, dto.LoginDTO) (string, error)
}

type adminService struct {
	repository repository.AdminRepository
}

func NewAdminService(repository repository.AdminRepository) AdminService {
	return &adminService{repository: repository}
}

func (s *adminService) AssignTask(ctx context.Context, task dto.AssignTaskDTO) error {

	return nil
}
func (s *adminService) ListAllTasks(ctx context.Context, pagination *dto.Pagination) ([]dto.TaskDTO, error) {
	var tasks []dto.TaskDTO

	return tasks, nil
}
func (s *adminService) RealLiveTrack(ctx context.Context) error {

	return nil
}

func (s *adminService) GetEmployees(ctx context.Context, role enums.EmployeeRole) ([]dto.EmployeeDTO, error) {
	employeesEntity, err := s.repository.GetEmployees(ctx, role)
	if err != nil {
		return nil, err
	}

	employeesDTO := make([]dto.EmployeeDTO, len(employeesEntity))
	for i := range employeesEntity {
		employeesDTO[i] = dto.EmployeeDTO{
			Id: employeesEntity[i].Id,
			Name: employeesEntity[i].Name,
		}
	}

	return employeesDTO, nil
}

func (s *adminService) Login(ctx context.Context, req dto.LoginDTO) (string, error) {
	emp, err := s.repository.FindEmployee(ctx, req.Username)
	if err != nil {
		return "", err
	}

	if err := password.ComparePassword(req.Password, emp.Password); err != nil {
		return "", err
	}

	tok, err := token.GenerateJWTToken(emp.Username, emp.Role)
	if err != nil {
		return "", err
	}

	return tok, nil
}