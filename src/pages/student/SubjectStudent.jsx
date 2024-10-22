import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SubjectStudent = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getSubjects();
    }, []);

    const getSubjects = async () => {
        try {
            const { data } = await axiosClient.get("/Subject");
            console.log(data);
            setSubjects(data);
        } catch (error) {
            console.log(error);
        }
    };

    const listSubject = subjects.map(subject => (
        <tr key={subject.id}>
            <td className="text-center">{subject.id}</td>
            <td className="text-center">{subject.subjectname}</td>
            <td className="d-flex justify-content-center g-3 gap-2">
                <Button variant="info" as={Link} to={`/student/assignments/`}>
                    <i className="bi bi-eye-fill"></i>
                </Button>
            </td>
        </tr>
    ));

    return (
        <>
            <h1 className="text-center text-light mt-4">Materias</h1>
            <div>
                <Table striped bordered hover responsive="sm" variant="dark">
                    <thead>
                        <tr>
                            <th className="text-center">Id</th>
                            <th className="text-center">Materia</th>
                            <th className="text-center">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSubject}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default SubjectStudent;
