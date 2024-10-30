import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import SideNavBar from "../components/SideNavBar";
import Footer from "../components/Footer";



const AdminLayout = () => {
    // const { auth } = UseAuth();
    // console.log(auth);

    // const userType = auth.userType.userTypeName ?? "";
    // console.log(userType);
    

    return (
        <>
            {/* {userType === "Administrador" ? ( */}
                <Container fluid className="d-flex p-0">
                    <SideNavBar />

                    <Container className="container-section">
                        <Outlet />
                    </Container>
                </Container>
                <Footer nameClass={"footer"}/>
        </>
    );
}

export default AdminLayout;