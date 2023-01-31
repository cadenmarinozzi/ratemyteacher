import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
	return (
		<div className='navbar'>
			<Link to='/'>
				<h1 className='title'>ratemyteacher</h1>
			</Link>
		</div>
	);
}

export default Navbar;
