import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axios";
import UseAuth from "../hooks/UseAuth";


const Login = () => {
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState({});
    const [loginData, setLoginData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { authLogin } = UseAuth();

    const navigate = useNavigate();

    const handleOnChange = e => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
        console.log(loginData);
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
            try {
                const urlData = new URLSearchParams(loginData).toString();
                const { data } = await axiosClient.post(`/Users/login?${urlData}`);
                console.log(data);
                const rolType = data.user.userType.userTypeName;

                authLogin(data.user)

                setMessage({ text: `Hola! ${data.user.name}`, variant: "success" })

                setTimeout(() => {
                    if (rolType === "Administrador") {
                        navigate("/admin/users")
                    } else if (rolType === "Estudiante") {
                        navigate("/student/groups")
                    } else {
                        navigate("/teacher/homepage");
                    }
                }, 2000);

            } catch (error) {
                if (error.response.data.message) {
                    console.log(error);
                    // setMessage({ text: error.response.data.message, variant: "danger" })
                    setMessage({ text: "Contraseña Incorrecta", variant: "danger" })
                } else {
                    console.log(error);
                    // setMessage({ text: error.response.data, variant: "danger" })
                    setMessage({ text: "Usuario no encontrado!", variant: "danger" })

                }
            }
        }

    };

    return (
        <>
            <div className="col-md-8 shadow-lg p-5 mb-5 bg-dark text-light rounded-5 mx-auto login-container w-100">
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-dark p-4 rounded-4">
                    <h1 className="text-center mb-4 text-success">IED PIO XII</h1>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-4" controlId="controlEmail">
                        <Form.Label className="w-25 mb-0 text-light">Correo</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleOnChange}
                                placeholder="Tu email"
                                required
                                autoComplete="username"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-25"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                El email no es válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-4" controlId="controlPassword">
                        <Form.Label className="w-25 mb-0 text-light">Contraseña</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Tu contraseña"
                                onChange={handleOnChange}
                                required
                                autoComplete="current-password"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-25"
                            />
                            <Button variant="outline-success" onClick={() => setShowPassword(!showPassword)} className="ms-2 shadow-sm">
                                {/* {showPassword ? "Ocultar" : "Mostrar"} */}
                                <i className="bi bi-eye-fill"></i>
                            </Button>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa una contraseña valida.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-end align-items-end mt-4">
                        <Button type="submit" className="btn btn-success px-4 py-2 rounded-pill shadow-sm">
                            Ingresar
                        </Button>
                        {/* <Link className="text-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/forgot-password">
                            Forgot password?
                        </Link> */}
                    </div>

                    {message.text && <Message message={message} />}
                </Form>
            </div>
            {/* <div className="col-md-10 shadow-lg p-5 mb-5 bg-dark text-light rounded-5 w-100 mx-auto">
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-dark p-4 rounded-4">
                    <h1 className="text-center mb-4 text-light">IED PIO XII</h1>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-4" controlId="controlEmail">
                        <Form.Label className="w-25 mb-0 text-light">Correo</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleOnChange}
                                placeholder="Tu email"
                                required
                                autoComplete="username"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                El email no es válido.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-4" controlId="controlPassword">
                        <Form.Label className="w-25 mb-0 text-light">Contraseña</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Tu contraseña"
                                onChange={handleOnChange}
                                required
                                autoComplete="current-password"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Button variant="outline-light" onClick={() => setShowPassword(!showPassword)} className="ms-2">
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </Button>
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Por favor ingresa una contraseña valida.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-end align-items-end mt-4">
                        <Button type="submit" className="btn btn-light px-4 py-2 rounded-pill shadow">
                            Ingresar
                        </Button>
                        {/* <Link className="text-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/forgot-password">
                            Forgot password?
                        </Link> */}
                    {/* </div>

                    {message.text && <Message message={message} />}
                </Form>
            </div> */}


        </>
    );
}

export default Login