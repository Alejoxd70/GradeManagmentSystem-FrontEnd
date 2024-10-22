import { useState, useEffect } from "react";
import { Tabs, Tab, Col, Row, Accordion, ListGroup, Card, Button } from "react-bootstrap";
import axiosClient from "../../config/axios";
import { Link } from "react-router-dom";

const ListStudents = () => {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);

   
    // Fetch Student
    useEffect(() => {
        const getStudents = async () => {
            try {
                const { data } = await axiosClient.get("/Students");
                setStudents(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getStudents();
    }, []);

    const listStudents = students.map(student => (
        <Col key={student.id} xs={12} sm={6} md={4} lg={3} className="mb-4 p-3">
            <Card  className="mb-3 shadow-sm w-100 h-100" style={{ width: '18rem', height:"18rem" }}>
                <Card.Body>
                    <Card.Title className="text-primary">
                        {student.user.name} {student.user.lastName}
                    </Card.Title>
                    <ListGroup >
                        <ListGroup.Item>
                            <strong>Email:</strong> {student.user.email}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Acudiente:</strong> {student.attendant.name} {student.attendant.lastName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Identificación:</strong> {student.user.identification}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Código de estudiante:</strong> {student.student_code}
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    ));

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const { data } = await axiosClient.get("/Subject")
                console.log(data);
                setSubjects(data)
            } catch (error) {
                console.log(error);
    
            }
        }
        getSubjects();
    }, []);

    const listSubjects = subjects.map(subject => (
        <Accordion.Item key={subject.id} eventKey={subject.id}>
                        <Accordion.Header>{subject.subjectname}</Accordion.Header>
                        <Accordion.Body>
                            {subject.description}
                            <hr></hr>
                            <div className="d-flex gap-4">
                                <Button variant="outline-info" as={Link} to={"/teacher/assignments"}>               
                                    Ver Asignaciones
                                </Button>
                                <Button variant="outline-primary" as={Link} to={"/teacher/grades"}>
                                    Ver Notas
                                </Button>
                            </div>
                        </Accordion.Body>
        </Accordion.Item>
    ));

    return (
        <>
            <h1 className="text-center text-light mt-4">Lista Estudiantes y materias</h1>

            <Tabs
                defaultActiveKey="subjects"
                id="uncontrolled-tab-example"
                className="mb-3"    
            >
                <Tab eventKey="subjects" title="Materias">
                    <Accordion defaultActiveKey={['0']} >
                        {listSubjects}
                    </Accordion>
                </Tab>

                <Tab eventKey="students" title="Estudiantes">
                    <Row>
                        {listStudents}
                    </Row>
                </Tab>
           
            </Tabs>
        
        </>
    );
}

export default ListStudents;