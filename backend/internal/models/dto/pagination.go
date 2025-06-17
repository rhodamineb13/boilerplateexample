package dto

type Pagination struct {
	Limit  *int    `form:"limit"`
	Page   *int    `form:"page"`
	Search string `form:"search"`
}

type PaginatedResponse[T any] struct {
	Limit int `json:"limit"`
	Page  int `json:"page"`
	Total int `json:"total"`
	Data  []T `json:"data"`
}
