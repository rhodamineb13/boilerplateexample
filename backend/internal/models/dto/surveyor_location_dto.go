package dto

type SurveyorLocationDTO struct {
	EmployeeId string  `json:"user_id" binding:"required"`
	Latitude   float64 `json:"latitude" binding:"required"`
	Longitude  float64 `json:"longitude" binding:"required"`
}
