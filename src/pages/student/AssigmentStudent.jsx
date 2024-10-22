import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import Table from "react-bootstrap/Table";


const AssignmentStudent = () => {
  const [grades, setGrades] = useState([]);

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
    } catch (error) {
        console.log(error);

    }
}


const listGrades = grades.map(grade => (
    <tr key={grade.id}>
        <td>{grade.assigment.id}</td>
        <td>{grade.assigment.name}</td>
        <td>{grade.assigment.description}</td>
        <td>{grade.assigment.date}</td>
        <td>{grade.value}</td>
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
          <tbody>{listGrades}</tbody>
        </Table>
      </div>
    </>
  );
};

export default AssignmentStudent;
