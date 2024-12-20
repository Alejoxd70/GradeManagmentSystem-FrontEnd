import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import SideNavBarStudent from "../components/SideNavBarStudent";
import Footer from "../components/Footer";


const StudentLayout = () => {
    return (
        <>
            <Container fluid className="d-flex p-0">
                    <SideNavBarStudent/>
                    
                    <Container className="container-section" >
                        <Outlet/>
                    </Container>
            </Container>
            <Footer nameClass={"footer"}/>
        </>
    );
}

export default StudentLayout;