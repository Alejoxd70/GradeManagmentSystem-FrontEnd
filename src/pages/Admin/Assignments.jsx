import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { InputGroup, Form } from "react-bootstrap";

const Assignments = () => {
            // Variables
            const [assignments, setAssignments] = useState([]);
            const [subjects, setSubjects] = useState([]);
            //const [loading, setLoading] = useState(true);
            const [filteredData, setFilteredData] = useState([]);
            const [filter, setFilter] = useState('');

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

            useEffect(() => {
                // Filter the data based on the selected age filter
                if (filter) {
                    setFilteredData(assignments.filter(assignment => assignment.subjectTeacher.subject.id === parseInt(filter)));
        
                } else {
                    setFilteredData(assignments); // If no filter is selected, show all
                }
            }, [filter, assignments]);

            useEffect(() => {
                const getSubject = async () => {
                    try {
                        const { data } = await axiosClient.get("/Subject");
                        setSubjects(data);
                        console.log(data);
        
                    } catch (error) {
                        console.log(error);
                    }
                }
                getSubject();
            }, []);

            const listSubjects = subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.subjectname}</option>
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
            const listAssignments = filteredData.map(assignment => (
                <tr key={assignment.id}>
                    <td>{assignment.id}</td>
                    <td>{assignment.name}</td>
                    <td>{assignment.description}</td>
                    <td>{assignment.date}</td>
                    <td>{assignment.subjectTeacher.subject.subjectname}</td>
                    <td className="d-flex g-3 gap-2">
                        <Button variant="info" as={Link} to={`/admin/assignments/edit/${assignment.id}`}><i className="bi bi-pencil-square"></i>
                        </Button>
                        <Button variant="danger" className="bi bi-trash" id={assignment.id} onClick={handleDeleteButton}></Button>
                    </td>
                </tr>
            ));
            const handleOnChangeFilter = e => {
                console.log("hello");
                console.log(e.target.value);
        
                setFilter(e.target.value)
            }
    return(
        <>
            <h1 className="text-center text-light mt-4">Asignaciones</h1>
             {/* Filtrar */}
            <Form.Group className="d-flex justify-content-between align-items-center mb-3">
                <Form.Label className="w-25 mb-0 text-light">Filtrar por materia</Form.Label>
                <InputGroup hasValidation className="w-75">
                    <Form.Select
                        name="subjectId"
                        onChange={handleOnChangeFilter}
                        required
                        className="border-0 bg-dark text-light p-3 rounded-3 bg-opacity-50"
                    >
                        <option value="" defaultChecked>Mostrar Todos</option>
                        {listSubjects}
                    </Form.Select>
                </InputGroup>
            </Form.Group>       
                    
                    
                     {/* botón agregar asignaciones */}
            <div className="d-flex justify-content-end">
                <Button className="mb-2" as={Link} to="/admin/assignments/create">Agregar una nueva asignacion</Button>
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

export default Assignments;