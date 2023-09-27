import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
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
			{loggedIn && (
				<div className='navbar-section'>
					<span className='email'>{email}</span>
					<Button
						label='Logout'
						onClick={async () => {
							await cookies.set('loggedIn', 'false');
							await cookies.set('email', '');
							await cookies.set('password', '');
							window.location = '/';
						}}
						icon={faSignInAlt}
					/>
				</div>
			)}
		</div>
	);
}

export default Navbar;
