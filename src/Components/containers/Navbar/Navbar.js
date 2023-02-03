import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import cookies from 'modules/cookies';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

function Navbar({ loggedIn }) {
	const email = cookies.get('email');
	const navigate = useNavigate();

	return (
		<div className='navbar'>
			<Link to='/'>
				<h1 className='title'>ratemyteacher</h1>
			</Link>
			{!loggedIn && (
				<Link to='/sign-up'>
					<Button label='Sign Up' icon={faUserPlus} />
				</Link>
			)}
			{loggedIn && <span className='email'>{email}</span>}
		</div>
	);
}

export default Navbar;
