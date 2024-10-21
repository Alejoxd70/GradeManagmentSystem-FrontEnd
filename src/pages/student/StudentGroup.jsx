import Table from "react-bootstrap/Table";
import { Card } from "react-bootstrap";

const StudentGroup = () => {


    return (
        <>
            <h1 className="text-center text-light mt-4">Student</h1>
            <Card  className="mb-3" >
                <Card.Header>601</Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Student Name</th>
                            <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            <tr>
                                <td>f</td>
                                <td>fasf</td>
                                <td>fasf</td>
                            </tr>
                        
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
        
    )
}

export default StudentGroup;