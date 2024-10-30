import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const LoginLayout = () => {

    return(
        <>
            <main>
                <Container className="d-flex flex-column align-items-center justify-content-center vh-100 col-md-4 login-layout image-login">
                    <Outlet/>
                </Container>
            </main>
                <Footer nameClass={""}/>

        </>
    );
}

export default LoginLayout;