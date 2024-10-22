import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";


const AssignmentStudent = () => {
  const [assignments, setAssignments] = useState([]);

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


  const listAssignments = assignments.map(assignment => (
    <tr key={assignment.id}>
      <td className="text-center">{assignment.id}</td>
      <td className="text-center">{assignment.name}</td>
      <td className="text-center">{assignment.description}</td>
      <td className="text-center">{assignment.date}</td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-center text-light mt-4">Asignaciones</h1>
      <div>
        <Table striped bordered hover responsive="sm" variant="dark">
          <thead>
            <tr>
              <th className="text-center">Id</th>
              <th className="text-center">Nombre</th>
              <th className="text-center">Descripción</th>
              <th className="text-center">Fecha</th>
              <th className="text-center">Nota</th>
            </tr>
          </thead>
          <tbody>{listAssignments}</tbody>
        </Table>
      </div>
    </>
  );
};

export default AssignmentStudent;
