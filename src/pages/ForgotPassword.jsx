import { useState } from "react";

import Form  from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Message from "../components/Message";
import { Link }  from "react-router-dom";



const ForgotPassword = () => {
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState({});


    const handleSubmit = e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity()) {
            e.preventDefault();
            setMessage({text: "Well Done", variant: "success"})
            
        }
        
    };

    return (
        <>
        <div className="col-md-10 shadow p-5 mb-5 bg-body-tertiary bg-opacity-75 rounded-4 w-100">

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <h1>Change</h1>

                <Form.Group className="mb-3" controlId="controlEmail">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control type="email" placeholder="Enter email" required autoComplete="username" />
                        <Form.Control.Feedback type="invalid">Please provide a valid email.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
        
                
                <div className="d-flex justify-content-between align-items-end">
                    <Button type="submit" className="btn-indigo">
                        Change Password
                    </Button>
                    <Link className="link-primary c-purple link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to="/">Log in</Link>
                </div>

                {message.text && <Message message={message}/>}

            </Form>                                        
                
        </div>
        </>
    );

}

export default ForgotPassword;