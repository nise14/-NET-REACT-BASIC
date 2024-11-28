import { useEffect, useState } from "react";
import { IEmployee } from "../interfaces/IEmployee";
import { appsettings } from "../settings/appsettings";
import Swal from "sweetalert2";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";

export function List() {
    const [employee, setEmployee] = useState<IEmployee[]>([]);

    const getEmployees = async () => {
        const response = await fetch(`${appsettings.apiUrl}/employee/get`);
        if (response.ok) {
            const data = await response.json();
            setEmployee(data);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    const deleteEmployee = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete employee",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`${appsettings.apiUrl}/employee/delete/${id}`, { method: 'DELETE' });

                if (response.ok) {
                    await getEmployees();
                }
            }
        });
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h4>List employees</h4>
                    <hr/>
                    <Link className="btn btn-success mb-3" to="/newemployee">New Employee</Link>

                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Salary</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employee.map((item)=>(
                                    <tr key={item.idEmployee}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.salary}</td>
                                        <td>
                                            <Link className="btn btn-primary me-2" to={`editemployee/${item.idEmployee}`}>Edit</Link>
                                            <Button color="danger" onClick={()=>deleteEmployee(item.idEmployee!)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};