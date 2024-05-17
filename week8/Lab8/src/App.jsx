import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useState } from 'react';
import Films from './LeftBar';
import dayjs from 'dayjs';

function App() {

    // Esempio di dati dei film
    let films = [
        { id: 1, title: "Film 1", rating: 4.5, favorite: true, lastSeen: dayjs('2023-04-15'), seen: true },
        { id: 2, title: "Film 2", rating: 3.0, favorite: false, lastSeen: dayjs('2023-04-01'), seen: true },
        { id: 3, title: "Film 3", rating: 5.0, favorite: true, lastSeen: dayjs('2023-05-01'), seen: false },
        // Aggiungi altri film secondo necessità
    ];

    const [filters, setFilter] = useState("All");

    const filterFilms = (filters) => {
        switch (filters) {
        case "All":
            return films;
        case "Favorites":
            return films.filter(film => film.favorite);
        case "Best Rated":
            return films.filter(film => film.rating >= 4);
        case "Seen Last Month":
            return films.filter(film => {
                const lastSeenDate = new Date(film.lastSeen);
                const aMonthAgo = new Date();
                aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);
                return films.filter(film => lastSeenDate > aMonthAgo);
            });
        case "Unseen":
            return films.filter(film => !film.seen);
        default:
            return films;
        }
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Col md={4}>
                        <Navbar.Brand href="#home">Movies</Navbar.Brand>
                    </Col>
                    <Col md={8}>
                        <Form.Control type="text" placeholder="Search" />
                    </Col>
                </Container>
            </Navbar>
            {/* fluid per occupare tutta la larghezza, min-vh-100 assicura che il Container abbia almeno l'altezza del viewport.*/}
            <Container fluid className="min-vh-100 d-flex flex-column p-0">
                <Row className="flex-grow-1">
                    <Col md={4} style={{ backgroundColor: 'grey', padding:'20px' }} className="d-flex flex-column">
                        <ButtonGroup vertical className="mt-3 flex-column">
                            <Button key="All" variant="outline-primary" onClick={() => {setFilter("All")}}>All</Button>
                            <Button key="Favorites" variant="outline-primary" onClick={() => {setFilter("Favorites")}}>Favorites</Button>
                            <Button key="Best Rated" variant="outline-primary" onClick={() => {setFilter("Best Rated")}}>Best Rated</Button>
                            <Button key="Seen Last Month" variant="outline-primary" onClick={() => {setFilter("Seen Last Month")}}>Seen Last Month</Button>
                            <Button key="Unseen" variant="outline-primary" onClick={() => {setFilter("Unseen")}}>Unseen</Button>
                        </ButtonGroup>
                    </Col>
                    <Col md={8} className="d-flex flex-column">
                        <Films films={filterFilms(filters)} filters={filters}/>
                        
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;
