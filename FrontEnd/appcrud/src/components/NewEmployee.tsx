import { ChangeEvent, useState } from "react";
import { IEmployee } from "../interfaces/IEmployee";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, FormGroup, Label, Input, Form, Button } from "reactstrap";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";

const initialEmployee = {
    name: "",
    email: "",
    salary: 0
};

export function NewEmployee() {
    const [employee, setEmployee] = useState<IEmployee>(initialEmployee);
    const navigate = useNavigate();

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setEmployee({ ...employee, [inputName]: inputValue });
    };

    const save = async () => {
        const response = await fetch(`${appsettings.apiUrl}/employee/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        if(response.ok){
            navigate("/");
        }else{
            Swal.fire({
                title:"Error!",
                text:"It couldn't save the employee",
                template:"warning"
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
                    <h4>New Employee</h4>
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