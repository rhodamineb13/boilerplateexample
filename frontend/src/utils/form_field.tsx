import React, { JSX } from "react";
import { FormField } from "../models/dto/master_form";
import { Form } from "react-bootstrap";

type FormValue = string | number | File | boolean | undefined;

export function ConvertToFormField(field : FormField, handleChange : (K : string, V : any) => void, initialValue : FormValue ) : JSX.Element {
    switch (field.type) {
    case 'file':
        return (
            <Form.Group>
                <Form.Label>{field.name}</Form.Label>
                <Form.Control type="file" capture={field.capture} accept={field.accept} onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                    const file : File | undefined = e.target.files?.[0];
                    if (file) {
                        handleChange(field.label, file)
                    }
                }}></Form.Control>
            </Form.Group>
        )
    case 'select':
        return (
            <Form.Group>
                <Form.Label>{field.name}</Form.Label>
                <Form.Select value={typeof initialValue === "string" || typeof initialValue === "number" ? initialValue : ""} onChange={(e) => handleChange(field.label, e.target.value)}>
                    {field.options?.map((opt) => <option>{opt}</option>)}
                </Form.Select>
            </Form.Group>
        )
    case 'textarea':
        return (
            <Form.Group>
                <Form.Label>{field.name}</Form.Label>
                <Form.Control value={typeof initialValue === "string" || typeof initialValue === "number" ? initialValue : ""} as="textarea" onChange={(e) => handleChange(field.label, e.target.value)}></Form.Control>
            </Form.Group>
        )
    default:
        return (
            <Form.Group>
                <Form.Label>{field.name}</Form.Label>
                <Form.Control value={typeof initialValue === "string" || typeof initialValue === "number" ? initialValue : ""} type={field.type} capture={field.capture} onChange={(e) => handleChange(field.label, e.target.value)}></Form.Control>
            </Form.Group>
        )
    }
}