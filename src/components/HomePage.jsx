import { Card, Container } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";

const HomePage = () => {


	return (
		<>
        <div >
			<Navbar bg="dark" expand="lg" className="shadow-sm">
				<Container>
					<Navbar.Brand href="#home" className="fw-bold text-light">Colegio PIOXII</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link className="text-light" href="#about">Sobre Nosotros</Nav.Link>
							<Nav.Link className="text-light" href="#services">Servicios</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<div className="image-homepage">
				<Container>
					<h1 className="display-3 fw-bold">Bienvenidos al Colegio PIOXII</h1>
					<p className="lead">Donde creamos el futuro, un estudiante a la vez.</p>
					<Button variant="outline-light" href="#about" size="lg">Conoce Más</Button>
				</Container>
			</div>

			<Container id="services" className="my-5 text-light">
				<h2 className="text-center mb-5">Nuestros Servicios</h2>
				<Row>
					<Col md={4} className="">
						<Card className="text-center border-0 h-100 bg-secondary">
							<Card.Body>
								<i className="bi bi-mortarboard-fill" style={{ fontSize: '3rem', color: '#007bff' }}></i>
								<Card.Title className="mt-3 fw-bold">Educación de Calidad</Card.Title>
								<Card.Text>
									Ofrecemos una formación académica integral que impulsa el crecimiento personal y profesional de nuestros estudiantes.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4}>
						<Card className="text-center border-0 h-100 bg-secondary">
							<Card.Body>
								<i className="bi bi-building" style={{ fontSize: '3rem', color: '#007bff' }}></i>
								<Card.Title className="mt-3 fw-bold">Instalaciones</Card.Title>
								<Card.Text>
									Contamos con una gran cantidad de aulas donde nuestros estudiantes pudeden aprender nuevas cosas.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4}>
						<Card className="text-center border-0 h-100 bg-secondary">
							<Card.Body>
								<i className="bi bi-globe" style={{ fontSize: '3rem', color: '#007bff' }}></i>
								<Card.Title className="mt-3 fw-bold fw-bold">Enfoque</Card.Title>
								<Card.Text>
									Preparamos a nuestros alumnos para ser ciudadanos del mundo.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>

			{/* Sección Sobre Nosotros con fondo alternado */}
			<h2 className="text-center mb-5 text-light">Sobre Nosotros</h2>
			<div className="bg-secondary py-5 rounded-2">
				<Container id="about">
					<Row>
						<Col md={6}>
							<h2 className="text-center">Misión</h2>
							<p className="lead text-center">
								La Institución Educativa Departamental Pío XII Técnico en Turismo del municipio de Guatavita,Cundinamarca, forma integralmente a todos sus estudiantes, promoviendo las habilidades del sigloXXI, el desarrollo del pensamiento y la autonomía, proporcionándoles herramientas idóneas parasu crecimiento académico y humano. Igualmente, potencializa la formación en competenciascomunicativas en el idioma inglés y la formación técnica en turismo con especialidad en CocinaBásica, a través del fortalecimiento del proyecto de vida.
							</p>
						</Col>
						<Col md={6}>
							<h2 className="text-center">Visión</h2>
							<p className="lead text-center">
							En el año 2024, la Institución Educativa Departamental Pío XII Técnico en Turismo del municipiode Guatavita, Cundinamarca, será reconocida en el ámbito provincial y departamental como unainstitución de calidad educativa. Esto se logrará gracias a su formación técnica con especialidaden Cocina Básica, al programa educación formal para adultos, al programa de transición al bilingüismo (inglés) “Learning More Together” y al desarrollo de habilidades del siglo XXI. Estoscomponentes contribuirán a la innovación y competitividad en el mundo laboral, social y ambiental
							</p>
						</Col>
					</Row>
				</Container>
			</div>
        </div>

		</>

	)
}

export default HomePage;