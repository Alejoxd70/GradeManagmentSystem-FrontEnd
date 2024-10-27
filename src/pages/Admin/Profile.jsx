import { Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import profileImage from "../../assets/profile.jpg"
import UseAuth from "../../hooks/UseAuth";

const Profile = () => {
    const { auth } = UseAuth();


    return (
        <>
            <h1 className="text-center text-light mt-4">Perfil</h1>
            <div className="d-flex justify-content-center mt-5">
                <Card bg="dark" border="info" className="text-light w-50">
                    <div className="text-center mt-2">
                        <Image src={profileImage} roundedCircle width={100} fluid />
                    </div>
                    <Card.Body>
                        <Card.Title className="text-center">{auth?.name} {auth?.lastName}</Card.Title>
                        <Card.Subtitle className="my-3  text-white text-center">
                            Información
                        </Card.Subtitle>
                        <ListGroup>
                            <ListGroup.Item action variant="secondary">
                                <strong>Email:</strong> {auth?.email}
                            </ListGroup.Item>
                            <ListGroup.Item action variant="secondary">
                                <strong>Identification:</strong> {auth?.identification}
                            </ListGroup.Item>
                            <ListGroup.Item action variant="secondary">
                                <strong>Tipo de usuario:</strong> {auth?.userType.userTypeName}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        </>

    )
}

export default Profile;