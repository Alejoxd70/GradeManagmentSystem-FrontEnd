
import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

const TeacherGroup = () => {
    const [subjectTeachers, setSubjectTeachers] = useState([]);



    useEffect(() => {

        const getGroupYear = async () => {
            try {
                const data = await axiosClient.get("/SubjectTeachers");
                console.log(data.data);
                setSubjectTeachers(data.data);

            } catch (error) {
                console.log(error);
            }
        }

        getGroupYear();
    }, []);

    const listSubjectTeacher = subjectTeachers.map(subjecTeacher => (
        <Link to={`/teacher/groups/${subjecTeacher.id}`} className="d-block" key={subjecTeacher.id}>{subjecTeacher.groupYear.year}</Link>
    ));

    return (
        <>
            <h1 className="text-center text-light mt-4">Mis grupos</h1>

            <div className="d-flex justify-content-center mt-5">
                <Accordion className="w-50 modern-accordion">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Sexto</Accordion.Header>
                        <Accordion.Body>
                            {listSubjectTeacher}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Septimo</Accordion.Header>
                        <Accordion.Body>
                            {listSubjectTeacher}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Octavo</Accordion.Header>
                        <Accordion.Body>
                            {listSubjectTeacher}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Noveno</Accordion.Header>
                        <Accordion.Body>
                            {listSubjectTeacher}
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>
            </div>
        </>

    )
}

export default TeacherGroup;