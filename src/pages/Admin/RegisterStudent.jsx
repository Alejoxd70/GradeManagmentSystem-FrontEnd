import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterStudent = (
) => {
        // Variables
        const [groupYears, setGroupYears] = useState([]);

        // useEffect solo se llama una vez cuando renderizamos
        useEffect(() => {
            // LLama la funcion getGroupYears
            getGroupYears();
        }, []);
    
        // Busca los registros en la base de datos de GroupYears
        const getGroupYears = async () => {
            try {
                const { data } = await axiosClient.get("/GroupYear")
                console.log(data);
                setGroupYears(data)
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
                        const { data } = await axiosClient.delete(`/GroupYear/${id}`);
                        Swal.fire({
                            title: "Eliminado!",
                            text: `${data}`,
                            icon: "success"
                        });
                        getGroupYears();
                    } catch (error) {
                        console.log(error);
    
                    }
    
                }
            });
        }
    
        // De todos los grupos de la base de datos crea una lista
        const listGroups = groupYears.map(groupYear => (
            <tr key={groupYear.id}>
                <td>{groupYear.id}</td>
                <td>{groupYear.year}</td>
                <td>{groupYear.student.student_code}</td>
                <td>{groupYear.group.groupName}</td>
                <td className="d-flex g-3 gap-2">
                    <Button variant="info" as={Link} to={`/admin/groupYears/edit/${groupYear.id}`}><i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button variant="danger" className="bi bi-trash" id={groupYear.id} onClick={handleDeleteButton}></Button>
                </td>
            </tr>
        ));
    return(
        <>
            <h1 className="text-center text-light mt-4">Matricular estudiantes en grupos</h1>
                         {/* botón agregar grupos */}
                         <div className="d-flex justify-content-end">
                <Button className="mb-2" as={Link} to="/admin/groupYears/create">Agregar nuevo estudiante en grupo</Button>
            </div>

            <div>
                {/* Tabla de grupos*/}
                <Table striped bordered hover responsive="sm" variant="dark">
                    <thead >
                        <tr>
                            {/* Campos de la base de datos */}
                            <th>Id</th>
                            <th>Año</th>
                            <th>Estudiante</th>
                            <th>Grupo</th>
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

export default RegisterStudent;