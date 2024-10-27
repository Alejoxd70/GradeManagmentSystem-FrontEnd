import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axiosClient from "../../config/axios";

const GradeForm = () => {
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState({});
    const [assigment, setAssigment] = useState([]);
    const [student, setStudent] = useState([]);
    const [isSummiting, setIsSubmmiting] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);


    const [formData, setFormData] = useState({
        value: "",
        assigmentId: "",
        studentId: ""
    });

    // Fetch grade if edit mode
    useEffect(() => {
        if (id) {
            try {
                const getGrades = async () => {
                    const { data } = await axiosClient.get(`/Grade/${id}`);
                    const renewData = {
                        value: data.value,
                        assigmentId: data.assigment.id,
                        studentId: data.student.id,
                    }
                    setFormData(renewData);
                }
                getGrades();
            } catch (error) {
                console.log(error);
            }

        }
    }, [id]);

    // Fetch userTypes
    useEffect(() => {
        const getAssigment = async () => {
            try {
                const { data } = await axiosClient.get("/assigments");
                setAssigment(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getAssigment();
    }, []);

    console.log(assigment);

    const listAssigments = assigment.map(assigment => (
        <option key={assigment.id} value={assigment.id}>{assigment.name}</option>
    ));

    useEffect(() => {
        const getStudent = async () => {
            try {
                const { data } = await axiosClient.get("/students");
                setStudent(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getStudent();
    }, []);

    console.log(student);

    const listStudents = student.map(student => (
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
                    const url = `/Grade?${queryString}`

                    const { data } = await axiosClient.post(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/Grade");
                    }, 2000);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    // if (!formData.password) {
                    //     delete formData.password;
                    // }
                    const queryString = new URLSearchParams(formData).toString();
                    const url = `/Grade/${id}?${queryString}`

                    const { data } = await axiosClient.put(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/Grade");
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
                    <h2 className="text-center mb-4 text-light">{id ? "Modificar" : "Crear"} una calificacion </h2>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlValue">
                        <Form.Label className="w-25 mb-0 text-light">Notas</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="value"
                                value={formData.value}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Notas"
                                required
                                //autoComplete="username"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa una calificacion válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlAssigment">
                        <Form.Label className="w-25 mb-0 text-light">Asignacion</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Select
                                name="assigmentId"
                                value={formData.assigmentId}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Asignacion"
                                required
                                //autoComplete="username"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            >
                            {!formData.assigmentId && (
                                    <option disabled value="">Selecciona una asignacion</option>
                                )}
                                {listAssigments}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa una asignacion válida.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlStudent">
                        <Form.Label className="w-25 mb-0 text-light">Estudiantes</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Select
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Estudiante"
                                required
                                //autoComplete="username"
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



                    <div className="d-flex justify-content-between align-items-end mt-4">
                        <Button 
                            type="submit" 
                            className="btn btn-light px-4 py-2 rounded-pill shadow"
                            disabled={isSummiting}
                        >
                            
                            {id ? "Actualizar" : "Crear"} calificacion
                        </Button>
                        <Link className="text-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/admin/Grade">
                            Volver
                        </Link>
                    </div>

                    {message.text && <Message message={message} />}
                </Form>
            </div>

        </>
    );
}

export default GradeForm;