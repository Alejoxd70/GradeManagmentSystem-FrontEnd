import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axiosClient from "../../config/axios";


const AssignmentsForm = () => {
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState({});
    const [SubjectTeachers, setSubjectTeachers] = useState([]);
    const [isSummiting, setIsSubmmiting] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        subjectTeacherId: "",
    });

    // Fetch Assignments if edit mode
    useEffect(() => {
        if (id) {
            try {
                const getAssignment = async () => {
                    const { data } = await axiosClient.get(`/Assigments/${id}`);
                    const renewData = {
                        name: data.name,
                        description: data.description,
                        date: data.date,
                        subjectTeacherId: data.subjectTeacher.id,
                    }
                    setFormData(renewData);
                }
                getAssignment();
            } catch (error) {
                console.log(error);
            }
        }
    }, [id]);

    // Fetch SubjectTeachers
    useEffect(() => {
        const getSubjectTeachers = async () => {
            try {
                const { data } = await axiosClient.get("/SubjectTeachers");
                setSubjectTeachers(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getSubjectTeachers();
    }, []);

    console.log(SubjectTeachers);

    const listSubjectTeachers = SubjectTeachers.map(subjectTeacher => (
        <option key={subjectTeacher.id} value={subjectTeacher.id}>{subjectTeacher.subject.subjectname}</option>
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
                    const url = `/Assigments?${queryString}`

                    const { data } = await axiosClient.post(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/assignments");
                    }, 2000);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const queryString = new URLSearchParams(formData).toString();
                    const url = `/Assigments/${id}?${queryString}`

                    const { data } = await axiosClient.put(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/assignments");
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
                    <h2 className="text-center mb-4 text-light">{id ? "Actualizar" : "Añadir"} asignacion </h2>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlName">
                        <Form.Label className="w-25 mb-0 text-light">Nombre</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="name"
                                value={formData.name}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Ingrese un nombre para la asignacion"
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un nombre válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlDescription">
                        <Form.Label className="w-25 mb-0 text-light">Descripcion</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="description"
                                value={formData.description}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Ingrese una descripcion"
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa una descripcion valida.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlDate">
                        <Form.Label className="w-25 mb-0 text-light">Fecha</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="date"
                                value={formData.date}
                                onChange={handleOnChange}
                                type="date"
                                placeholder="Seleccione una fecha"
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingrese una fecha valida.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlSubjectTeacher">
                        <Form.Label className="w-25 mb-0 text-light">Materia</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Select
                                name="subjectTeacherId"
                                value={formData.subjectTeacherId}
                                onChange={handleOnChange}
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            >
                                {!formData.subjectTeacherId && (
                                    <option disabled value="">Selecciona una materia</option>
                                )}
                                {listSubjectTeachers}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa una materia válida.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-end mt-4">
                        <Button 
                            type="submit" 
                            className="btn btn-light px-4 py-2 rounded-pill shadow"
                            disabled={isSummiting}
                        >
                            
                            {id ? "Actualizar" : "Crear"} asignacion
                        </Button>
                        <Link className="text-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/admin/Assignments">
                            Volver
                        </Link>
                    </div>

                    {message.text && <Message message={message} />}
                </Form>
            </div>

        </>
    );
}

export default AssignmentsForm;