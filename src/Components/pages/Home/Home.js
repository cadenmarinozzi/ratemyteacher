import { faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'Components/shared/Button';
import Searchbar from 'Components/shared/Searchbar';
import './Home.scss';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTeachers } from 'modules/web';

class Home extends Component {
	constructor() {
		super();

		this.state = {
			searchValue: '',
			teachers: {},
		};
	}

	handleSearchInput(searchValue) {
		this.setState({ searchValue: searchValue.toLowerCase() });
	}

	async componentDidMount() {
		const teachers = await getTeachers();

		this.setState({
			teachers,
		});
	}

	render() {
		return (
			<div className='home'>
				<div className='home-header'>
					<Searchbar
						onChange={this.handleSearchInput.bind(this)}
						placeholder='Search for a teacher or school'
					/>
					<Link to='/add-teacher'>
						<Button label='Add Teacher' cta icon={faUserPlus} />
					</Link>
				</div>
				<div className='teachers-list'>
					{Object.values(this.state.teachers)
						.filter((teacher) => {
							const teacherName = `${teacher.firstName} ${teacher.lastName}`;
							const searchValue = this.state.searchValue;

							return (
								teacherName
									.toLowerCase()
									.includes(searchValue) ||
								teacher.school
									.toLowerCase()
									.includes(searchValue.toLowerCase())
							);
						})
						.map((teacher, index) => {
							const teacherName = `${teacher.firstName} ${teacher.lastName}`;
							let ratings = teacher.ratings;
							delete ratings.reviews;

							const ratingSpans = Object.values(ratings).map(
								(ratings, index) => {
									let averageRating = 0;
									let ratingName = Object.keys(
										teacher.ratings
									)[index];
									ratingName =
										ratingName.charAt(0).toUpperCase() +
										ratingName.slice(1);

									for (let [
										rating,
										numPeople,
									] of Object.entries(ratings)) {
										averageRating += rating * numPeople;
									}

									const numPeople = Object.values(
										ratings
									).reduce((a, b) => a + b, 0);

									if (numPeople === 0) {
										return (
											<span key={index}>
												{ratingName}: No ratings
											</span>
										);
									}

									averageRating /= numPeople;
									averageRating = Math.ceil(averageRating);

									const ratingStars = [];

									for (let i = 0; i < averageRating; i++) {
										ratingStars.push(
											<FontAwesomeIcon
												key={i}
												className={
													averageRating === 5
														? 'star-gold'
														: 'star-solid'
												}
												icon={faStar}
											/>
										);
									}

									if (averageRating < 5) {
										for (
											let i = 0;
											i < 5 - averageRating;
											i++
										) {
											ratingStars.push(
												<FontAwesomeIcon
													key={i + 5}
													icon={faStarRegular}
												/>
											);
										}
									}

									return (
										<span key={index}>
											{ratingName}: {ratingStars}
										</span>
									);
								}
							);

							return (
								<div className='teacher' key={index}>
									<div className='teacher-header'>
										<div className='header-title'>
											<h2>{teacherName}</h2>
											<span className='teacher-subject'>
												{teacher.subject}
											</span>
										</div>
										<span className='teacher-school'>
											{teacher.school}
										</span>
									</div>
									<div className='teacher-ratings'>
										{ratingSpans}
									</div>
									<div className='teacher-controls'>
										<Link
											to={`/rate-teacher/${teacherName}`}>
											<Button
												icon={faStar}
												label='Rate'
											/>
										</Link>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}

export default Home;
