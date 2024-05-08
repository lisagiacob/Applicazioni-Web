'use strict';

//Define an array with all the scores you received in chronological order.
const scores = [20, -5, -1, 100, -3, 30, 50];
const betterScores = [];
let NN = 0;
//Duplicate the array, but:
for(let s of scores){		//of perchè è un array, posso usare anche const al posto di let
	//Eliminate all negative scores (call NN the number of negative scores that are deleted).
	//Non conviene eliminare elementi da un array su cui sto ciclando, mettero i punteggi buoni su un nuovo array invece
	if(s>0) betterScores.push(s);
}

NN = scores.length - betterScores.length;

//Eliminate the two lowest-ranking scores - abbiamo 2 modi: ordinamento o calcolo del min(x2)
//il min() vuole come argomento NON un array, ma una serie di val numerici, separati da una virgola <- ...array
/*let minScore = Math.min(...betterScores);
// VERSIONE CON MIN
let index = betterScores.indexOf(minScore);
betterScores.splice(index, 1); //partendo dal punto indicato dall'indice, togli un valore
minScore = Math.min(...betterScores);
index = betterScores.indexOf(minScore);
betterScores.splice(index, 1); //partendo dal punto indicato dall'indice, togli un valore*/
//il sort() modifica in place e ordina alfabeticamente, anche i numeri
	//- per modificare con una copia si usa toSorted() invece
	//sort() permette di avere come parametro un comparatore, 
	//	il cui val di ritorno deve essere un numero il cui segno indica l'ordinamento
	//	- il primo < del secondo, 0 sono uguali, + il primo > del secondo
	//	NaN viene considerato come 0
// VERSIONE CON SORT
betterScores.sort((a, b) => a - b);
betterScores.shift();
betterScores.shift();

//Add NN+2 new scores, at the end of the array, with a value equal to the (rounded) average of the existing scores.
let avg = 0;
for(let s of betterScores){
	avg += s;
}
avg /= betterScores.length;
avg = Math.round(avg);
for(let i=0; i<NN+2; i++) betterScores.push(avg);

console.log(scores);
console.log(betterScores);