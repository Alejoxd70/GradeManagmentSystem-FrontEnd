import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Group = () => {
    // Variables
    const [groups, setGroups] = useState([]);

    // useEffect solo se llama una vez cuando renderizamos
    useEffect(() => {
        // LLama la funcion getGroups
        getGroups();
    }, []);

    // Busca los registros en la base de datos de Groups
    const getGroups = async () => {
        try {
            const { data } = await axiosClient.get("/Group")
            console.log(data);
            setGroups(data)
        } catch (error) {
            console.log(error);

        }
    }


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
                    const { data } = await axiosClient.delete(`/Group/${id}`);
                    Swal.fire({
                        title: "Eliminado!",
                        text: `${data}`,
                        icon: "success"
                    });
                    getGroups();
                } catch (error) {
                    console.log(error);

                }

            }
        });
    }

    // De todos los grupos de la base de datos crea una lista
    const listGroups = groups.map(group => (
        <tr key={group.id}>
            <td>{group.id}</td>
            <td>{group.groupName}</td>
            <td className="d-flex g-3 gap-2">
                <Button variant="info" as={Link} to={`/admin/groups/edit/${group.id}`}><i className="bi bi-pencil-square"></i>
                </Button>
                <Button variant="danger" className="bi bi-trash" id={group.id} onClick={handleDeleteButton}></Button>
            </td>
        </tr>
    ));

    // Lo que se va a mostrar
      return(
        <>
            <h1 className="text-center text-light mt-4">Grupos</h1>
             {/* botón agregar grupos */}
             <div className="d-flex justify-content-end">
                <Button className="mb-2" as={Link} to="/admin/groups/create">Agregar nuevo grupo</Button>
            </div>

            <div>
                {/* Tabla de grupos*/}
                <Table striped bordered hover responsive="sm" variant="dark">
                    <thead >
                        <tr>
                            {/* Campos de la base de datos */}
                            <th>Id</th>
                            <th>Nombre de Grupo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mostrar lista de grupos */}
                        {listGroups}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Group;