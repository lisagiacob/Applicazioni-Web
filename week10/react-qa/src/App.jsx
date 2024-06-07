import 'bootstrap/dist/css/bootstrap.min.css';
import { Answer, Question } from "./QAModels.mjs";
import NavHeader from "./components/NavHeader";
import { Container } from 'react-bootstrap';;
import { useState } from 'react';

import {Routes, Route, Outlet} from 'react-router-dom';
import NotFound from "./components/NotFoundComponent"
import { QuestionLayout, AddQuestionLayout } from './components/QuestionComponent'

const fakeQuestion = new Question(1, 'Is JavaScript better than Python?', 'luigi.derussis@polito.it', '2024-02-07');
//Info globali quindi mettiamo il comando qua
fakeQuestion.init(); //Crea le risposte di quella domanda -> va a riempire this.answers
const fakeAnswers = fakeQuestion.getAnswers();  //inizializziamo lo stato

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers); // importiamo lo stato

  const voteUp = (answerId) => {
    setAnswers(oldAnswers => {
      //map ritorna già un nuovo array
      return oldAnswers.map(ans => {
        if(ans.id === answerId)
          // ritorno una nuova, aggiornata, risposta
          return new Answer(ans.id, ans.text, ans.email, ans.date, ans.score +1);
        else
          return ans;
      });
    });
  }

  const updateAnswer = (answer) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if(ans.id == answer.id)
          return new Answer (answer.id, answer.text, answer.email, answer.date, ans.score);
        else return ans;
      });
    });
  }

  const addAnswer = (answer) => { //answer: singolo oggetto contenente testo, email, data e score della nuova risposta
    setAnswers(oldAnswers => {
      //ci serve lo spreading del map perchè il max non vuole un array, ma un elenco di numeri separati da virgola 
      const newId = Math.max(...oldAnswers.map(ans => ans.id))+1;
      const newAnswer = new Answer(newId, answer.text, answer.email, answer.date, 0);
      return [...oldAnswers, newAnswer];
    })
  }

  return (
    <Routes>
      <Route element={
        <>
          {/* Se scambiassi di riga navBar e Outlet la navbar verrebbe visualizatta sotto alla pagina */}
          <NavHeader questionNum={question.id} />
          <Container fluid className='mt-3'>  {/** fluido = in base allo schermo, mt-3 = margin top 3*/}
            <Outlet/> {/* Mi fa renderizzare la route */}
          </Container>
        </>
      }/>
      <Route path = '/' element = {<p className="lead">To do: implement questions list here</p>}
      />
      {/* ha due elementi padre -> ho bisogno di un fragment o comunque di un contenitore di tutto
      * il primo componente che ci serve è una navbar
      * Possiamo avere o un file per ogni componente o tutto qui dentro
      * a NavHEader serve l'id della domanda come props */}
      <Route path="/questions/:questionID" element = {
        <QuestionLayout question={question} answers={answers} voteUp={voteUp} />
      }/>

      <Route path="/questions/:questionId/add" element={
        <AddQuestionLayout question={question} mode="add" addAnswer={addAnswer} />
      }/>

      <Route path="/questions/:questionId/edit" element={
        <AddQuestionLayout question={question} mode="edit" updateAnswer={updateAnswer}/>
      }/>

      <Route path="*" element = {<NotFound/>}/>
    </Routes>
  )
}

export default App;
