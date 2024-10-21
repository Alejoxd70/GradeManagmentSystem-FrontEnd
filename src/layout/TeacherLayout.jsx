import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import SideNavBarTeacher from "../components/SideNavBarTeacher";


const TeacherLayout = () => {
    return (
        <>
            <Container fluid className="d-flex p-0">
                    <SideNavBarTeacher/>      

                    <Container >
                        <Outlet/>
                    </Container>
            </Container>
        </>
    );
}

export default TeacherLayout;