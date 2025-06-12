package validator

import (
	"godocker/internal/models/enums"
	"strings"
)

func ValidateRole(r string) bool{
	switch role := strings.ToLower(r); role {
	case string(enums.Admin), string(enums.BranchManager), string(enums.Surveyor):
		return true
	default:
		return false
	}
}