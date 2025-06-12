package dto

type Pagination struct {
	Limit  int `json:"limit"`
	Cursor int `json:"cursor"`
}