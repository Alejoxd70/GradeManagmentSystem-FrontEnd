import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"

const SideNavBar = () => {

    return (
        <>
            <Nav variant="pills" defaultActiveKey="users" className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark nav nav-pills mb-auto vh-100 justify-content-between">
                <div>
                    <Nav.Item className="nav-item">
                        <Nav.Link className="nav-link text-white" eventKey="users" as={Link} to={"/admin/users"}><i className="bi bi-people mx-2"></i>Usuarios</Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="nav-item">
                        <Nav.Link className="nav-link text-white" eventKey="groups"as={Link} to={"/admin/groups"}><i className="bi bi-collection mx-2"></i>Grupos</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link className="nav-link text-white" eventKey="registerStudent"as={Link} to={"/admin/register-students"}><i className="bi bi-backpack2 mx-2"></i>Matricular Estudiantes</Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="nav-item">
                        <Nav.Link className="nav-link text-white" eventKey="subjects"as={Link} to={"/admin/Subject"}><i className="bi bi-book mx-2"></i>Materias</Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="nav-item">
                        <Nav.Link className="nav-link text-white" eventKey="registerTeacher"as={Link} to={"/admin/register-teachers"}><i className="bi bi-person-workspace mx-2"></i>Matricular Profesores</Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="nav-item">
                        <Nav.Link className="nav-link text-white" eventKey="assingments" as={Link} to={"/admin/assignments"}><i className="bi bi-list-task mx-2"></i>Asignaciones</Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="nav-item">
                        <Nav.Link className="nav-link text-white" eventKey="grades"as={Link} to={"/admin/Grade"}><i className="bi bi-journal-check mx-2"></i>Notas</Nav.Link>
                    </Nav.Item>
                </div>
                
                <div className="d-flex align-items-center px-4">
                    <i className="bi bi-person-fill"></i>
                    <NavDropdown title="Pepito" id="nav-dropdown" menuVariant="dark">
                        <NavDropdown.Item eventKey="profile" as={Link} to={"/admin/profile"}>Perfil</NavDropdown.Item>
                        <NavDropdown.Item eventKey="logout">Cerrar sesión</NavDropdown.Item>
                    </NavDropdown>
                </div>
                
            </Nav>
        </>
    )
}

export default SideNavBar;