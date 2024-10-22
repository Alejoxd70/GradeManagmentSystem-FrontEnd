import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
//import Table from "react-bootstrap/Table";*/
import { Button, Table } from 'react-bootstrap';
import { Link} from "react-router-dom";


const Report = () => {

    //const { id } = useParams();
    //console.log(id);
    const [subjects, setSubjects] = useState([]);


            /*// Variables
            const [reports, setReports] = useState([]);

            // useEffect solo se llama una vez cuando renderizamos
            useEffect(() => {
                // LLama la funcion getAssignments
                getReports();
            }, []);
        
            // Busca los registros en la base de datos de Assignments
            const getReports = async () => {
                try {
                    const { data } = await axiosClient.get("/Reports")
                    console.log(data);
                    setReports(data)
                } catch (error) {
                    console.log(error);
        
                }
            }
    
        
            // De todos las asignaciones de la base de datos crea una lista
            const listReports = reports.map(reports => (
                <tr key={reports.id}>
                    <td>{reports.assignment}</td>
                    <td>{reports.grade}</td>
                    <td>{reports.gradeTwo}</td>
                    <td>{reports.gradeThree}</td>
                    <td>{reports.gradeFinal}</td>
                </tr>
            ));


            // eslint-disable-next-line no-unused-vars
            const [formData, setFormData] = useState({
                    assignmentId: "",
                    grade: "",
                    gradeTwo: "",
                    gradeThree: "",
                    gradeFinal: "",
                });

                // Fetch Assignments if edit mode
                useEffect(() => {
                    if (id) {
                        try {
                            const getReport = async () => {
                                const { data } = await axiosClient.get(/Reports/${id});
                                const renewData = {
                                    assignmentId: data.assignment.name,
                                    grade: data.grade,
                                    gradeTwo: data.grade,
                                    gradeThree: data.grade,
                                    gradeFinal: data.grade,
                                }
                                setFormData(renewData);
                            }
                            getReport();
                        } catch (error) {
                            console.log(error);
                        }

                    }
                }, [id]);*/

                //Assigments
                useEffect(() => {
                    // LLama la funcion getAssignments
                    getSubjects();
                }, []);
            
                // Busca los registros en la base de datos de Assignments
                const getSubjects = async () => {
                    try {
                        const { data } = await axiosClient.get("/Subject")
                        console.log(data);
                        setSubjects(data)
                    } catch (error) {
                        console.log(error);
            
                    }
                }
            
                console.log(subjects);
            
                const listSubjects = subjects.map(subject => (
                    <tr key={subject.id}>
                        <td>{subject.id}</td>
                        <td>{subject.subjectname}</td>
                    </tr>
                ));
  
                // Función para descargar el reporte como archivo
                const handleDownload = () => {
                  const element = document.createElement("a");
                  const file = new Blob([document.getElementById('report').outerHTML], { type: 'text/plain' });
                  element.href = URL.createObjectURL(file);
                  element.download = "reporte.html"; // Aquí defines el nombre del archivo
                  document.body.appendChild(element);
                  element.click();
                };
              
                // Función para imprimir la tabla
                const handlePrint = () => {
                  const printContent = document.getElementById('report').outerHTML;
                  const printWindow = window.open('', '', 'height=600,width=800');
                  printWindow.document.write('<html><head><title>Reporte</title></head><body>');
                  printWindow.document.write(printContent);
                  printWindow.document.write('</body></html>');
                  printWindow.document.close();
                  printWindow.print();
                };
              
                // Función para salir (puedes reemplazar por la acción que desees)
                const handleExit = () => {
                  // Aquí podrías implementar una lógica para cerrar sesión o redirigir a otra página
                  window.location.href = "/login";  // Por ejemplo, redirigir al login
                  <Link className="text-light link-underline-opacity-0 link-underline-opacity-100-hover" to="/student/Report">
                        </Link>
                };

                
        return(
            <>
                <h1 className="text-center text-light mt-4">Informe</h1>
                {/* Botones de Descargar, Imprimir y Salir */}
                <div className="mb-3">

                    <Button variant="primary" onClick={handleDownload} className="me-2">
                    Descargar
                    </Button>

                    <Button variant="secondary" onClick={handlePrint} className="me-2">
                    Imprimir
                    </Button>
                    
                    <Button variant="danger" onClick={handleExit}>
                    Salir
                    </Button>
                    
                </div>
                   
                       
                       
                <div>
                    
                           
                    {/* Tabla de grupos*/}
                    <Table striped bordered hover responsive="sm" variant="dark">
                    <thead >
                        <tr>
                            {/* Campos de la base de datos */}
                            <th>Id</th>
                            <th>Asignatura</th>
                            <th>Periodo 1</th>
                            <th>Periodo 2</th>
                            <th>Periodo 3</th>
                            <th>Nota Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mostrar lista de grupos */}
                        {listSubjects}
                    </tbody>
                </Table>
            </div>
        </>
        );
    }

export default Report;