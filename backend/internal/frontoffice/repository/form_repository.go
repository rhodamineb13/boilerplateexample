package frontOfficeRepository

import (
	"bytes"
	"context"
	"fmt"
	frontOfficeDTO "godocker/internal/frontoffice/models/dto"
	"io"
	"mime/multipart"
	"net/http"
	"net/textproto"
)

type FormRepository interface {
	SubmitForm(context.Context, *frontOfficeDTO.FormDTO) error
}

type formRepository struct {
}

func NewFormRepository() FormRepository {
	return &formRepository{}
}

func (r *formRepository) SubmitForm(ctx context.Context, form *frontOfficeDTO.FormDTO) error {
	var requestBody bytes.Buffer

	writer := multipart.NewWriter(&requestBody)

	addField := func(name, value string) error {
		if err := writer.WriteField(name, value); err != nil {
			return err
		}
		return nil
	}
	if err := addField("client_name", form.ClientName); err != nil {
		return err
	}
	if err := addField("client_citizen_id", form.ClientCitizenID); err != nil {
		return err
	}
	if err := addField("client_dob", form.ClientDOB); err != nil {
		return err
	}
	if err := addField("client_address", form.ClientAddress); err != nil {
		return err
	}
	if err := addField("client_subdistrict", form.ClientSubdistrict); err != nil {
		return err
	}

	addFile := func(fieldName string, file *multipart.File) error {
		if file == nil {
			return nil
		}
		defer (*file).Close()

		// Create custom header to avoid content-type sniffing
		h := make(textproto.MIMEHeader)
		h.Set("Content-Disposition",
			fmt.Sprintf(`form-data; name="%s"; filename="%s"`, fieldName, fieldName+".jpg"))
		h.Set("Content-Type", "image/jpeg")

		part, err := writer.CreatePart(h)
		if err != nil {
			return err
		}

		_, err = io.Copy(part, *file)
		return err
	}

	if err := addFile("client_citizen_card_photo", form.ClientCitizenCardPhoto); err != nil {
		return err
	}
	if err := addFile("client_selfie_photo", form.ClientSelfiePhoto); err != nil {
		return err
	}

	// Close multipart writer to finalize body
	if err := writer.Close(); err != nil {
		return err
	}

	client := &http.Client{}

	// Create HTTP request
	req, err := http.NewRequest("POST", "http://localhost:8080/receive-form", &requestBody)
	if err != nil {
		return err
	}

	
	req.Header.Set("Content-Type", writer.FormDataContentType())
	_, err = client.Do(req)
	if err != nil {
		return err
	}

	return nil
}
