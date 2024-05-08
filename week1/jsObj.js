'use strict';

const movie = {
	"the title": 'Titanic',
	genre: 'drama',
	duration: 200
}

console.log(movie);      		 //vediamo tutte le proprietà
console.log(movie["the title"]); 	 //vediamo solo il titolo
console.log(movie.genre);


movie.director = 'Cameron';
movie['stars'] = 0;
delete movie.genre;
console.log(movie);

for(const prop in movie){
	console.log(prop);
	console.log(`${prop} is ${movie[prop]}`); //ex. "genre is drama", "the title is titanic"
}

//copia di un oggetto
const titanic = Object.assign({}, movie);
console.log(titanic);

Object.assign(movie,  {budget: '200 million USD'})
console.log(movie);

const improvedMovie = Object.assign({}, movie, {cast: '...'});
console.log(improvedMovie);
console.log(titanic);

const titanic2 = {... movie}; //copia semplice