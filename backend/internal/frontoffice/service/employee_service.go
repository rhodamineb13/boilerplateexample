package frontOfficeService

import (
	"context"
	frontOfficeDTO "godocker/internal/frontoffice/models/dto"
	frontOfficeRepository "godocker/internal/frontoffice/repository"
)

type EmployeeService interface {
	Login(context.Context, *frontOfficeDTO.LoginRequestDTO) (*frontOfficeDTO.LoginResponseDTO, error)
}

type employeeService struct {
	repository frontOfficeRepository.EmployeeRepository
}

func NewEmployeeService(repository frontOfficeRepository.EmployeeRepository) EmployeeService {
	return &employeeService{repository: repository}
}

func (s *employeeService) Login(ctx context.Context, loginDTO *frontOfficeDTO.LoginRequestDTO) (*frontOfficeDTO.LoginResponseDTO, error) {
	// Here you would typically validate the login credentials against a database.
	// For now, we'll just return a dummy token if the username and password are "admin".

	res, err := s.repository.Login(ctx, loginDTO)
	if err != nil {
		return nil, err // Return an error if login fails
	}

	return &frontOfficeDTO.LoginResponseDTO{
		EmployeeId: res.EmployeeId,
		Token:      res.Token,
	}, nil
}
