import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axiosClient from "../../config/axios";

const RegisterStudentForm = () => {
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState({});
    const [Groups, setGroups] = useState([]);
    const [Students, setStudents] = useState([]);
    const [isSummiting, setIsSubmmiting] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);


    const [formData, setFormData] = useState({
        year: "",
        groupId: "",
        studentId: "",
    });

    // Fetch GroupYear if edit mode
    useEffect(() => {
        if (id) {
            try {
                const getGroupYear = async () => {
                    const { data } = await axiosClient.get(`/GroupYear/${id}`);
                    const renewData = {
                        year: data.year,
                        studentId: data.student.id,
                        groupId: data.group.id,
                    }
                    setFormData(renewData);
                }
                getGroupYear();
            } catch (error) {
                console.log(error);
            }

        }
    }, [id]);

    // Fetch Group
    useEffect(() => {
        const getGroups = async () => {
            try {
                const { data } = await axiosClient.get("/Group");
                setGroups(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getGroups();
    }, []);

    console.log(Groups);

    const listGroups = Groups.map(group => (
        <option key={group.id} value={group.id}>{group.groupName}</option>
    ));

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

    console.log(Students);

    const listStudents = Students.map(student => (
        <option key={student.id} value={student.id}>{student.user.name}</option>
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
                    const url = `/GroupYear?${queryString}`

                    const { data } = await axiosClient.post(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/groupYears");
                    }, 2000);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const queryString = new URLSearchParams(formData).toString();
                    const url = `/GroupYear/${id}?${queryString}`

                    const { data } = await axiosClient.put(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/groupYears");
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
                    <h2 className="text-center mb-4 text-light">{id ? "Actualizar" : "Añadir"} estudiante en grupo </h2>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlYear">
                        <Form.Label className="w-25 mb-0 text-light">Año</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="year"
                                value={formData.year}
                                onChange={handleOnChange}
                                type="number"
                                max={new Date().getFullYear() + 1}
                                min={new Date().getFullYear()}
                                placeholder="Escribe un año"
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un año válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlStudent">
                        <Form.Label className="w-25 mb-0 text-light">Estudiante</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Select
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleOnChange}
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            >
                                {!formData.studentId && (
                                    <option disabled value="">Selecciona un estudiante</option>
                                )}
                                {listStudents}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un estudiante válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlGroup">
                        <Form.Label className="w-25 mb-0 text-light">Grupo</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Select
                                name="groupId"
                                value={formData.groupId}
                                onChange={handleOnChange}
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            >
                                {!formData.groupId && (
                                    <option disabled value="">Selecciona un grupo</option>
                                )}
                                {listGroups}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un grupo válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-end mt-4">
                        <Button 
                            type="submit" 
                            className="btn btn-light px-4 py-2 rounded-pill shadow"
                            disabled={isSummiting}
                        >
                            
                            {id ? "Actualizar" : "Crear"} estudiante en grupo
                        </Button>
                        <Link className="text-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/admin/groupYears">
                            Volver
                        </Link>
                    </div>

                    {message.text && <Message message={message} />}
                </Form>
            </div>

        </>
    );
}

export default RegisterStudentForm;