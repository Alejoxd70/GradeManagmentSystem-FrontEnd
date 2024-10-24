import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { InputGroup, Form } from "react-bootstrap";


const User = () => {
    // Variables
    const [users, setUsers] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');

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

    useEffect(() => {
        // Filter the data based on the selected age filter
        if (filter) {
            setFilteredData(users.filter(user => user.userType.id === parseInt(filter)));

        } else {
            setFilteredData(users); // If no filter is selected, show all
        }
    }, [filter, users]);

    // Fetch userTypes
    useEffect(() => {
        const getUserTypes = async () => {
            try {
                const { data } = await axiosClient.get("/UserTypes");
                setUserTypes(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getUserTypes();
    }, []);

    const listUserTypes = userTypes.map(userType => (
        <option key={userType.id} value={userType.id}>{userType.userTypeName}</option>
    ));

    console.log(filteredData);



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
    const listUsers = filteredData.map(user => (
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

    const handleOnChangeFilter = e => {
        console.log("hello");
        console.log(e.target.value);

        setFilter(e.target.value)
    }

    // Mientras busca los users mostrar loading
    if (loading) return "Loading....";

    // Lo que se va a mostrar
    return (
        <>
            <h1 className="text-center text-light mt-4">Usuarios</h1>

            <InputGroup hasValidation className="w-75">
                <Form.Select
                    name="userTypeId"
                    onChange={handleOnChangeFilter}
                    required
                    className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                >
                    <option value="" defaultChecked>Mostrar Todos</option>
                    {listUserTypes}
                </Form.Select>
            </InputGroup>
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