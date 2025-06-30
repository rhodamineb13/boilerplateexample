package schema

type FormSchema struct {
	Title string        `json:"title"`
	Fields [][]FormField `json:"fields"`
}

type FormField struct {
	Name    string   `json:"name"`
	Label   string   `json:"label"`
	Type    string   `json:"type"`
	Capture string   `json:"capture,omitempty"`
	Accept  string   `json:"accept,omitempty"`
	Options []string `json:"options,omitempty"`
}

var (
	GeneralInfoForms []FormField = []FormField{
		{
			Name:  "Name",
			Label: "name",
			Type:  "text",
		},
		{
			Name:  "Date of Birth",
			Label: "dob",
			Type:  "date",
		},
		{
			Name:  "Phone Number",
			Label: "phone_number",
			Type:  "text",
		},
		{
			Name:  "Address",
			Label: "address",
			Type:  "text",
		},
		{
			Name:  "Province",
			Label: "province",
			Type:  "text",
		},
		{
			Name:  "City/Regency",
			Label: "city_or_regency",
			Type:  "text",
		},
		{
			Name:  "District",
			Label: "district",
			Type:  "text",
		},
		{
			Name:  "Subdistrict",
			Label: "subdistrict",
			Type:  "text",
		},
		{
			Name:  "Village",
			Label: "villate",
			Type:  "text",
		},
		{
			Name:  "Email Address",
			Label: "email",
			Type:  "email",
		},
		{
			Name:    "Selfie Photo",
			Label:   "selfie",
			Type:    "file",
			Accept:  "image/*",
			Capture: "user",
		},
		{
			Name:    "ID Card Photo",
			Label:   "id_card",
			Type:    "file",
			Accept:  "image/*",
			Capture: "environment",
		},
		{
			Name:  "Occupation",
			Label: "occupation",
			Type:  "text",
		},
		{
			Name:  "Company Name",
			Label: "company",
			Type:  "text",
		},
		{
			Name:  "Income",
			Label: "income",
			Type:  "text",
		},
		{
			Name:  "Number of Dependants",
			Label: "number_of_dependants",
			Type:  "number",
		},
	}
	FormFieldElectronicCredit []FormField = []FormField{
		{
			Name:  "Item",
			Label: "item",
			Type:  "text",
		},
		{
			Name:    "Category",
			Label:   "category",
			Type:    "select",
			Options: []string{"Televisi", "Kulkas", "Laptop", "Smartphone", "Air Conditioner", "Kipas", "Mesin Cuci"},
		},
		{
			Name:  "Quantity",
			Label: "qty",
			Type:  "number",
		},
		{
			Name:  "Price",
			Label: "price",
			Type:  "text",
		},
	}

	FormFieldBusinessFinancing []FormField = []FormField{
		{
			Name:    "Business Sector",
			Label:   "business_sector",
			Type:    "select",
			Options: []string{"Manufacturing", "Retail", "Service", "Agriculture", "Others"},
		},
		{
			Name:  "Business Address",
			Label: "business_address",
			Type:  "text",
		},
		{
			Name:  "Monthly Income",
			Label: "monthly_income",
			Type:  "text",
		},
		{
			Name:  "NPWP",
			Label: "npwp",
			Type:  "text",
		},
	}

	FormFieldVehicleFinancing []FormField = []FormField{
		{
			Name:  "Unit",
			Label: "unit",
			Type:  "text",
		},
		{
			Name:    "Category",
			Label:   "category",
			Type:    "select",
			Options: []string{"motorcycle", "car", "truck"},
		},
		{
			Name:  "Price",
			Label: "price",
			Type:  "number",
		},
	}

	FormFieldQuestion []FormField = []FormField{
		{
			Name:  "Reason for financing",
			Label: "reason",
			Type:  "textarea",
		},
		{
			Name:    "Are you having other loan(s)?",
			Label:   "having_loans",
			Type:    "select",
			Options: []string{"Yes", "No"},
		},
	}

	MasterFormElectronicFinancing FormSchema = FormSchema{
		Title: "Master Form for Electronic Financing",
		Fields: [][]FormField{GeneralInfoForms, FormFieldElectronicCredit, FormFieldQuestion},
	}

	MasterFormBusinessFinancing FormSchema = FormSchema{
		Title: "Master Form for Electronic Financing",
		Fields: [][]FormField{GeneralInfoForms, FormFieldBusinessFinancing, FormFieldQuestion},
	}

	MasterFormVehicleFinancing FormSchema = FormSchema{
		Title: "Master Form for Vehicle Financing",
		Fields: [][]FormField{GeneralInfoForms, FormFieldVehicleFinancing, FormFieldQuestion},
	}
)
