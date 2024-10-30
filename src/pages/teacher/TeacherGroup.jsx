
import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

const TeacherGroup = () => {
    const [subjectTeachers, setSubjectTeachers] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState({});




    useEffect(() => {

        const getGroupYear = async () => {
            try {
                const data = await axiosClient.get("/SubjectTeachers");
                console.log(data.data);
                setSubjectTeachers(data.data);
                const groupedData = {};
                for (let year = 5; year <= 11; year++) {
                    groupedData[year] = data.data.filter(teacher =>
                        teacher.groupYear.group.groupName.startsWith(year.toString())
                    );
                }
                setFilteredGroups(groupedData);
            } catch (error) {
                console.log(error);
            }
        }
        getGroupYear();

    }, []);

    console.log(subjectTeachers);


    const renderGroupList = (year) => (
        filteredGroups[year]?.map(teacher => (
            <Link
                id={teacher.groupYear.group.groupName}
                to={`/teacher/groups/${teacher.id}`}
                className="d-block"
                key={teacher.id}
            >
                {teacher.groupYear.year} - {teacher.subject.subjectname} - {teacher.groupYear.group.groupName}
            </Link>
        ))
    );

    return (
        <>
            <h1 className="text-center text-light mt-4">Mis grupos</h1>
            <div className="d-flex justify-content-center mt-5">
                <Accordion className="w-50 modern-accordion">
                    {[5, 6, 7, 8, 9, 10, 11].map(year => (
                        <Accordion.Item eventKey={year.toString()} key={year}>
                            <Accordion.Header>{["Quinto", "Sexto", "Septimo", "Octavo", "Noveno", "Decimo", "Once"][year - 5]}</Accordion.Header>
                            <Accordion.Body>
                                {renderGroupList(year)}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </>

    )
}

export default TeacherGroup;