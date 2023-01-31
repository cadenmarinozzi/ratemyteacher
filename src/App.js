import Home from './Components/pages/Home';
import Navbar from './Components/containers/Navbar';
import AddTeacher from './Components/pages/AddTeacher';
import RateTeacher from './Components/pages/RateTeacher';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
	return (
		<HashRouter>
			<Navbar />
			<Routes>
				<Route path='*' element={<Home />} />
				<Route path='/add-teacher' element={<AddTeacher />} />
				<Route
					path='/rate-teacher/:teacherName'
					element={<RateTeacher />}
				/>
			</Routes>
		</HashRouter>
	);
}

export default App;
