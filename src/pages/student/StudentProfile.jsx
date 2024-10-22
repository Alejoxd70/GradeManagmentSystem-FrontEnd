import {Card} from "react-bootstrap"
import { useEffect, useState }  from "react";
import axiosClient  from "../../config/axios";
import  ListGroup  from "react-bootstrap/ListGroup";


const StudentProfile = () => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUsers();
    }, );

    const getUsers = async () => {
        try{
            const { data } = await axiosClient.get("/Users/3")
            console.log(data)
            setUsers(data)
            setLoading(false)
        } catch (error){
            console.log(error);
        }
    } 
  
    if (loading) return "Loading"
    return (
        <>
        <h1 className="text-center text-light mt-4">Perfil Estudiante</h1>
        <div className="d-flex justify-content-center mt-5">
            <Card bg="dark" border= "info" className="text-light w-50">
                <Card.Body>
                    <Card.Title className="text-center">{users.name} {users.lastName}</Card.Title>
                    <Card.Subtitle className="my-3 text-white text-center">
                        Informacion
                    </Card.Subtitle>
                    <ListGroup>
                        <ListGroup.Item action variant="secondary">
                            <strong>Email:</strong> {users.email}
                        </ListGroup.Item>
                        <ListGroup.Item action variant="secondary">
                            <strong>Identificacion:</strong> {users.identification}
                        </ListGroup.Item>
                        <ListGroup.Item action variant="secondary">
                            <strong>Codigo de Estudiante:</strong> {users.student_code}
                        </ListGroup.Item>
                        <ListGroup.Item action variant="secondary">
                            <strong>Tipo de Usuario:</strong> {users.userType.userTypeName}
                        </ListGroup.Item>
                        <ListGroup.Item action variant="secondary">
                            <strong>Acudiente:</strong> {users.attendant.name}
                        </ListGroup.Item>
                        <ListGroup.Item action variant="secondary">
                            <strong>Parentezco de Acudiente:</strong> {users.attendant.relationship}
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

        </div>
    </>
  );
}
export default StudentProfile;