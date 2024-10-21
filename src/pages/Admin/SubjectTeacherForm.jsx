import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axiosClient from "../../config/axios";

const SubjectTeacherForm = () => {
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState({});
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [groupYears, setGroupYears] = useState([]);
    const [isSummiting, setIsSubmmiting] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);


    const [formData, setFormData] = useState({
        teacherId: "",
        subjectId: "",
        groupYearId: ""
    });

    // Fetch subjectTeacher if edit mode
    useEffect(() => {
        if (id) {
            try {
                const getRegisterTeachers = async () => {
                    const { data } = await axiosClient.get(`/SubjectTeachers/${id}`);
                    const renewData = {
                        teacherId: data.teacherId,
                        subjectId: data.subjectId,
                        groupYearId: data.groupYearId,
                    }
                    setFormData(renewData);
                }
                getRegisterTeachers();
            } catch (error) {
                console.log(error);
            }

        }
    }, [id]);

    // Fetch Teachers
    useEffect(() => {
        const getTeachers = async () => {
            try {
                const { data } = await axiosClient.get("/Teachers");
                setTeachers(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getTeachers();
    }, []);

    console.log(teachers);

    const listTeachers = teachers.map(teachers => (
        <option key={teachers.id} value={teachers.id}>{teachers.user.name} {teachers.user.lastName}</option>
    ));


    //fetch Subjects
    useEffect(() => {
        const getSubjects = async () => {
            try {
                const { data } = await axiosClient.get("/Subject");
                setSubjects(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getSubjects();
    }, []);

    console.log(subjects);

    const listSubjects = subjects.map(subject => (
        <option key={subject.id} value={subject.id}>{subject.subjectname}</option>
    ));


    //Fetch Groupyear
    useEffect(() => {
        const getGroupYears = async () => {
            try {
                const { data } = await axiosClient.get("/GroupYear");
                setGroupYears(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getGroupYears();
    }, []);

    console.log(groupYears);

    const listGroupYears = groupYears.map(groupYear => (
        <option key={groupYear.id} value={groupYear.id}>{groupYear.year} {groupYear.group.groupName}</option>
    ));


    const handleOnChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);

    }

    const handleSubmit = async e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity() === true) {
            e.preventDefault();
            setIsSubmmiting(true);

            if (!id) {
                try {
                    const queryString = new URLSearchParams(formData).toString();
                    const url = `/SubjectTeachers?${queryString}`

                    const { data } = await axiosClient.post(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/RegisterTeacher");
                    }, 2000);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const queryString = new URLSearchParams(formData).toString();
                    const url = `/SubjectTeachers/${id}?${queryString}`

                    const { data } = await axiosClient.put(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/RegisterTeacher");
                    }, 2000);
                } catch (error) {
                    console.log(error);
                }
            }

        }

    };


    return (
        <>

            <div className="col-md-10 shadow-lg p-5 mb-5 bg-dark text-light rounded-5 w-50 mx-auto mt-4">
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-dark p-3 rounded-4" method="post">
                    <h2 className="text-center mb-4 text-light">{id ? "Update" : "Create"} a Register Teacher 💀</h2>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlTeacher">
                        <Form.Label className="w-25 mb-0 text-light">Profesor</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Select
                                name="teacherId"
                                value={formData.teacherId}
                                onChange={handleOnChange}
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            >
                                {!formData.teacherId && (
                                    <option disabled value="">Selecciona un profesor</option>
                                )}
                                {listTeachers}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un profesor válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlSubject">
                        <Form.Label className="w-25 mb-0 text-light">Materia</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Select
                                name="subjectId"
                                value={formData.subjectId}
                                onChange={handleOnChange}
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            >
                                {!formData.subjectId && (
                                    <option disabled value="">Selecciona una materia</option>
                                )}
                                {listSubjects}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa una materia válida.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlGroupYear">
                        <Form.Label className="w-25 mb-0 text-light">Año</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Select
                                name="groupYearId"
                                value={formData.groupYearId}
                                onChange={handleOnChange}
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            >
                                {!formData.groupYearId && (
                                    <option disabled value="">Selecciona un año</option>
                                )}
                                {listGroupYears}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un año válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    
                    
                    
                
                    <div className="d-flex justify-content-between align-items-end mt-4">
                        <Button 
                            type="submit" 
                            className="btn btn-light px-4 py-2 rounded-pill shadow"
                            disabled={isSummiting}
                        >
                            
                            {id ? "Actualizar" : "Crear"} Matricula de Profesor
                        </Button>
                        <Link className="text-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/admin/RegisterTeacher">
                            Volver
                        </Link>
                    </div>

                    {message.text && <Message message={message} />}
                </Form>
            </div>

        </>
    );
}

export default SubjectTeacherForm;