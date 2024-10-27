import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const AssignmentStudent = () => {
	const [grades, setGrades] = useState([]);
	const [filterGrades, setFilterGrades] = useState([]);
	const [loading, setLoading] = useState(true)
	const { id } = useParams();
	console.log(id);
	


	useEffect(() => {
		// LLama la funcion getUsers
		getGrades();
		setLoading(false)
	}, []);
	
	useEffect(() => {
		const gradeFilter = () => {
			const filter = grades.filter(grade => grade.assigment.subjectTeacher.subject.id === parseInt(id));
			console.log(filter);
			setFilterGrades(filter)
		}
		gradeFilter();
	}, [grades, id])

	// Busca los registros en la base de datos de Users
	const getGrades = async () => {
		try {
			const { data } = await axiosClient.get("/Grade")
			console.log(data);
			setGrades(data)
		} catch (error) {
			console.log(error);

		}
	}


	const listGrades = filterGrades.map(grade => (
		<tr key={grade.id} className="text-center">
			<td>{grade.assigment.name}</td>
			<td>{grade.assigment.description}</td>
			<td>{grade.assigment.date}</td>
			<td>{grade.value}</td>
		</tr>
	));

	if (loading) return "Loading"
	return (
		<>
			<h1 className="text-center text-light mt-4">Asignaciones</h1>
			<Button className="mb-2" as={Link} to={"/student/subjects"}>Volver</Button>
			<div>
				<Table striped bordered hover responsive="sm" variant="dark">
					<thead>
						<tr className="text-center">
							<th>Nombre</th>
							<th>Descripción</th>
							<th>Fecha</th>
							<th>Nota</th>
						</tr>
					</thead>
					<tbody>{listGrades}</tbody>
				</Table>
			</div>
		</>
	);
};

export default AssignmentStudent;
