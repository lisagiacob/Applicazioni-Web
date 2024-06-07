/* eslint-disable react/prop-types */
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Table, Button } from "react-bootstrap";
import AnswerForm from './AnswerForm';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Answers (props) {
  const [mode, setMode] = useState('view'); //default: view - mostra solo il bottone  
  const [editableAnswer, setEditableAnswer] = useState();

  //posizionato qua perchè ci servirà si su AnswerTable che su AnswerForm <- Answers antenato comune
  const handleEdit = (answer) => { // farà setEditableAnswer e imposterà la modalità edit per il form
    setEditableAnswer(answer);
    setMode('edit');
  }

  return(
    <>
    <Row>
      <Col as='h2'>Answers ({props.answers.length}):</Col>
    </Row>
    <Row>
      <Col lg={10} className="mx-auto"> {/* larghezza 10 e mx-auto: centrata */}
        <AnswerTable answers={props.answers} voteUp={props.voteUp} handleEdit={handleEdit}></AnswerTable>
        <Link className='btn btn-primary' to="add">Add</Link>
      </Col>
    </Row>
    </>
  );
}

function AnswerTable (props) {
  // Permettiamo l'ordinamento in base allo score
  const [sortOrder, setSortOrder] = useState('none');
  const sortedAnswers = [...props.answers];
  if(sortOrder === 'asc')
    sortedAnswers.sort((a,b) => a.score - b.score)
  else if(sortOrder === 'desc')
    sortedAnswers.sort((a,b) => b.score - a.score) 

  const sortByScore = () => {
    setSortOrder(oldOrder => oldOrder === 'asc' ? 'desc' : 'asc');
  }

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>text</th>
          <th>Author</th>
          <th>Score <Button variant='link' onClick={sortByScore}><i className={sortOrder === 'asc' ? "bi bi-sort-numeric-up" : 'bi bi-sort-numeric-down'}></i></Button></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Facciamo un map per avere tante righe quante risposte */}
        { sortedAnswers.map((ans) => <AnswerRow answer={ans} key={ans.id} 
        voteUp={props.voteUp} handleEdit={props.handleEdit}/>) }
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return(
    <tr><AnswerData answer={props.answer}/><AnswerAction answer={props.answer } 
    voteUp={props.voteUp} handleEdit={props.handleEdit}/></tr>
  );
}

function AnswerData(props) {
  return(
    <>
      <td>{props.answer.date.format('YYYY-MM-DD')}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerAction(props) {
  return(
    <td>
      <Button variant='warning' onClick={
        () => props.voteUp(props.answer.id)
      }><i className='bi bi-arrow-up'></i></Button>
      {/* Bottone di edit */}
      <Link className='btn btn-primary' to="edit" ><i className='bi bi-pencil-square'></i></Link>
      {/* Bottone di cancellazione */}
      <Button variant='danger'><i className='bi bi-trash'></i></Button>
    </td>
  );
}

export default Answers;