import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const User = () => {
    // Variables
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect solo se llama una vez cuando renderizamos
    useEffect(() => {
        // LLama la funcion getUsers
        getUsers();
    }, []);

    // Busca los registros en la base de datos de Users
    const getUsers = async () => {
        try {
            const { data } = await axiosClient.get("/Users")
            console.log(data);
            setUsers(data)
            setLoading(false);
        } catch (error) {
            console.log(error);

        }
    }

    // Mientras busca los users mostrar loading
    if (loading) return "Loading....";

    // Cuando presionamos delete
    const handleDeleteButton = e => {
        const id = e.target.id;

        Swal.fire({
            title: "Estás seguro?",
            text: "No prodrás revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminarlo!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosClient.delete(`/Users/${id}`);
                    Swal.fire({
                        title: "Eliminado!",
                        text: `${data}`,
                        icon: "success"
                    });
                    getUsers();
                } catch (error) {
                    console.log(error);

                }

            }
        });
    }

    // De todos los usuarios de la base de datos crea una lista
    const listUsers = users.map(user => (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.identification}</td>
            <td>{user.userType.userTypeName}</td>
            <td className="d-flex g-3 gap-2">
                <Button variant="info" as={Link} to={`/admin/users/edit/${user.id}`}><i className="bi bi-pencil-square"></i>
                </Button>
                <Button variant="danger" className="bi bi-trash" id={user.id} onClick={handleDeleteButton}></Button>
            </td>
        </tr>
    ));

    // Lo que se va a mostrar
    return (
        <>
            <h1 className="text-center text-light mt-4">Usuarios</h1>

            {/* botón agregar usuario */}
            <div className="d-flex justify-content-end">
                <Button className="mb-2" as={Link} to="/admin/users/create">Agregar nuevo usuario</Button>
            </div>

            <div>
                {/* Tabla de usuarios*/}
                <Table striped bordered hover responsive="sm" variant="dark">
                    <thead >
                        <tr>
                            {/* Campos de la base de datos */}
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>Identificación</th>
                            <th>Tipo de usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mostrar lista de usuarios */}
                        {listUsers}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default User;