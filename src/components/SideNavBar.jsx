import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"
import UseAuth from "../hooks/UseAuth"

const SideNavBar = () => {
    const {logOut, auth} = UseAuth();


    return (
        <>
            <Nav variant="pills" defaultActiveKey="users" className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark nav nav-pills mb-auto vh-100 justify-content-between">
                
                <div className="sidebar sidebar d-flex flex-column justify-content-between">

                    <div>
                        <Nav.Item className="nav-item">
                            <Nav.Link className="nav-link text-white" eventKey="users" as={Link} to={"/admin/users"}><i className="bi bi-people mx-2"></i>Usuarios</Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="nav-item">
                            <Nav.Link className="nav-link text-white" eventKey="groups"as={Link} to={"/admin/groups"}><i className="bi bi-collection mx-2"></i>Grupos</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link className="nav-link text-white d-flex align-items-center" eventKey="registerStudent"as={Link} to={"/admin/groupYears"}><i className="bi bi-backpack2 mx-2"></i><span>Asignar Estudiantes</span>
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="nav-item">
                            <Nav.Link className="nav-link text-white" eventKey="subjects"as={Link} to={"/admin/Subject"}><i className="bi bi-book mx-2"></i>Materias</Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="nav-item">
                            <Nav.Link className="nav-link text-white" eventKey="registerTeacher"as={Link} to={"/admin/RegisterTeacher"}><i className="bi bi-person-workspace mx-2"></i><span>Asignar Profesores</span></Nav.Link>
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
                        <NavDropdown title={auth?.name} id="nav-dropdown" menuVariant="dark">
                            <NavDropdown.Item eventKey="profile" as={Link} to={"/admin/profile"}>Perfil</NavDropdown.Item>
                            <NavDropdown.Item eventKey="logout" as={Link} to ={"/"} onClick={logOut}>Cerrar sesión</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                
            </Nav>
        </>
    )
}

export default SideNavBar;