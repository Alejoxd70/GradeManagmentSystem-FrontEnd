import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axiosClient from "../../config/axios";

const UserForm = () => {
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState({});
    const [userTypes, setUserTypes] = useState([]);
    const [isSummiting, setIsSubmmiting] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);


    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        identification: "",
        userTypeId: ""
    });

    // Fetch user if edit mode
    useEffect(() => {
        if (id) {
            try {
                const getUser = async () => {
                    const { data } = await axiosClient.get(`/Users/${id}`);
                    const renewData = {
                        name: data.name,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password,
                        identification: data.identification,
                        userTypeId: data.userType.id,
                    }
                    setFormData(renewData);
                }
                getUser();
            } catch (error) {
                console.log(error);
            }

        }
    }, [id]);

    // Fetch userTypes
    useEffect(() => {
        const getUserTypes = async () => {
            try {
                const { data } = await axiosClient.get("/UserTypes");
                setUserTypes(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getUserTypes();
    }, []);

    console.log(userTypes);

    const listUserTypes = userTypes.map(userType => (
        <option key={userType.id} value={userType.id}>{userType.userTypeName}</option>
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
                    const url = `/Users?${queryString}`

                    const { data } = await axiosClient.post(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/users");
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
                    const url = `/Users/${id}?${queryString}`

                    const { data } = await axiosClient.put(url)
                    setMessage({ text: data, variant: "success" })
                    setTimeout(() => {
                        navigate("/admin/users");
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
                    <h2 className="text-center mb-4 text-light">{id ? "Update" : "Create"} a user 💀</h2>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlName">
                        <Form.Label className="w-25 mb-0 text-light">Nombres</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="name"
                                value={formData.name}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Nombres del usuario"
                                required
                                autoComplete="username"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un nombre válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlLastName">
                        <Form.Label className="w-25 mb-0 text-light">Apellidos</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleOnChange}
                                type="text"
                                placeholder="Apellidos del usuario"
                                required
                                autoComplete="username"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un apellido válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlEmail">
                        <Form.Label className="w-25 mb-0 text-light">Correo</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="email"
                                value={formData.email}
                                onChange={handleOnChange}
                                type="email"
                                placeholder="Correo electrónico"
                                required
                                autoComplete="email"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un correo válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlPassword">
                        <Form.Label className="w-25 mb-0 text-light">Contraseña</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                name="password"
                                onChange={handleOnChange}
                                type="password"
                                placeholder="Contraseña"
                                required
                                autoComplete="current-password"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa una contraseña válida.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlIdentification">
                        <Form.Label className="w-25 mb-0 text-light">Identificación</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                type="number"
                                name="identification"
                                value={formData.identification}
                                onChange={handleOnChange}
                                placeholder="Identificación del usuario"
                                required
                                autoComplete="username"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa una identificación válida.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3" controlId="controlUserType">
                        <Form.Label className="w-25 mb-0 text-light">Tipo de usuario</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Select
                                name="userTypeId"
                                value={formData.userTypeId}
                                onChange={handleOnChange}
                                required
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            >
                                {!formData.userTypeId && (
                                    <option disabled value="">Selecciona un tipo de usuario</option>
                                )}
                                {listUserTypes}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa un tipo de usuario válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-end mt-4">
                        <Button 
                            type="submit" 
                            className="btn btn-light px-4 py-2 rounded-pill shadow"
                            disabled={isSummiting}
                        >
                            
                            {id ? "Actualizar" : "Crear"} usuario
                        </Button>
                        <Link className="text-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/admin/users">
                            Volver
                        </Link>
                    </div>

                    {message.text && <Message message={message} />}
                </Form>
            </div>
           



        </>
    );
}

export default UserForm;