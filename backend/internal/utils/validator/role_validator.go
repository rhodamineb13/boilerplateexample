package validator

import (
	employeeRole "backend/internal/models/enums/employee_role"
	"strings"
)

func ValidateRole(r string) bool {
	switch role := strings.ToLower(r); role {
	case string(employeeRole.Admin), string(employeeRole.BranchManager), string(employeeRole.Surveyor):
		return true
	default:
		return false
	}
}
