import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import cookies from 'modules/cookies';
import { signUp } from 'modules/web';
import { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.scss';

class SignUp extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
		};
	}

	async signUp() {
		const { email, password, confirmPassword } = this.state;

		if (password !== confirmPassword || !email || !password) {
			return;
		}

		await signUp({ email, password });

		await cookies.set('email', email);
		await cookies.set('password', password);

		// go back
		window.location.href = '/';
	}

	render() {
		return (
			<div className='sign-up'>
				<h3 className='sign-up-label'>Sign Up</h3>
				<div className='sign-up-inputs'>
					<Input
						label='Email'
						placeholder='Enter your email'
						tooltip='The email you want associated with your account.'
						onChange={(email) => this.setState({ email })}
					/>
					<Input
						label='Password'
						placeholder='Enter your password'
						tooltip='The password to access your account.'
						type='password'
						onChange={(password) => this.setState({ password })}
					/>
					<Input
						label='Confirm Password'
						placeholder='Enter your password again'
						tooltip='Confirm your password.'
						type='password'
						onChange={(confirmPassword) =>
							this.setState({ confirmPassword })
						}
					/>
					<div className='sign-up-buttons'>
						<Button
							label='Sign Up'
							icon={faUserPlus}
							onClick={this.signUp.bind(this)}
							cta
						/>
						<Link to='/login'>
							<Button label='Login' icon={faUser} />
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

function SignUpWrapper() {
	const navigate = useNavigate();

	return <SignUp navigate={navigate} />;
}

export default SignUpWrapper;
