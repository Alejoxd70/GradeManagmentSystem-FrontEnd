import Swal from "sweetalert2";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import { Link } from "react-router-dom";

const ListAssigments = () => {
     // Variables
     const [assignments, setAssignments] = useState([]);

     // useEffect solo se llama una vez cuando renderizamos
     useEffect(() => {
         // LLama la funcion getAssignments
         getAssignments();
     }, []);
 
     // Busca los registros en la base de datos de Assignments
     const getAssignments = async () => {
         try {
             const { data } = await axiosClient.get("/Assigments")
             console.log(data);
             setAssignments(data)
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
                     const { data } = await axiosClient.delete(`/Assigments/${id}`);
                     Swal.fire({
                         title: "Eliminado!",
                         text: `${data}`,
                         icon: "success"
                     });
                     getAssignments();
                 } catch (error) {
                     console.log(error);
 
                 }
 
             }
         });
     }
 
     // De todos las asignaciones de la base de datos crea una lista
     const listAssignments = assignments.map(assignment => (
         <tr key={assignment.id}>
             <td>{assignment.id}</td>
             <td>{assignment.name}</td>
             <td>{assignment.description}</td>
             <td>{assignment.date}</td>
             <td>{assignment.subjectTeacher.id}</td>
             <td className="d-flex g-3 gap-2">
                 <Button variant="info" as={Link} to={`/teacher/assignments/edit/${assignment.id}`}><i className="bi bi-pencil-square"></i>
                 </Button>
                 <Button variant="danger" className="bi bi-trash" id={assignment.id} onClick={handleDeleteButton}></Button>
             </td>
         </tr>
     ));


    return (
        <>
            <h1 className="text-center text-light mt-4">Lista de asignaciones</h1>
            <div className="d-flex justify-content-between">
                <Button variant="info" className="mb-2" as={Link} to="/teacher/groups/1">
                    Volver
                </Button>
                <Button className="mb-2" as={Link} to="/teacher/assignments/create">
                    Agregar una nueva asignacion
                </Button>
            </div>

            <div>
                {/* Tabla de grupos*/}
                <Table striped bordered hover responsive="sm" variant="dark">
                    <thead >
                        <tr>
                            {/* Campos de la base de datos */}
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Fecha</th>
                            <th>Materia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mostrar lista de grupos */}
                        {listAssignments}
                    </tbody>
                </Table>
            </div>
        </>
        
    );
}


export default ListAssigments;