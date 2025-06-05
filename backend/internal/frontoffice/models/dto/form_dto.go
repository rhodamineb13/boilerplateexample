package frontOfficeDTO

import "mime/multipart"

type FormDTO struct {
	ClientName             string          `form:"client_name"`
	ClientCitizenID        string          `form:"client_citizen_id"`
	ClientDOB              string          `form:"client_dob"`
	ClientGender           string          `form:"client_gender"`
	ClientAddress          string          `form:"client_address"`
	ClientSubdistrict      string          `form:"client_subdistrict"`
	ClientDistrict         string          `form:"client_district"`
	ClientCityOrRegency    string          `form:"client_city_or_regency"`
	ClientProvince         string          `form:"client_province"`
	ClientPostalCode       uint32          `form:"client_postal_code"`
	ClientPhoneNumber      string          `form:"client_phone_number"`
	ClientCitizenCardPhoto *multipart.File `form:"client_citizen_card_photo"`
	ClientSelfiePhoto      *multipart.File `form:"client_selfie_photo"`
	ClientJob              string          `form:"client_job"`
	ClientMonthlySalary    uint32          `form:"client_salary"`
	ClientMaritalStatus    string          `form:"client_marital_status"`
	ClientChildren         uint8           `form:"client_children"`
}
