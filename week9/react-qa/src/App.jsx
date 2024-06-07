import 'bootstrap/dist/css/bootstrap.min.css';
import { Answer, Question } from "./QAModels.mjs";
import NavHeader from "./components/NavHeader";
import { Container } from 'react-bootstrap';
import QuestionDescription from './components/QuestionDescription';
import Answers from './components/AnswerComponents';
import { useState } from 'react';

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
    <>{/** ha due elementi padre -> ho bisogno di un fragment o comunque di un contenitore di tutto*/}
      {/** il primo componente che ci serve è una navbar
       * Possiamo avere o un file per ogni componente o tutto qui dentro
       * a NavHEader serve l'id della domanda come props */}
      <NavHeader questionNum={question.id} />
      <Container fluid className='mt-3'>  {/** fluido = in base allo schermo, mt-3 = margin top 3*/}
        <QuestionDescription question={question} />
        <Answers answers={answers} voteUp={voteUp} 
        addAnswer={addAnswer} updateAnswer={updateAnswer }></Answers>
      </Container>
    </>
  )

}

export default App;
