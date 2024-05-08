'use strict';

function Movie(title, genre, duration, director){
	this.title = title;
	this.genre = genre;
	this.duration = duration;
	this.director = director;
	this.isLong = () => this.duration > 120;
}

let titanic  = new Movie('Titanic', 'drama', 200, 'Cameron');
console.log(titanic.isLong());