import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"

const SideNavBarStudent = () => {

    return (
        <>
            <Nav variant="pills" defaultActiveKey="users" className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark nav nav-pills mb-auto vh-100 justify-content-between">
                <div>

                    <Nav.Item className="nav-item">
                        <Nav.Link className="nav-link text-white" eventKey="homepage" as={Link} to={"/student/groups"}><i className="bi bi-collection mx-2"></i>Pagina Principal</Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="nav-item">

                        <Nav.Link className="nav-link text-white" eventKey="reports" as={Link} to={"/student/reports"}><i className="bi bi-collection mx-2"></i>Informe</Nav.Link>
                    </Nav.Item>


                    <Nav.Link className="nav-link text-white" eventKey="subjects" as={Link} to={"/student/subjects"}><i className="bi bi-collection mx-2"></i>Materia</Nav.Link>





                </div>

                <div className="d-flex align-items-center px-4">
                    <i className="bi bi-person-fill"></i>
                    <NavDropdown title="Pepito" id="nav-dropdown" menuVariant="dark">
                        <NavDropdown.Item eventKey="profile" as={Link} to={"/student/profile"}>Perfil</NavDropdown.Item>
                        <NavDropdown.Item eventKey="logout">Cerrar sesión</NavDropdown.Item>
                    </NavDropdown>
                </div>

            </Nav>
        </>
    )
}

export default SideNavBarStudent;

