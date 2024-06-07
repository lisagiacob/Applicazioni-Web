import dayjs from 'dayjs';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function AnswerForm(props) {
  // per avere un form controllato ho bisogno dello stato
  const [text, setText] = useState(props.answer ? props.answer.text : '');
  const [email, setEmail] = useState(props.answer ? props.answer.email : '');
  const [date, setDate] = useState(props.answer ? props.answer.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // impedisce la rirenderizzazione dell'intera pagina che causerebbe la perdita della nuova risposta
    // validazione dei campi (text, email ...) già fatta
    const answer = {text, email, date}; //<- non sto creando una nuova risposta, salvo solo i dati del form, anche perchè non ho l'id
    // TODO: aggiungere delle validazioni - ricontrollare ad essempio che il testo abbia almeno uno spazio per esempio
    if(props.mode === 'edit'){
      props.updateAnswer({id: props.answer.id, ...answer});
    }else{
      // creare una nuova risposta
      // aggiungere la risposta allo stato (che contiene tutte le risposte) che è in App.jsx <- metodo per modificare lo stato
      props.addAnswer(answer);
    }
    navigate("..", {relative: "path"});
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Text</Form.Label>
        {/*required = true perchè obbligaotiro, minLength, caratteri minimi del testo da inserire*/}
        <Form.Control type="text" required={true} minLength={2} value={text} onChange={(event) => setText(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>email</Form.Label>
        <Form.Control type="email" required={true} value={email} onChange={(event) => setEmail(event.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)}></Form.Control>
      </Form.Group>
      { props.mode === 'add' && <Button variant='success' type='Submit'>Add</Button> }
      { props.mode === 'edit' && <Button variant='success' type='Submit'>Update</Button> }
      <Link className='btn btn-danger' to=".." relative="path">Cancel</Link >
    </Form>
  );
}

export default AnswerForm;