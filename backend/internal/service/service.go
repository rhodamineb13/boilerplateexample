package service

import (
	"backend/internal/config"
	"backend/internal/models/dto"
	"backend/internal/models/entities"
	"backend/internal/repository"
	"backend/internal/utils/token"
	"context"
	"fmt"

	"github.com/go-ldap/ldap/v3"
)

type AdminService interface {
	AssignTask(context.Context, dto.AssignTaskDTO) error
	ListAllTasks(context.Context, dto.Pagination) (dto.PaginatedResponse[dto.Task], error)
	RealLiveTrack(context.Context) error
	GetUnassignedSurveyors(context.Context) ([]dto.EmployeeDTO, error)
	Login(context.Context, dto.LoginDTO) (string, error)
	GetAssignedSurveyors(context.Context) ([]dto.EmployeeDTO, error)
	CreateNews(context.Context, dto.NewsRequestDTO) error
	GetNews(context.Context) ([]dto.NewsResponseDTO, error)
	GetLatestNews(context.Context) ([]dto.NewsResponseDTO, error)
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
		fmt.Println(tasksEntity[i].EmployeeId, tasksEntity[i].Employee.Id, tasksEntity[i].Employee.Name)
		task := dto.Task{
			Id:            tasksEntity[i].Id,
			EmployeeId:    tasksEntity[i].EmployeeId,
			EmployeeName:  tasksEntity[i].Employee.Name,
			ClientName:    tasksEntity[i].ClientName,
			ClientAddress: tasksEntity[i].ClientAddress,
			Latitude:      tasksEntity[i].ClientLatitude,
			Longitude:     tasksEntity[i].ClientLongitude,
			DueDate:       tasksEntity[i].DueDate,
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

func (s *adminService) GetUnassignedSurveyors(ctx context.Context) ([]dto.EmployeeDTO, error) {
	employeesEntity, err := s.repository.GetUnassignedSurveyors(ctx)
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

	reqLDAP := ldap.NewSearchRequest(config.LDAP_SEARCH_DN, ldap.ScopeWholeSubtree, 0, 0, 0, false, filter, []string{"cn", "dn", "uid", "givenName", "sn"}, nil)
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

	emp, err := s.repository.FindEmployee(ctx, req.Username)
	if err != nil {
		return "", err
	}

	

	tok, err := token.GenerateJWTToken(emp.Id)
	fmt.Println(tok)

	if err != nil {
		return "", err
	}

	return tok, nil
}

func (s *adminService) GetAssignedSurveyors(ctx context.Context) ([]dto.EmployeeDTO, error) {
	empsEntity, err := s.repository.FindAssignedSurveyor(ctx)
	if err != nil {
		return nil, err
	}

	emps := make([]dto.EmployeeDTO, len(empsEntity))
	for i := range empsEntity {
		emps[i] = dto.EmployeeDTO{
			Id:   empsEntity[i].Id,
			Name: empsEntity[i].Name,
		}
	}

	return emps, nil
}

func (s *adminService) CreateNews(ctx context.Context, req dto.NewsRequestDTO) error {
	newsEntity := &entities.News{
		Title:      req.Title,
		Subtitle:   req.Subtitle,
		EmployeeId: req.EmployeeId,
		Content:    req.Content,
		ImageURL:   req.Image.Filename,
		Image:      req.Image,
	}
	return s.repository.CreateNews(ctx, newsEntity)
}

func (s *adminService) GetNews(ctx context.Context) ([]dto.NewsResponseDTO, error) {
	newsEntity, err := s.repository.GetNews(ctx)
	if err != nil {
		return nil, err
	}

	resp := make([]dto.NewsResponseDTO, len(newsEntity))

	for i := range newsEntity {
		resp[i] = dto.NewsResponseDTO{
			Id: newsEntity[i].Id,
			Title: newsEntity[i].Title,
			Subtitle: newsEntity[i].Subtitle,
			Author: newsEntity[i].Employee.Name,
			Content: newsEntity[i].Content,
			CreatedAt: newsEntity[i].CreatedAt,
			ImageURL: newsEntity[i].ImageURL,
		}
	}

	return resp, nil
}

func (s *adminService) GetLatestNews(ctx context.Context) ([]dto.NewsResponseDTO, error) {
	newsEntity, err := s.repository.GetLatestNews(ctx)
	if err != nil {
		return nil, err
	}

	resp := make([]dto.NewsResponseDTO, len(newsEntity))

	for i := range newsEntity {
		resp[i] = dto.NewsResponseDTO{
			Id: newsEntity[i].Id,
			Title: newsEntity[i].Title,
			Subtitle: newsEntity[i].Subtitle,
			Author: newsEntity[i].Employee.Name,
			Content: newsEntity[i].Content,
			CreatedAt: newsEntity[i].CreatedAt,

		}
	}

	return resp, nil
}