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
        <tr key={subject.id} className="text-center">
            <td>{subject.subjectname}</td>
            <td className="d-flex justify-content-center g-3 gap-2">
                <Button variant="info" as={Link} to={`/student/assignments/${subject.id}`}>
                    <i className="bi bi-eye-fill"></i>
                </Button>
            </td>
        </tr>
    ));

    return (
        <>
            <h1 className="text-center text-light mt-4">Materias</h1>
            <div className="w-75">
                <Table striped bordered hover responsive="sm" variant="dark">
                    <thead>
                        <tr className="text-center">
                            <th>Materia</th>
                            <th>Detalles</th>
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
