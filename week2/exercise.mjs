import dayjs from 'dayjs'

//Creare un costruttore di riposta
function Answer(text, username, date, score=0){
	this.text = text;
	this.username = username;
	this.score = score;
	this.date = dayjs(date);

	this.toString = () => {
		return `\n${this.username} replied '${this.text}' on ${this.date.format('YYYY-MM-DD')} and got a score of ${this.score}`;
	}
}

function Question(text, username, date){
	this.text = text;
	this.username = username;
	this.date = dayjs(date);
	this.answers = [];		 	//inizializziamo la lista di risposte

	//Metodi
	this.add = (answer) => {		//deve aggiungere al vettore una answer
		this.answers.push(answer);
	}

	this.find = (username) => {
		/*const foundAnswers = [];
		for(const ans of this.answers){
			if(ans.username === username)
				foundAnswers.push(ans);
		}
		return foundAnswers;*/
		return this.answers.filter(ans => ans.username === username);
	}

	this.afterDate = (date) => {
		return this.answers.filter(ans => ans.date.isAfter(dayjs(date)));
	}

	this.listByDate = () => {	//[...array] mi da una copia dell'array
		return [...this.answers].sort((a,b) => a.date.isAfter(b.date) ? 1 : -1); //se a è dopo b restituiamo 1, altrimenti -1
	}

	this.listByScore = () => {
		return [...this.answers].sort((a,b) => a.score < b.score ? 1 : -1);
	}
}

const question = new Question('Is JS better than Python?', 'Luigi De Russis', '2024-02-27');
const firstAnswer = new Answer('Yes', 'Luca Mannella', '2024-02-28', '-10');
const secondAnswer = new Answer('Not in a million years', 'Guido van Rossum', '2024-03-01', '5');
const thirdAnswer = new Answer('No', 'Albert Einstain', '2024-03-11');
const fourthAnswer = new Answer('Then, I don\'t know', 'Luca Mannella', '2024-03-10')

question.add(firstAnswer);
question.add(secondAnswer);
question.add(thirdAnswer);
question.add(fourthAnswer);

const answersByLuca = question.find('Luca Mannella');
console.log(question);
console.log("Answers by Luca" + answersByLuca);
console.log(question.listByDate());
console.log(question.listByScore());
console.log(question.afterDate('2024-02-29'));