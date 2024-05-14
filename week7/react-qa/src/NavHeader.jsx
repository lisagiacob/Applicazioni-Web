import {Container, NavBar} from 'react-bootstrap';
import PropTypes from 'prop-types';

function NavHeader(props) {
	return(
		<NavBar bg='primary' data-bs-theme='dark'>
			<Container fluid > /* full with container spanning the entire view*/
				<NavBar.Brand> HeapOverrun - Question {props.qustionNum}</NavBar.Brand>
			</Container>
		</NavBar>
	)
}

//Best practice ma non necessario
NavHeader.propTypes = {
	questionNum: PropTypes.number
}

export default NavHeader;