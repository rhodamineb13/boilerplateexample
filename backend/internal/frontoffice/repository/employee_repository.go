package frontOfficeRepository

import (
	"bytes"
	"context"
	"encoding/json"
	frontOfficeDTO "godocker/internal/frontoffice/models/dto"
	"net/http"
)

type EmployeeRepository interface {
	Login(context.Context, *frontOfficeDTO.LoginRequestDTO) (*frontOfficeDTO.LoginResponseAPIDTO, error)
}

type employeeRepository struct {
}

func NewEmployeeRepository() EmployeeRepository {
	return &employeeRepository{}
}

func (r *employeeRepository) Login(ctx context.Context, req *frontOfficeDTO.LoginRequestDTO) (*frontOfficeDTO.LoginResponseAPIDTO, error) {
	// Here you would typically query your database to validate the username and password.
	// For now, we'll just return a dummy token if the username and password are "admin".
	var b bytes.Buffer

	buffer := json.NewEncoder(&b)
	if err := buffer.Encode(req); err != nil {
		return nil, err // Return an error if encoding fails
	}

	client := &http.Client{}
	request, err := http.NewRequestWithContext(ctx, "POST", "http://localhost:8080/backoffice/login", &b)
	if err != nil {
		return nil, err // Return an error if the request creation fails
	}

	res, err := client.Do(request)
	if err != nil {
		return nil, err // Return an error if the request fails
	}
	defer res.Body.Close()	

	if res.StatusCode != http.StatusOK {
		return nil, nil // Return an empty string or an error if the status code is not OK
	}

	var employee *frontOfficeDTO.LoginResponseAPIDTO
	if err := json.NewDecoder(res.Body).Decode(&employee); err != nil {
		return nil, err // Return an error if decoding the response fails
	}

	return employee, nil // Return an empty string or an error if login fails
}
