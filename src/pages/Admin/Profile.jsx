import { Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import ListGroup from "react-bootstrap/ListGroup";
import profileImage from "../../assets/profile.jpg"

const Profile = () => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // LLama la funcion getUsers
        getUsers();
    }, []);

    // Busca los registros en la base de datos de Users
    const getUsers = async () => {
        try {
            const { data } = await axiosClient.get("/Users/6")
            console.log(data);
            setUsers(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return "Loading";

    return (
        <>
            <h1 className="text-center text-light mt-4">Profile</h1>
            <div className="d-flex justify-content-center mt-5">
                <Card bg="dark" border="info" className="text-light w-50">
                    <div className="text-center mt-2">
                        <Image src={profileImage} roundedCircle width={100} fluid />
                    </div>
                    <Card.Body>
                        <Card.Title className="text-center">{users.name} {users.lastName}</Card.Title>
                        <Card.Subtitle className="my-3  text-white text-center">
                            Información
                        </Card.Subtitle>
                        <ListGroup>
                            <ListGroup.Item action variant="secondary">
                                <strong>Email:</strong> {users.email}
                            </ListGroup.Item>
                            <ListGroup.Item action variant="secondary">
                                <strong>Identification:</strong> {users.identification}
                            </ListGroup.Item>
                            <ListGroup.Item action variant="secondary">
                                <strong>UserType:</strong> {users.userType.userTypeName}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        </>

    )
}

export default Profile;