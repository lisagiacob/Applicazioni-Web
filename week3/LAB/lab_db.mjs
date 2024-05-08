import sqlite from 'sqlite3';
import dayjs from 'dayjs'; 
//const dayjs = require("dayjs"); //import dayjs

const db = new sqlite.Database('films.db', (err) => {
	if (err) throw err;
});

function Film(id, title, userId = 1, date, rating, favorite = false){
	this.id = id;
	this.title = title;
	this.userId = userId;
	// saved as dayjs object only if date is truthy
	this.date = date && dayjs(date);
	this.rating = rating;
	this.favorite = favorite;

	this.toString = () => {
		return `\n Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, ` + 
		`Watch date: ${this.date && this.date.format('YYYY-MM-DD')}, ` + 
		`Score: ${this.rating}, User: ${this.userId}`;
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
		this.library.forEach((film) => delete film.date);
	};

	/** Retrieve all the stored films and return a Promise that resolves to an array of Film objects. */
	this.getStoredFilms = () => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM films';
			let storedFilms = [];
			db.all(sql, [], (err, rows) =>{
				if(err) 
					reject(err);
				else {
					for(let row of rows){
						storedFilms.push(row);
					}
					resolve(storedFilms);
				}
			});
		});
	}

	/** Retrieve all favorite films and return a Promise that resolves to an array of Film objects. */
	this.getFavoriteFilms = () => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM films WHERE rating >= 4';
			let storedFilms = [];
			db.all(sql, [], (err, rows) =>{
				if(err) 
					reject(err);
				else {
					for(let row of rows){
						storedFilms.push(row);
					}
					resolve(storedFilms);
				}
			});
		});
	}

	/** Retrieve all films watched today and return a Promise that resolves to an array of Film objects. */
	this.getWatchedToday = () => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM films WHERE watchDate = ?';
			let storedFilms = [];
			db.all(sql, ["2024-03-17"], (err, rows) =>{
				if(err) 
					reject(err);
				else {
					for(let row of rows){
						storedFilms.push(row);
					}
					resolve(storedFilms);
				}
			});
		});
	}	

	/** Retrieve films whose watch date is earlier than a given date (received as a parameter). 
	 *  Return a Promise that resolves to an array of Film objects. */
	this.getWatchedEarlier = () => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM films WHERE watchDate < ?';
			let storedFilms = [];
			db.all(sql, ["2024-03-17"], (err, rows) =>{
				if(err) 
					reject(err);
				else {
					for(let row of rows){
						storedFilms.push(row);
					}
					resolve(storedFilms);
				}
			});
		});
	}	
	/** Retrieve films whose rating is greater than or equal to a given number (received as a parameter).
	 *  Return a Promise that resolves to an array of Film objects. */
	this.getRateGreater = (rating) => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM films WHERE rating >= ?';
			let storedFilms = [];
			db.all(sql, [rating], (err, rows) =>{
				if(err) 
					reject(err);
				else {
					for(let row of rows){
						storedFilms.push(row);
					}
					resolve(storedFilms);
				}
			});
		});
	}

	/** Retrieve films whose title contains a given string (received as a parameter). 
	 *  Return a Promise that resolves to an array of Film objects. */
	this.getTitle = (tit) => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM films WHERE title = ?';
			let storedFilms = [];
			let t = '%' + tit + '%';
			db.all(sql, [t], (err, rows) =>{
				if(err) 
					reject(err);
				else {
					for(let row of rows){
						storedFilms.push(row);
					}
					resolve(storedFilms);
				}
			});
		});
	}
}

const l = new FilmLibrary();
console.log(await l.getTitle("Fiction"));