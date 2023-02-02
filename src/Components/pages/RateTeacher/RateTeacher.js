import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import StarSelector from 'Components/shared/StarSelector';
import { addRatings } from 'modules/web';
import { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import './RateTeacher.scss';

class RateTeacher extends Component {
	constructor() {
		super();

		this.state = {};
	}

	submitRating() {
		const { difficulty, learning, personality, review } = this.state;

		if (difficulty && learning && personality) {
			addRatings(this.props.teacherName, {
				difficulty,
				learning,
				personality,
				review,
			});
		}
	}

	render() {
		const { teacherName } = this.props;

		return (
			<div className='rate-teacher-container'>
				<span className='rate-teacher-label'>{teacherName}</span>
				<div className='rate-teacher'>
					<div className='rate-teacher-inputs'>
						<StarSelector
							label='Difficulty'
							tooltip='How difficult is their class?'
							onChange={(difficulty) => {
								this.setState({
									difficulty,
								});
							}}
						/>
						<StarSelector
							label='Learning'
							tooltip='How much do you learn in their class?'
							onChange={(learning) => {
								this.setState({
									learning,
								});
							}}
						/>
						<StarSelector
							label='Personality'
							tooltip='How nice are they?'
							onChange={(personality) => {
								this.setState({
									personality,
								});
							}}
						/>
					</div>
					<span>Reviews must not include:</span>
					<ul className='list'>
						<li>Hate speech</li>
						<li>personal information about you or the teacher</li>
						<li>discriminatory language or threats</li>
					</ul>
					<span>
						All reviews <b>will</b> be reviewed and may be removed
						if the guidelines are not met.
					</span>
					<textarea
						className='textbox'
						placeholder='Write a review of your teacher. What do you want other students to know about this teacher?'
						onChange={(event) =>
							this.setState({
								review: event.target.value,
							})
						}
					/>
					<Link to='/'>
						<Button
							label='Submit Rating'
							cta
							icon={faPaperPlane}
							onClick={this.submitRating.bind(this)}
						/>
					</Link>
				</div>
			</div>
		);
	}
}

function RateTeacherWrapper() {
	const { teacherName } = useParams();

	return <RateTeacher teacherName={teacherName} />;
}

export default RateTeacherWrapper;
