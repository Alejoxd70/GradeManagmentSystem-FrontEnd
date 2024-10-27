import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"
import UseAuth from "../hooks/UseAuth"

const SideNavBarStudent = () => {

    const { auth, logOut } = UseAuth();

    return (
        <>
            <Nav variant="pills" defaultActiveKey="homepage" className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark nav nav-pills mb-auto vh-100 justify-content-between">

                <div className="sidebar d-flex flex-column justify-content-between">
                    <div>
                        <Nav.Item className="nav-item">
                            <Nav.Link className="nav-link text-white" eventKey="homepage" as={Link} to={"/student/groups"}><i className="bi bi-collection mx-2"></i>Pagina Principal</Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="nav-item">
                            <Nav.Link className="nav-link text-white" eventKey="reports" as={Link} to={"/student/reports"}><i className="bi bi-collection mx-2"></i>Informe</Nav.Link>
                        </Nav.Item>


                        <Nav.Link className="nav-link text-white" eventKey="subjects" as={Link} to={"/student/subjects"}><i className="bi bi-book mx-2"></i>Materia</Nav.Link>
                    </div>

                    <div className="d-flex align-items-center px-4">
                        <i className="bi bi-person-fill"></i>
                        <NavDropdown title={auth.name} id="nav-dropdown" menuVariant="dark">
                            <NavDropdown.Item eventKey="profile" as={Link} to={"/student/profile"}>Perfil</NavDropdown.Item>
                            <NavDropdown.Item eventKey="logout" as={Link} to={"/"} onClick={logOut}>Cerrar sesión</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>

            </Nav>
        </>
    )
}

export default SideNavBarStudent;

