import Home from './Components/pages/Home';
import Navbar from './Components/containers/Navbar';
import AddTeacher from './Components/pages/AddTeacher';
import RateTeacher from './Components/pages/RateTeacher';
import { HashRouter, Route, Routes } from 'react-router-dom';
import SignUp from 'Components/pages/SignUp';
import Login from 'Components/pages/Login';
import { Component } from 'react';
import cookies from 'modules/cookies';
import { login } from 'modules/web';
import Teacher from 'Components/pages/Teacher';
import './App.scss';

class App extends Component {
	constructor() {
		super();

		this.state = {
			loggedIn: false,
			loaded: false,
		};
	}

	async componentDidMount() {
		const email = cookies.get('email');
		const password = cookies.get('password');

		await cookies.set('loggedIn', 'false');

		if (email && password) {
			const loggedIn = login({ email, password });

			await cookies.set('loggedIn', loggedIn ? 'true' : 'false');
			this.setState({ loggedIn });
		}

		this.setState({ loaded: true });
	}

	render() {
		const { loggedIn, loaded } = this.state;

		return (
			<HashRouter>
				<Navbar loggedIn={loggedIn} />
				<Routes>
					<Route path='*' element={<Home />} />
					<Route
						path='/add-teacher'
						element={loggedIn ? <AddTeacher /> : <Login />}
					/>
					<Route
						path='/rate-teacher/:teacherName'
						element={loggedIn ? <RateTeacher /> : <Login />}
					/>
					<Route
						path='/teacher/:teacherName'
						element={<Teacher />}
						loggedIn={loggedIn}
					/>
					<Route path='/sign-up' element={<SignUp />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</HashRouter>
		);
	}
}

export default App;
