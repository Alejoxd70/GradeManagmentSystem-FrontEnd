import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {

    return(
        <>
            <main>
                <Container className="d-flex flex-column align-items-center justify-content-center vh-100 col-md-4">
                    <Outlet/>
                </Container>
            </main>
        </>
    );
}

export default LoginLayout;