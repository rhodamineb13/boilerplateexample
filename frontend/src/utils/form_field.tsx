import { JSX } from "react";
import { FormField } from "../models/dto/master_form";
import { Form } from "react-bootstrap";

export function ConvertToFormField(field : FormField) : JSX.Element {
    switch (field.type) {
    case 'file':
        return (
            <Form.Group>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control type="file" capture={field.capture}></Form.Control>
            </Form.Group>
        )
    case 'textarea':
        return (
            <Form.Group>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control as="textarea"></Form.Control>
            </Form.Group>
        )
    default:
        return (
            <Form.Group>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control type={field.type} capture={field.capture}></Form.Control>
            </Form.Group>
        )
    }
}