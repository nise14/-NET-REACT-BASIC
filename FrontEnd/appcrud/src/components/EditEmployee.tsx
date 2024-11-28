import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IEmployee } from "../interfaces/IEmployee";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

const initialEmployee = {
    idEmployee: 0,
    name: "",
    email: "",
    salary: 0
};

export function EditEmployee() {

    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<IEmployee>(initialEmployee);
    const navigate = useNavigate();

    useEffect(() => {
        const getEmployee = async () => {
            const response = await fetch(`${appsettings.apiUrl}/employee/get/${id}`);

            if (response.ok) {
                const data = await response.json();
                setEmployee(data);
            }
        };

        getEmployee();
    }, []);

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setEmployee({ ...employee, [inputName]: inputValue });
    };

    const save = async () => {
        const response = await fetch(`${appsettings.apiUrl}/employee/edit`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        if (response.ok) {
            navigate("/");
        } else {
            Swal.fire({
                title: "Error!",
                text: "It couldn't save the employee",
                template: "warning"
            });
        }
    };

    const back = () => {
        navigate("/");
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h4>Edit Employee</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Name:</Label>
                            <Input type="text" name="name" onChange={inputChangeValue} value={employee.name} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email:</Label>
                            <Input type="text" name="email" onChange={inputChangeValue} value={employee.email} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Salary:</Label>
                            <Input type="number" name="salary" onChange={inputChangeValue} value={employee.salary} />
                        </FormGroup>
                    </Form>
                    <Button color="primary" className="me-4" onClick={save}>Save</Button>
                    <Button color="secondary" onClick={back}>Back</Button>
                </Col>
            </Row>
        </Container>
    );
}