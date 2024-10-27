import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { InputGroup, Form } from "react-bootstrap";


const RegisterTeacher = () => {
    // Variables
    const [registerTeachers, setRegisterTeachers] = useState([]);
    const [groupYears, setGroupYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');

    
    // useEffect solo se llama una vez cuando renderizamos
    useEffect(() => {
        // LLama la funcion getRegisterTeachers
        getRegisterTeachers();
    }, []);

    // Busca los registros en la base de datos de SubjectTeacher
    const getRegisterTeachers = async () => {
        try {
            const { data } = await axiosClient.get("/SubjectTeachers")
            console.log(data);
            setRegisterTeachers(data)
            setLoading(false);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        // Filter the data based on the selected age filter
        if (filter) {
            setFilteredData(registerTeachers.filter(registerTeacher => registerTeacher.groupYear.id === parseInt(filter)));

        } else {
            setFilteredData(registerTeachers); // If no filter is selected, show all 
        }
    }, [filter, registerTeachers]);

    

    // Fetch userTypes

    useEffect(() => {
        const getGroupYears = async () => {
            try {
                const { data } = await axiosClient.get("/GroupYear");
                setGroupYears(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getGroupYears();
    }, []);

    const listGroupYears = groupYears.map(groupYear => (
        <option key={groupYear.id} value={groupYear.id}>{groupYear.year} {groupYear.group.groupName}</option>
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
                    const { data } = await axiosClient.delete(`/SubjectTeachers/${id}`);
                    Swal.fire({
                        title: "Eliminado!",
                        text: `${data}`,
                        icon: "success"
                    });
                    getRegisterTeachers();
                } catch (error) {
                    console.log(error);

                }

            }
        });
    }

    // De todos los registros de profesores matriculados de la base de datos crea una lista
    const listRegisterTeachers = filteredData.map(registerTeacher => (
        <tr key={registerTeacher.id}>
            <td>{registerTeacher.id}</td>
            <td>{registerTeacher.teacher.user.name} {registerTeacher.teacher.user.lastName}</td>
            <td>{registerTeacher.subject.subjectname}</td>
            <td>{registerTeacher.groupYear.year}</td>
            <td className="d-flex g-3 gap-2">
                <Button variant="info" as={Link} to={`/admin/RegisterTeacher/edit/${registerTeacher.id}`}><i className="bi bi-pencil-square"></i>
                </Button>
                <Button variant="danger" className="bi bi-trash" id={registerTeacher.id} onClick={handleDeleteButton}></Button>
            </td>
        </tr>
    ));

    const handleOnChangeFilter = e => {
        console.log("hello");
        console.log(e.target.value);

        setFilter(e.target.value)
    }

    // Mientras busca los registros mostrar loading
    if (loading) return "Loading....";

    // Lo que se va a mostrar
    return (
        <>
            <h1 className="text-center text-light mt-4">Profesores Asignados</h1>



            {/* Filtrar */}
            <Form.Group className="d-flex justify-content-between align-items-center mb-3">
                <Form.Label className="w-25 mb-0 text-light">Filtrar por año</Form.Label>
                <InputGroup hasValidation className="w-75">
                    <Form.Select
                        name="groupYearId"
                        onChange={handleOnChangeFilter}
                        required
                        className="border-0 bg-secondary text-light p-3 rounded-3 bg-opacity-50"
                    >
                        <option value="" defaultChecked>Mostrar Todos</option>
                        {listGroupYears}
                    </Form.Select>
                </InputGroup>
            </Form.Group>

            {/* botón agregar nueva matricula de profesor*/ }
            <div className="d-flex justify-content-end">
                <Button className="mb-2" as={Link} to="/admin/RegisterTeacher/create">Asignar nuevo profesor</Button>
            </div>

            <div>
                {/* Tabla de profesores matriculados*/}
                <Table striped bordered hover responsive="sm" variant="dark">
                    <thead >
                        <tr>
                            {/*Campos de la base de datos */}
                            <th>Id</th>
                            <th>Id Profesor</th>
                            <th>Materia</th>
                            <th>Año</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mostrar lista de matriculas de profesores */}
                        {listRegisterTeachers}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default RegisterTeacher;