import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import cookies from 'modules/cookies';
import { login } from 'modules/web';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

class Login extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
		};
	}

	async login() {
		const { email, password } = this.state;

		if (!email || !password) {
			return;
		}

		const loggedIn = login({ email, password });

		if (loggedIn) {
			await cookies.set('email', email);
			await cookies.set('password', password);

			// go back
			window.location.href = '/';
		}

		return;
	}

	render() {
		return (
			<div className='login'>
				<h3 className='login-label'>Login</h3>
				<div className='login-inputs'>
					<Input
						label='Email'
						placeholder='Enter your email'
						tooltip='The email associated with your account.'
						onChange={(email) => this.setState({ email })}
					/>
					<Input
						label='Password'
						placeholder='Enter your password'
						tooltip='The password to access your account.'
						type='password'
						onChange={(password) => this.setState({ password })}
					/>
					<div className='login-buttons'>
						<Button
							label='Login'
							icon={faUser}
							cta
							onClick={this.login.bind(this)}
						/>
						<Link to='/sign-up'>
							<Button label='Sign Up' icon={faUserPlus} />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
