package backOfficeService

import (
	"context"
	backOfficeDTO "godocker/internal/backoffice/models/dto"
	backOfficeRepository "godocker/internal/backoffice/repository"
	"godocker/internal/utils/token"

	"github.com/google/uuid"
)

type EmployeeService interface {
	// Define methods for employee management
	Login(ctx context.Context, loginDTO *backOfficeDTO.LoginRequestDTO) (*backOfficeDTO.LoginResponseDTO, error)
}

type employeeService struct {
	// Define any necessary fields, such as a repository for database access
	repository backOfficeRepository.EmployeeRepository
}

func NewEmployeeService(repository backOfficeRepository.EmployeeRepository) EmployeeService {
	return &employeeService{repository: repository}
}

func (s *employeeService) Login(ctx context.Context, loginDTO *backOfficeDTO.LoginRequestDTO) (*backOfficeDTO.LoginResponseDTO, error) {
	// Here you would typically validate the login credentials against a database.
	// For now, we'll just return a dummy token if the username and password are "admin".

	// res, err := s.repository.GetEmployeeByUsername(ctx, loginDTO.Username)
	// if err != nil {
	// 	return nil, err // Return an error if login fails
	// }

	// conn, err := ldap.Dial("tcp", "ldap.example.com:389")
	// if err != nil {
	// 	return nil, err // Return an error if LDAP connection fails
	// }
	// defer conn.Close()

	// err = conn.Bind("admin", "password")
	// if err != nil {
	// 	return nil, err // Return an error if LDAP bind fails
	// }

	// searchRequest := ldap.NewSearchRequest(
	// 	"dc=example,dc=com",
	// 	ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
	// 	"(uid="+loginDTO.Username+")",
	// 	[]string{"dn", "uid"},
	// 	nil,
	// )
	// searchResult, err := conn.Search(searchRequest)
	// if err != nil {
	// 	return nil, err // Return an error if LDAP search fails
	// }

	// if len(searchResult.Entries) == 0 {
	// 	return nil, ldap.NewError(ldap.LDAPResultNoSuchObject, nil) // Return an error if no user found
	// }

	// user := searchResult.Entries[0]
	// err = conn.Bind(user.DN, loginDTO.Password)
	// if err != nil {
	// 	return nil, ldap.NewError(ldap.LDAPResultInvalidCredentials, err) // Return an error if LDAP bind fails
	// }

	newUUID := uuid.New().String()

	token, err := token.GenerateJWTToken(newUUID)
	if err != nil {
		return nil, err // Return an error if token generation fails
	}

	return &backOfficeDTO.LoginResponseDTO{
		EmployeeId: newUUID,
		Token:      token,
	}, nil
}
