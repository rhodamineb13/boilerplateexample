import { JSX } from "react";
import "./submit-form.scss";
import { Form } from "react-bootstrap";

export default function SubmitForm(): JSX.Element {
    return (
        <div className="submit-form-page">
            <h1>Submit Form</h1>
            <p>This is the form submission page.</p>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>1. Enter Client's Full Name</Form.Label>
                    <Form.Control required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>2. Enter Client's Date of Birth</Form.Label>
                    <Form.Control required type="date"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>3. Enter Client's Email</Form.Label>
                    <Form.Control required type="email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>4. Enter Client's Address</Form.Label>
                    <Form.Control required type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>5. Enter Client's Phone Number</Form.Label>
                    <Form.Control required type="text" />
                </Form.Group>
            </Form>
        </div>
    );
}