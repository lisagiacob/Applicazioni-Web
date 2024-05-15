import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FormAnswers(){
	// per avere un form controllato ho bisogno dello stato
	const[text, setText] = useState('');
	const[email, setEmail] = useState('');
	const[date, setDate] = useState('');

	const handleSubmit = () => {
		
	}

	return(
		<Form>
			<Form.Group className='mb-3'>
				<Form.Label>Text</Form.Label>
				{/*required = true perchè obbligaotiro, minLength, caratteri minimi del testo da inserire*/}
				<Form.Control type="text" required={true} minLength={2} value={text} onChange={(event)=> setText(event.target.value)}></Form.Control> 
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" required={true} value={email} onChange={(event)=> setEmail(event.target.value)}></Form.Control>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Date</Form.Label>
				<Form.Control type="date" value={date} onChange={(event)=> setDate(event.target.value)}></Form.Control>
			</Form.Group>
			<Button variant='primary' type='Submit'>Add</Button>
			<Button variant='danger' type='Submit'>Cancel</Button>
		</Form>
	);
}

export default FormAnswers