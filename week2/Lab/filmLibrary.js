"use strict"
const dayjs = require("dayjs"); //import dayjs

function Film(id, title, userId = 1, date, rating, favorite = false){
	this.id = id;
	this.title = title;
	this.userId = userId;
	// saved as dayjs object only if date is truthy
	this.date = date && dayjs(date);
	this.rating = rating;
	this.favorite = favorite;

	this.toString = () => {
		return `\n Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, Watch date: ${this.date && this.date.format('YYYY-MM-DD')}, Score: ${this.rating}, User: ${this.userId}`;
	}
}

function FilmLibrary(){
	this.library = [];

	this.add = (film) => {		//deve aggiungere al vettore un fiilm
		if(!this.library.some(f => f.id == film.id))
			this.library.push(film);
		else
		throw new Error('Duplicated id');
	};

	this.toString = () => {
		this.library.forEach(film => {
			console.log(film.toString());
		});
	}

	/** returns a new array containing the Films within the FilmLibrary instance sorted in ascending 
	 * order of the watch date. The movies that the user has not already watched should be put at the
	 * end. */
	this.sortByDate = () => {
		this.library = [...this.library].sort((a, b) => {
			/**
			 * sort() is expected to return a negative value if the FIRST argument 
			 * is less than the second argument, zero if they're equal, 
			 * and a positive value otherwise.
			 */
			if(!(a.date)) return 1;
			if(!(b.date)) return -1;
			return a.date.isAfter(b.date) ? 1 : -1;
		});
	}

	/** deletes a Film from the FilmLibrary based on an Id received by parameter. */
	this.deleteFilm = (Id) => {
		const newLib = this.library.filter((element) => !(element.id === Id));
		this.library = newLib;
	};

	/** deletes the Watch date of all the Films in the FilmLibrary. */
	this.resetWatchedFilms = () => {
		//this.library.forEach((film) => delete film.date);
		//this.library = [...this.library].forEach((film) => delete film.date);
		this.library.forEach((film) => delete film.date);
		
	};
}

const l = new FilmLibrary();

let film = new Film(1, "Pulp Fiction", 1, "2024-03-10", 5, true);
l.add(film);

film = new Film(2, "21 Grams", 1, "2024-03-17", 4, true);
l.add(film);

film = new Film(3, "Star Wars", 1, null, 0, false);
l.add(film);

film = new Film(4, "Matrix", 1, null, 0, false);
l.add(film);

film = new Film(5, "Shrek", 1, "2024-03-21", 3, false);
l.add(film);

l.sortByDate();
l.deleteFilm(5);
console.log(l.toString());
l.resetWatchedFilms();
console.log("reset Watched Films:")
console.log(l.toString());