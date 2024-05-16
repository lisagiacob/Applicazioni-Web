import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import React, { useState } from 'react';

function Films(props){
	return(
		<>
		<Row>
			<Col as='h2'>{props.filters}</Col>
		</Row>
		<Row>
			<Col lg={10} className='mx-auto'> {/* larghezza 10 e mx-auto: centrata */}
				Elenco dei Film:
				<FilmsTable films={props.films}></FilmsTable>
				{/* Il form deve stare sotto alla tabella */}
			</Col>
		</Row>
		</>
	)	
}


function FilmsTable(props){
	return(
		<Table striped>
			<thead>
				<tr>
					<th>Title</th>
					<th>Rating</th>
					<th>Last Seen</th>
					<th>Favorite</th>
				</tr>
			</thead>
			<tbody>
				{/* Facciamo un map per avere tante righe quante risposte */}
				{props.films.map((fil) => <FilmsRow initialFilms={props.films} films={fil} key={fil.id} id={fil.id}/>)}
			</tbody>
		</Table>
	)
}

function FilmsRow(props){
	return(
		<tr>
			<FilmsData initialFilms={props.initialFilms} film={props.films} id={props.id}/>
		</tr>
	)
}

function FilmsData(props){

	const [films, setFilms] = useState(props.initialFilms);

	const toggleFavorite = (id) => {
		console.log("clicked");
		setFilms(prevFilms => prevFilms.map(films => {
			if (films.id === id) {
				return { ...films, favorite: !films.favorite };
			}
			return films;
		}));
	};

	var fav = "";
	if(props.film.favorite){
		fav = "true";
	}
	else fav = 'false';

	return(
		<>
			<td>{props.film.title}</td>
			<td>{props.film.rating}</td>
			<td>{props.film.lastSeen.format('YYYY-MM-DD')}</td>
			<td>{fav}</td>
			<td>
				<Form.Check
					type="checkbox"
					label="Favorite"
					checked={props.film.favorite}
					onChange={() => toggleFavorite(props.id)}
				/>
			</td>
		</>
	)
}

export default Films;