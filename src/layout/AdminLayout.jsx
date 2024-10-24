import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import SideNavBar from "../components/SideNavBar";


const AdminLayout = () => {
    return (
        <>
            <Container fluid className="d-flex p-0">
                    <SideNavBar/>

                    
                    <Container className="container-section">
                        <Outlet/>
                    </Container>
            </Container>
        </>
    );
}

export default AdminLayout;