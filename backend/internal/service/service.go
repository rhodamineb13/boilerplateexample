package service

import (
	"context"
	"fmt"
	"godocker/internal/config"
	"godocker/internal/models/dto"
	"godocker/internal/models/enums"
	"godocker/internal/repository"
	"godocker/internal/utils/token"

	"github.com/go-ldap/ldap/v3"
)

type AdminService interface {
	AssignTask(context.Context, dto.AssignTaskDTO) error
	ListAllTasks(context.Context, dto.Pagination) (dto.PaginatedResponse[dto.Task], error)
	RealLiveTrack(context.Context) error
	GetEmployees(context.Context, *enums.EmployeeRole) ([]dto.EmployeeDTO, error)
	Login(context.Context, dto.LoginDTO) (string, error)
}

type adminService struct {
	repository repository.AdminRepository
}

func NewAdminService(repository repository.AdminRepository) AdminService {
	return &adminService{repository: repository}
}

func (s *adminService) AssignTask(ctx context.Context, task dto.AssignTaskDTO) error {
	return s.repository.AssignTask(ctx, task.TaskId, task.EmployeeId)
}
func (s *adminService) ListAllTasks(ctx context.Context, pagination dto.Pagination) (dto.PaginatedResponse[dto.Task], error) {
	res := dto.PaginatedResponse[dto.Task]{}
	var (
		limit  int
		page   int
		search string
	)

	if pagination.Limit == nil {
		limit = 10
	} else {
		limit = *pagination.Limit
	}

	if pagination.Page == nil {
		page = 1
	} else {
		page = *pagination.Page
	}

	if pagination.Search == "" {
		search = ""
	} else {
		search = pagination.Search
	}

	total, tasksEntity, err := s.repository.ListTask(ctx, limit, page, search)
	if err != nil {
		return res, err
	}

	res.Limit = limit
	res.Page = page
	res.Total = total
	res.Data = make([]dto.Task, len(tasksEntity))
	for i := range tasksEntity {
		task := dto.Task{
			Id:            tasksEntity[i].Id,
			ClientName:    tasksEntity[i].ClientName,
			ClientAddress: tasksEntity[i].ClientAddress,
			Latitude:      tasksEntity[i].ClientLatitude,
			Longitude:     tasksEntity[i].ClientLongitude,
			Description:   tasksEntity[i].Description,
			Priority:      tasksEntity[i].Priority,
		}
		res.Data[i] = task
	}

	return res, nil
}
func (s *adminService) RealLiveTrack(ctx context.Context) error {

	return nil
}

func (s *adminService) GetEmployees(ctx context.Context, role *enums.EmployeeRole) ([]dto.EmployeeDTO, error) {
	employeesEntity, err := s.repository.GetEmployees(ctx, role)
	if err != nil {
		return nil, err
	}

	employeesDTO := make([]dto.EmployeeDTO, len(employeesEntity))
	for i := range employeesEntity {
		employeesDTO[i] = dto.EmployeeDTO{
			Id:       employeesEntity[i].Id,
			Name:     employeesEntity[i].Name,
			Username: employeesEntity[i].Username,
			Email:    employeesEntity[i].Email,
			Role:     employeesEntity[i].Role,
		}
	}

	return employeesDTO, nil
}

func (s *adminService) Login(ctx context.Context, req dto.LoginDTO) (string, error) {
	// emp, err := s.repository.FindEmployee(ctx, req.Username)
	// if err != nil {
	// 	return "", err
	// }

	// if emp.Role == enums.Surveyor {
	// 	return "", fmt.Errorf("wrong email or password")
	// }

	l, err := ldap.DialURL(fmt.Sprintf("ldap://%s:%s", "localhost", config.LDAP_PORT))
	if err != nil {
		return "", err
	}

	if err := l.Bind(config.LDAP_BIND, config.LDAP_PASSWORD); err != nil {
		return "", err
	}

	defer l.Close()

	filter := fmt.Sprintf("(&(objectClass=posixAccount)(uid=%s))", req.Username)

	reqLDAP := ldap.NewSearchRequest(config.LDAP_SEARCH_DN, ldap.ScopeWholeSubtree, 0, 0, 0, false, filter, []string{"cn", "dn", "uid", "givenName"}, nil)
	res, err := l.Search(reqLDAP)
	if err != nil {
		return "", err
	}

	if len(res.Entries) != 1 {
		return "", err
	}

	userDN := res.Entries[0].DN

	if err := l.Bind(userDN, req.Password); err != nil {
		return "", err
	}

	tok, err := token.GenerateJWTToken(req.Username)

	if err != nil {
		return "", err
	}

	return tok, nil
}
