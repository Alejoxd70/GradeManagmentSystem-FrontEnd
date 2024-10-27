import { useEffect, useState } from "react";
import axiosClient from "../../config/axios";
import { Button, Table } from 'react-bootstrap';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Report = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getSubjects();
    }, []);

    const getSubjects = async () => {
        try {
            const { data } = await axiosClient.get("/Subject");
            console.log(data);
            setSubjects(data);
        } catch (error) {
            console.log(error);
        }
    };

    const listSubjects = subjects.map(subject => (
        <tr key={subject.id}>
            <td>{subject.subjectname}</td>
            <td>50</td>
            <td>40</td>
            <td>30</td>
            <td>{(50 + 40 + 30) / 3}</td>
        </tr>
    ));

    // Función para descargar el reporte como PDF
    const handleDownload = () => {
        const input = document.getElementById('report');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 10, 10, 190, 0); // Ajusta la posición y tamaño
                pdf.save("InformeFinalNotas.pdf");
            })
            .catch((error) => console.error("Error generando el PDF:", error));
    };

    // Función para imprimir la tabla
    const handlePrint = () => {
        const printContent = document.getElementById('report').innerHTML;
        const printWindow = window.open('', '', 'height=600,width=800');
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

    const handleExit = () => {
        window.location.href = "/student/groups";
    };

    return (
        <>
            <h1 className="text-center text-light mt-4">Informe</h1>
            <div className="mb-3">
                <Button variant="primary" onClick={handleDownload} className="me-2">
                    Descargar PDF
                </Button>

                <Button variant="secondary" onClick={handlePrint} className="me-2">
                    Imprimir
                </Button>

                <Button variant="danger" onClick={handleExit}>
                    Volver a Pagina Principal
                </Button>
            </div>

            <div id="report">
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
        </>
    );
};

export default Report;
