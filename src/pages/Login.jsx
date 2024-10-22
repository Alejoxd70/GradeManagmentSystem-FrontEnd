import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../config/axios";


const Login = () => {
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState({});
    const [loginData, setLoginData] = useState({});

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
                const userValidated = await axiosClient.post(`/Users/login?${urlData}`);
                console.log(userValidated);
                setMessage({ text: "Well done!", variant: "success" })
                setTimeout(() => {
                    navigate("/admin/users")
                }, 2000);
            } catch (error) {
                if (error.response.data.message) {
                    console.log(error);
                    setMessage({ text: error.response.data.message, variant: "danger" })
                } else {
                    console.log(error);
                    setMessage({ text: error.response.data, variant: "danger" })
                }


            }



        }

    };

    return (
        <>
            <div className="col-md-10 shadow-lg p-5 mb-5 bg-dark text-light rounded-5 w-100 mx-auto">
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-dark p-4 rounded-4">
                    <h1 className="text-center mb-4 text-light">Login</h1>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-4" controlId="controlEmail">
                        <Form.Label className="w-25 mb-0 text-light">Email address</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleOnChange}
                                placeholder="Enter email"
                                required
                                autoComplete="username"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-4" controlId="controlPassword">
                        <Form.Label className="w-25 mb-0 text-light">Password</Form.Label>
                        <InputGroup hasValidation className="w-75">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleOnChange}
                                required
                                autoComplete="current-password"
                                className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger">
                                Please provide a password.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-end mt-4">
                        <Button type="submit" className="btn btn-light px-4 py-2 rounded-pill shadow">
                            Log in
                        </Button>
                        <Link className="text-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    {message.text && <Message message={message} />}
                </Form>
            </div>

        </>
    );
}

export default Login