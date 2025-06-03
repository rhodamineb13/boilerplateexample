package customerror

import "fmt"

type CustomError struct {
	StatusCode uint
	ErrorMsg   string
}

// Implement error interface
func (ce *CustomError) Error() string {
	return fmt.Sprintf("Error : %s", ce.ErrorMsg)
}
