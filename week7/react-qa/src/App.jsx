import 'bootstrap/dist/css/bootstrap.min.css';
import {Question} from "./QAModels.mjs";
import { Container } from 'react-bootstrap';
import NavHeader from "./NavHeader";
import QuestionDescription from './QuestionDescription';
import Answers from './Answers'

const fakeQuestion = new Question(1, 'Is JavaScript better than Python?', 'luigi.derussis@polito.it', 
  '2024-02-07');
//Info globali quindi mettiamo il comando qua
fakeQuestion.init();  //Crea le risposte di quella domanda -> va a riempire this.answers

function App() {

  return (
    <> {/** ha due elementi padre -> ho bisogno di un fragment o comunque di un contenitore di tutto*/}
      {/** il primo componente che ci serve è una navbar
       * Possiamo avere o un file per ogni componente o tutto qui dentro
       * a NavHEader serve l'id della domanda come props */}
      <NavHeader questionNum = {fakeQuestion.id}/>
      <Container fluid className='mt-3'> {/** fluido = in base allo schermo, mt-3 = margin top 3*/}
      <QuestionDescription question={fakeQuestion}/> 
      <Answers answers={fakeQuestion.getAnswers()} />
      </Container>
    </>
  )
}


export default App;
