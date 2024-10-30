import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import { Button, Table, Tabs, Tab, ListGroup } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import UseAuth from "../../hooks/UseAuth";
import { Link } from "react-router-dom";


const Report = () => {
    const [subjects, setSubjects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [activeTab, setActiveTab] = useState("groupYear");
    const [activeSubject, setActiveSubject] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const { auth } = UseAuth();

    useEffect(() => {
        getSubjects();
    }, []);

    // Función para obtener las materias
    const getSubjects = async () => {
        try {
            const { data } = await axiosClient.get("/Subject");
            setSubjects(data);
        } catch (error) {
            console.log(error);
        }
    };

    // Función para obtener las asignaciones de una materia específica
    const getGrades = async () => {
        try {
            const { data } = await axiosClient.get("Grade");
            setGrades(data);
        } catch (error) {
            console.log(error);
        }
    };



    // Función para descargar el contenido de la pestaña activa como PDF
    const handleDownload = () => {
        const input = document.getElementById(activeTab);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
                pdf.save(`Informe_${activeTab}.pdf`);
            })
            .catch((error) => console.error("Error generando el PDF:", error));
    };

    // Función para imprimir el contenido de la pestaña activa
    const handlePrint = () => {
        const printContent = document.getElementById(activeTab).innerHTML;
        const printWindow = window.open("", "", "height=600,width=800");
        printWindow.document.write(`
            <html>
                <head>
                    <title>Reporte</title>
                    <style>
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid black; padding: 8px; text-align: center; }
                    </style>
                </head>
                <body>${printContent}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    
    //----------------------------------------Parte Periodo----------------------------------------------------//
    const listSubjects = subjects.map(subject => (
        <tr key={subject.id} >
            <td>{subject.subjectname}</td>
            <td>50</td>
            <td>40</td>
            <td>30</td>
            <td>{(50 + 40 + 30) / 3}</td>
        </tr>
    ));

    //----------------------------------------Parte Materias-----------------------------------------------------//
    const listGrades = filteredData.map(grade => (
        <tr key={grade.id}>
            <td>{grade.assigment.name}</td>
            <td>{grade.assigment.description}</td>
            <td>{grade.value}</td>
        </tr>
    ));

    // Función para manejar la selección de una materia y cargar sus asignaciones
    const handleViewAssignments = (subjectId) => {
        setFilteredData(grades.filter(grade => grade.assigment.subjectTeacher.subject.id === subjectId && grade.student.user.id === auth.id))
        setActiveSubject(subjectId);
        getGrades(subjectId);
    };

    const listSubjects2 = subjects.map(subject => (
        <ListGroup.Item key={subject.id} action href={`#${subject.id}`} onClick={() => handleViewAssignments(subject.id)}>
            {subject.subjectname}
        </ListGroup.Item>

    ));
    //-------------------------------------------------------------------------------------------------------------//

    return (
        <>
            <h1 className="text-center text-light mt-4">Informe</h1>
            {/*----------------------------------------------------------------------------------------------------*/}
            {/* Controles de acción */}
            <div className="mb-3">
                <Button variant="secondary" onClick={handlePrint} className="me-2">
                    Imprimir
                </Button>
                <Button variant="danger" as={Link} to={"/student/groups"}>
                    Volver a Pagina Principal
                </Button>
            </div>
            {/*----------------------------------------------------------------------------------------------------*/}
            <Tabs
                defaultActiveKey="subject"
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={(key) => setActiveTab(key)}
            >
                {/* Pestaña de Materias */}
                <Tab eventKey="subject" title="Materias">
                    <div id="subject" className="d-flex gap-5">
                        <div className="w-25">
                            <h2 className="text-light mb-3">Asignatura</h2>
                            <ListGroup>
                                {listSubjects2}
                            </ListGroup>
                            {/* <ButtonGroup vertical className="w-100">
                                 {listSubjects2}
                            </ButtonGroup> */}
                        </div>

                        <div className="w-75">
                            <h2 className="text-light mb-3">Resumen de Notas de la Materia</h2>
                            {activeSubject && (
                                <Table striped bordered hover responsive="sm" variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Asignación</th>
                                            <th>Descripción</th>
                                            <th>Nota</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listGrades}
                                    </tbody>
                                </Table>
                            )}
                        </div>
                    </div>
                </Tab>

                {/* Pestaña de Periodo */}
                <Tab eventKey="groupYear" title="Periodo">
                    <div className="mb-3 d-flex justify-content-end">
                        <Button variant="primary" onClick={handleDownload} className="me-2">
                            Descargar PDF
                        </Button>
                    </div>
                    <div id="groupYear">
                        <Table striped bordered hover responsive="sm" variant="dark">
                            <thead>
                                <tr>
                                    <th>Asignatura</th>
                                    <th>Periodo 1</th>
                                    <th>Periodo 2</th>
                                    <th>Periodo 3</th>
                                    <th>Nota Final</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listSubjects}
                            </tbody>
                        </Table>
                    </div>
                </Tab>

            </Tabs>
        </>
    );
};

export default Report;
