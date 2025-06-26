package dto

import (
	"mime/multipart"
	"time"
)

type NewsRequestDTO struct {
	EmployeeId string
	Title      string                `form:"title"`
	Subtitle   string                `form:"subtitle"`
	Content    string                `form:"content"`
	Image      *multipart.FileHeader `form:"image"`
}

type NewsResponseDTO struct {
	Id        string    `json:"id"`
	Title     string    `json:"title"`
	Subtitle  string    `json:"subtitle"`
	Author    string    `json:"author"`
	ImageURL  string    `json:"image_url"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	DeletedAt time.Time `json:"deleted_at"`
}
