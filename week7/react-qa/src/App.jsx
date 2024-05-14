import 'bootstrap/dist/css/bootstrap.min.css';
import {Question} from "./QAModels.mjs";
import NavHeader from "./NavHeader";

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 
  "2024-02-07");
//Info globali quindi mettiamo il comando qua
fakeQuestion.init();  //Crea le risposte di quella domanda -> va a riempire this.answers

function App() {

  return (
    //il primo componente che ci serve è una navbar
    //Possiamo avere o un file per ogni componente o tutto qui dentro
    //a NavHEader serve l'id della domanda come props
    <NavHeader questionNum = {fakeQuestion.id}/>
  )
}

export default App
