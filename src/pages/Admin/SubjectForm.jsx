import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axiosClient from "../../config/axios";

const SubjectForm = () => {
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState({});
    //const [userTypes, setUserTypes] = useState([]);
    const [isSummiting, setIsSubmmiting] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);


    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    // Fetch subject if edit mode
    useEffect(() => {
        if (id) {
            try {
                const getSubject = async () => {
                    const { data } = await axiosClient.get(`/Subject/${id}`);
                    const renewData = {
                        name: data.subjectname,
                        description: data.description,
                    }
                    setFormData(renewData);
                }
                getSubject();
            } catch (error) {
                console.log(error);
            }

        }
    }, [id]);

    

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
                    const url = `/Subject?${queryString}`

                    const { data } = await axiosClient.post(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/Subject");
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
                    const url = `/Subject/${id}?${queryString}`

                    const { data } = await axiosClient.put(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/Subject");
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
                    <h2 className="text-center mb-4 text-light">{id ? "Modificar" : "Crear"} una Materia </h2>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlsubjectname">
                        <Form.Label className="w-25 mb-0 text-light">Materia</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="name"
                                value={formData.name}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Nombre de la materia"
                                required
                                //autoComplete="username"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un nombre válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlDescription">
                        <Form.Label className="w-25 mb-0 text-light">Description</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="description"
                                value={formData.description}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Descripcion de la materia"
                                required
                                //autoComplete="username"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa una descripcion válida.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>


                    <div className="d-flex justify-content-between align-items-end mt-4">
                        <Button 
                            type="submit" 
                            className="btn btn-light px-4 py-2 rounded-pill shadow"
                            disabled={isSummiting}
                        >
                            
                            {id ? "Actualizar" : "Crear"} materia
                        </Button>
                        <Link className="text-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/admin/Subject">
                            Volver
                        </Link>
                    </div>

                    {message.text && <Message message={message} />}
                </Form>
            </div>

        </>
    );
}

export default SubjectForm;