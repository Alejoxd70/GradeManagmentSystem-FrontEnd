import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect solo se llama una vez cuando renderizamos
    useEffect(() => {
        // LLama la funcion getUsers
        getSubjects();
    }, []);

    //Buscar los registros de materias

    const getSubjects = async () => {
        try {
            const { data } = await axiosClient.get("/Subject")
            console.log(data);
            setSubjects(data)
            setLoading(false);
        } catch (error) {
            console.log(error);

        }
    }

    //Cargando
    if (loading) return "Cargando...";

    //Cuando presionamos delete

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
                    const { data } = await axiosClient.delete(`/Subject/${id}`);
                    Swal.fire({
                        title: "Eliminado!",
                        text: `${data}`,
                        icon: "success"
                    });
                    getSubjects();
                } catch (error) {
                    console.log(error);

                }

            }
        });
    }

    // De todos las materias de la base de datos crea una lista
    const listSubject =subjects.map(subject => (
        <tr key={subject.id}>
            <td>{subject.id}</td>
            <td>{subject.subjectname}</td>
            <td>{subject.description}</td>
            <td className="d-flex g-3 gap-2">
                <Button variant="info" as={Link} to={`/admin/Subject/edit/${subject.id}`}><i className="bi bi-pencil-square"></i>
                </Button>
                <Button variant="danger" className="bi bi-trash" id={subject.id} onClick={handleDeleteButton}></Button>
            </td>
        </tr>
    ));

    //lo que se va a mostrar
    
    return (
        <>
            <h1 className="text-center text-light mt-4">Materias</h1>
            {/* botón agregar materia */}
            <div className="d-flex justify-content-end">
                <Button className="mb-2" as={Link} to="/admin/Subject/create">Agregar nueva materia</Button>
            </div>

            <div>
                {/* Tabla de materias*/}
                <Table striped bordered hover responsive="sm" variant="dark">
                    <thead >
                        <tr>
                            {/* Campos de la base de datos */}
                            <th>Id</th>
                            <th>Materia</th>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mostrar lista de materias */}
                        {listSubject}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Subject;
