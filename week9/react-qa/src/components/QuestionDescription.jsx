/* eslint-disable react/prop-types */
import { Col, Row } from 'react-bootstrap';

function QuestionDescription (props) {
  return(
    <>
      <Row>
        {/* The Bootstrap grid system has four classes: xs (phones), sm (tablets), md (desktops), and lg (larger desktops). 
				** Each class scales up, so if you wish to set the same widths for xs and sm, you only need to specify xs. 
				** Remember that grid columns should add up to twelve for a row. More than that, columns will stack no matter the viewport.
				** p = paragraph*/}
        <Col md={6} as='p'>
          <strong>Question #{props.question.id}:</strong>
        </Col>
        <Col md={6} as='p' className='text-end'>
          Asked by <span className='badge rounded-pill text-bg-secondary'>{props.question.email}</span>
        </Col>
      </Row>
      <Row>
        <Col as='p' className='lead'>{props.question.text}</Col>
      </Row>
    </>
  );
}

export default QuestionDescription;