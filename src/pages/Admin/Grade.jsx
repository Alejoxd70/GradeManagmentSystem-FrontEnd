import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { InputGroup, Form } from "react-bootstrap";

const Grade = () => {
    const [grades, setGrades] = useState([]);
    const [assigments, setAssigments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');

    // useEffect solo se llama una vez cuando renderizamos
    useEffect(() => {
        // LLama la funcion getUsers
        getGrades();
    }, []);

    // Busca los registros en la base de datos de Users
    const getGrades = async () => {
        try {
            const { data } = await axiosClient.get("/Grade")
            console.log(data);
            setGrades(data)
            setLoading(false);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        // Filter the data based on the selected age filter
        if (filter) {
            setFilteredData(grades.filter(grade => grade.assigment.id === parseInt(filter)));

        } else {
            setFilteredData(grades); // If no filter is selected, show all
        }
    }, [filter, grades]);

    useEffect(() => {
        const getAssigments = async () => {
            try {
                const { data } = await axiosClient.get("/Assigments");
                setAssigments(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getAssigments();
    }, []);

    const listAssigments = assigments.map(assigment => (
        <option key={assigment.id} value={assigment.id}>{assigment.name}</option>
    ));

    console.log(filteredData);


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
                    const { data } = await axiosClient.delete(`/Grade/${id}`);
                    Swal.fire({
                        title: "Eliminado!",
                        text: `${data}`,
                        icon: "success"
                    });
                    getGrades();
                } catch (error) {
                    console.log(error);

                }

            }
        });
    }

    // De todos las notas de la base de datos crea una lista
    const listGrades = filteredData.map(grade => (
        <tr key={grade.id}>
            <td>{grade.id}</td>
            <td>{grade.assigment.name}</td>
            <td>{grade.student.user.name} {grade.student.user.lastName}</td>
            <td>{grade.value}</td>
            <td className="d-flex g-3 gap-2">
                <Button variant="info" as={Link} to={`/admin/Grade/edit/${grade.id}`}><i className="bi bi-pencil-square"></i>
                </Button>
                <Button variant="danger" className="bi bi-trash" id={grade.id} onClick={handleDeleteButton}></Button>
            </td>
        </tr>
    ));

    const handleOnChangeFilter = e => {
        console.log("hello");
        console.log(e.target.value);

        setFilter(e.target.value)
    }

    // Lo que se va a mostrar
    return (
        <>
            <h1 className="text-center text-light mt-4">Notas</h1>


            {/* Filtrar */}
            <Form.Group className="d-flex justify-content-between align-items-center mb-3">
                <Form.Label className="w-25 mb-0 text-light">Filtrar por Asignacion</Form.Label>
                <InputGroup hasValidation className="w-75">
                    <Form.Select
                        name="assigmentId"
                        onChange={handleOnChangeFilter}
                        required
                        className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                    >
                        <option value="" defaultChecked>Mostrar Todos</option>
                        {listAssigments}
                    </Form.Select>
                </InputGroup>
            </Form.Group>

            {/* botón agregar nota */}
            <div className="d-flex justify-content-end">
                <Button className="mb-2" as={Link} to="/admin/Grade/create">Agregar una nueva calificacion</Button>
            </div>

            <div>
                {/* Tabla de notas*/}
                <Table striped bordered hover responsive="sm" variant="dark">
                    <thead >
                        <tr>
                            {/* Campos de la base de datos */}
                            <th>Id</th>
                            <th>Asignacion</th>
                            <th>Estudiante</th>
                            <th>Nota</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mostrar lista de notas */}
                        {listGrades}
                    </tbody>
                </Table>
            </div>
        </>
    );
}


export default Grade;