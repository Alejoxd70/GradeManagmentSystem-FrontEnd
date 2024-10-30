import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import SideNavBarTeacher from "../components/SideNavBarTeacher";
import Footer from "../components/Footer";


const TeacherLayout = () => {
    return (
        <>
            <Container fluid className="d-flex p-0">
                    <SideNavBarTeacher/>      

                    <Container className="container-section" >
                        <Outlet/>
                    </Container>
            </Container>
            <Footer nameClass={"footer"}/>
        </>
    );
}

export default TeacherLayout;