import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import React, { useState, useEffect} from 'react';

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
					<th>Favorite</th>
					<th>Last Seen</th>
					<th>Rating</th>
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
			<FilmAction/>
		</tr>
	)
}

function FilmsData(props){

	const [films, setFilms] = useState(props.initialFilms);

	//posso modificare schiacciando sulla cb solo una volta, dalla seconda in poi ogni click
	//viene contato due volte(?) tipo true->false->true anche se ho fatto un solo click
	//AGG: adesso da problemi solo al secondo click, primo,trezo, quarto, ecc funziona
	const toggleFavorite = (id) => {
		setFilms(currentFilms => currentFilms.map(film => {
		    if (film.id === id) {
			props.film.favorite = !film.favorite; //si può fare?
			console.log(props.film);
			return { ...film, favorite: !film.favorite };
		    }
		    return film;
		})); //con setFilm modifico film -> useEffect si triggera
		renderFav();
	};
	
 	// useEffect per tracciare i cambiamenti nei film e fare qualcosa ogni volta che cambiano
	useEffect(() => {
		renderFav();
	}, [films]);  // Dipendenza dai films per eseguire l'effetto 

	const renderFav = () => {
		return(
			<Form.Check
				type="checkbox"
				label="Favorite"
				/* checked={films.map(fil => {
					if(fil.id = props.id) return fil.favorite;
					console.log(fil);
				})} //non funziona ma non capisco perchè*/
				checked={props.film.favorite}
				onChange={() => toggleFavorite(props.id)}
			/>
		)
	}
	
	const starsRating = () => {
		let stars = [];
		for(let i = 1; i<=5; i++){
			stars.push(
				<i key={i} className={i <= props.film.rating ? "bi bi-star-fill" : "bi bi-star"} style={{ color: i <= props.film.rating ? '#ffc107' : '#e4e5e9' }}></i>
			);
		}
		return <div>{stars}</div>
	};

	var fav = "";
	if(props.film.favorite){
		fav = "true";
	}
	else fav = 'false';

	return(
		<>
			<td>{props.film.title}</td>
			<td>
				{renderFav()}
			</td>
			<td>{props.film.lastSeen.format('YYYY-MM-DD')}</td>
			<td>
				{props.film.rating}
				{starsRating()}
			</td>
		</>
	)
}

function FilmAction(){
	return(
		<td>
			<Button variant='light' className='mx-1'><i className='bi bi-pencil-square'></i></Button> 
			<Button variant='light'><i className='bi bi-trash'></i></Button>
		</td>
	)
}

export default Films;