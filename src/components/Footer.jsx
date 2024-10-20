import { Container, Row, Col } from "react-bootstrap";


const Footer = () => {
    return(
        <>
            <footer className="bg-secondary">
                <Container fluid>
                    <Row className="p-3 text">
                        <Col className="text-center text-md-start">Nos puedes seguir en nuestras redes sociales</Col>
                        <Col sm="auto" >
                            <div className="d-flex justify-content-evenly justify-content-md-between gap-5 text-center">
                                <i className="bi bi-facebook"></i>
                                <i className="bi bi-twitter-x"></i>
                                <i className="bi bi-instagram"></i>
                            </div>
                        </Col>
                    </Row>

                    <Row className="p-2">
                        <Col className="text-center">&copy;{new Date().getFullYear()} Todos los derechos reservados</Col>
                    </Row>

                </Container>
            </footer>
        </>
    );
}


export default Footer;