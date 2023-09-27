import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import Dropdown from 'Components/shared/Dropdown';
import Input from 'Components/shared/Input';
import { addTeacher } from 'modules/web';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './AddTeacher.scss';

class AddTeacher extends Component {
	constructor() {
		super();

		this.state = {
			firstName: '',
			lastName: '',
			school: '',
			subject: '',
			title: '',
		};
	}

	handleAddTeacher() {
		const { firstName, lastName, school, subject, title } = this.state;

		if (firstName && lastName && school && subject) {
			addTeacher({ firstName, lastName, school, subject, title });
		}
	}

	render() {
		return (
			<div className='add-teacher'>
				<div className='add-teacher-inputs'>
					<span className='add-teacher-label'>
						Enter the details about your teacher.
					</span>
					<Input
						tooltip='The first name of your teacher'
						placeholder='Enter first Name'
						label='First Name'
						onChange={(firstName) => {
							this.setState({
								firstName,
							});
						}}
					/>
					<Input
						tooltip='The last name of your teacher'
						placeholder='Enter last Name'
						label='Last Name'
						onChange={(lastName) => {
							this.setState({
								lastName,
							});
						}}
					/>
					<Input
						tooltip='The school where your teacher teaches'
						placeholder='Enter school Name'
						label='School Name'
						onChange={(school) => {
							this.setState({
								school,
							});
						}}
					/>
					<Input
						tooltip='The subject that your teacher teaches'
						placeholder='Enter subject Name'
						label='Subject Name'
						onChange={(subject) => {
							this.setState({
								subject,
							});
						}}
					/>
					<Dropdown
						label='Title'
						options={['Mr.', 'Mrs.', 'Ms.']}
						onChange={(title) => {
							this.setState({
								title,
							});
						}}
						defaultValue={'Mr.'}
					/>
					<Link to='/'>
						<Button
							label='Add Teacher'
							cta
							icon={faUserPlus}
							onClick={this.handleAddTeacher.bind(this)}
						/>
					</Link>
				</div>
			</div>
		);
	}
}

export default AddTeacher;
