import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UseAdmin from "../../hooks/UseAdmin";

const UserForm = () => {
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState({});
    const [isSummiting, setIsSubmmiting] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [passwordFeedback, setPasswordFeedback] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { getUser, userTypes, createUser, updateUser } = UseAdmin();


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
                const fechtUserData = async () => {
                    const user = await getUser(id);
                    setFormData(user)

                }
                fechtUserData();
            } catch (error) {
                console.log(error);
            }
        }
    }, [id, getUser]);

    console.log(userTypes);

    const listUserTypes = userTypes.map(userType => (
        <option key={userType.id} value={userType.id}>{userType.userTypeName}</option>
    ));

    const handleOnChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);

        if (e.target.name === "password") {
            validatePassword(e.target.value)
        }

    }

    const validatePassword = password => {
        const minLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        if (!minLength) {
            setPasswordFeedback("La contraseña debe tener al menos 8 caracteres.");
            return (false);
        } else if (!hasUppercase) {
            setPasswordFeedback("La contraseña debe incluir al menos una letra mayúscula.");
            return (false);
        } else if (!hasNumber) {
            setPasswordFeedback("La contraseña debe incluir al menos un número.");
            return (false);
        } else {
            setPasswordFeedback("");
            return (true);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false || passwordFeedback !== "") {
            e.stopPropagation();
        } else {

            setValidated(true);

            e.preventDefault();
            setIsSubmmiting(true);

            if (!id) {
                try {
                    const response = await createUser(formData);
                    setMessage({ text: response, variant: "success" });
                    setTimeout(() => {
                        navigate("/admin/users");
                    }, 2000);
                } catch (error) {
                    console.log(error);
                }

            } else {
                try {
                    const response = await updateUser(id, formData)
                    console.log(response);

                    setMessage({ text: response, variant: "success" })
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
                    <h2 className="text-center mb-4 text-light">{id ? "Actualiza" : "Crea"} un Usuario</h2>

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
                                type={showPassword ? "text" : "password"}
                                name="password"
                                onChange={handleOnChange}
                                placeholder={id ? "Actualiza contraseña (opcional)" : "Tu contraseña"}
                                required={!id}
                                autoComplete="current-password"
                                isInvalid={passwordFeedback !== ""}
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Button variant="outline-light" onClick={() => setShowPassword(!showPassword)} className="ms-2">
                                {/* {showPassword ? "Ocultar" : "Mostrar"} */}
                                <i className="bi bi-eye-fill"></i>
                            </Button>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                {passwordFeedback || "Por favor ingresa una contraseña válida."}
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