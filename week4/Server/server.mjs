/* Here goes the code for the API server */
// import 
import express, {json} from 'express';
import morgan from 'morgan';
//import {check, validationResult} from 'express-validator';
//import {listQuestions, getQuestion, listAnswersOf, addAnswer, updateAnswer, voteAnswer} from './dao.mjs';
import { listQuestions } from './dao.mjs';

// init
const app = express();
const port = 3001;

// middleware
app.use(json());
app.use(morgan('dev'));

/** ROUTE */
// GET /api/questions
app.get('/api/questions', (request, response) => {
	listQuestions()
	.then(questions => response.json(questions))
	.catch(() => response.status(500).end());
});

// far partire il server
app.listen(port, () => 'API server started');