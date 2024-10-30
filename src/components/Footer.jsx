import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Footer = ({nameClass}) => {
    return(
        <>
        <div className={nameClass}>
            <footer className="bg-dark bg-opacity-75 text-light mt-auto mx-auto ">
                <Container fluid className="py-4">
                    <Row className="align-items-center text-center text-md-start mb-3">
                        <Col md="6">
                            <p className="mb-0">Institución Educativa Departamental de Guatavita PIO XII </p>
                        </Col>
                        {/* <Col md="6">
                            <p className="mb-0">Follow us on our social networks:</p>
                        </Col> */}
                        <Col md="6" className="text-center text-md-end">
                            <div className="d-flex justify-content-center justify-content-md-end gap-4 align-items-center">
                                <p className="mb-0">Follow us on our social networks:</p>
                                <a href="https://www.facebook.com/p/IED-Pio-XII-Guatavita-100089862646612/" className="text-light fs-4 hover-opacity" target="_blank"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="text-light fs-4 hover-opacity"><i className="bi bi-youtube"></i></a>
                                <a href="https://www.instagram.com/clegio_pioxii/" target="_blank"  className="text-light fs-4 hover-opacity"><i className="bi bi-instagram"></i></a>
                            </div>
                        </Col>
                    </Row>

                    <Row className="text-center text-muted small py-2 border-top border-light">
                        <Col className="text-light">&copy; {new Date().getFullYear()} All rights reserved.</Col>
                    </Row>
                    
                    <Row className="text-center pt-2">
                        <Col className="d-flex justify-content-center gap-4">
                            <Link className="text-light small footer-link" to={"/student/groups"}>Student View</Link>
                            <Link className="text-light small footer-link" to={"/teacher/homepage"}>Teacher View</Link>
                            <Link className="text-light small footer-link" to={"/admin/users"}>Admin View</Link>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
        </>
    );
}



export default Footer;