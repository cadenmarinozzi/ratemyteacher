import { faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'Components/shared/Button';
import Searchbar from 'Components/shared/Searchbar';
import './Home.scss';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTeachers } from 'modules/web';
import cookies from 'modules/cookies';
import contentFilterText from 'modules/filtering';

class Home extends Component {
	constructor() {
		super();

		this.state = {
			searchValue: '',
			teachers: {},
			loaded: false,
		};
	}

	handleSearchInput(searchValue) {
		this.setState({ searchValue: searchValue.toLowerCase() });
	}

	async componentDidMount() {
		const teachers = await getTeachers();

		this.setState({
			teachers,
			loaded: true,
		});
	}

	render() {
		const loggedIn = cookies.get('loggedIn');
		const teachers = Object.values(this.state.teachers).filter(
			(teacher) => {
				const teacherName = `${teacher.firstName} ${teacher.lastName}`;
				const searchValue = this.state.searchValue;

				return (
					teacherName.toLowerCase().includes(searchValue) ||
					teacher.school
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				);
			}
		);

		return (
			<div className='home'>
				<div className='home-header'>
					<Searchbar
						onChange={this.handleSearchInput.bind(this)}
						placeholder='Search for a teacher or school'
					/>
					<Link to={loggedIn ? `/add-teacher` : '/login'}>
						<Button label='Add Teacher' cta icon={faUserPlus} />
					</Link>
				</div>
				{!this.state.loaded ? (
					<span className='empty-teachers-label'>
						Loading teachers...
					</span>
				) : teachers.length === 0 ? (
					<span className='empty-teachers-label'>
						No teachers found!
					</span>
				) : (
					<div className='teachers-list'>
						{teachers.map((teacher, index) => {
							const teacherName = `${teacher.firstName} ${teacher.lastName}`;
							let ratings = teacher.ratings;

							const reviews = ratings.reviews
								? Object.values(ratings.reviews)
								: [];

							let overallRating = 0;
							let numRatings = 0;

							let noRatings = false;

							const ratingSpans = Object.values(ratings).map(
								(ratings, index) => {
									let averageRating = 0;
									let ratingName = Object.keys(
										teacher.ratings
									)[index];

									if (ratingName === 'reviews') return;

									ratingName =
										ratingName.charAt(0).toUpperCase() +
										ratingName.slice(1);

									for (const rating of Object.values(
										ratings
									)) {
										averageRating += rating;
									}

									const numPeople =
										Object.values(ratings).length;

									if (numPeople === 0) {
										noRatings = true;

										return (
											<span key={index}>
												{ratingName}: No ratings
											</span>
										);
									}

									averageRating /= numPeople;
									overallRating += averageRating;
									averageRating = Math.round(averageRating);

									numRatings++;

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

							overallRating /= numRatings;
							overallRating = Math.floor(overallRating * 10) / 10;

							return (
								<Link
									to={`/teacher/${teacherName}`}
									key={index}>
									<div className='teacher'>
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
										{!noRatings && (
											<div className='overall-rating-container'>
												Overall:
												<span
													className={`overall-rating ${
														overallRating >= 4
															? 'good-overall-rating'
															: overallRating >= 3
															? 'medium-overall-rating'
															: 'bad-overall-rating'
													}`}>
													{overallRating}
												</span>
											</div>
										)}
										{reviews.length > 0 && (
											<>
												<span>People have said:</span>
												<div className='teacher-reviews'>
													{reviews
														.slice(0, 3)
														.map(
															(review, index) => {
																review =
																	contentFilterText(
																		review
																	);

																return (
																	<span
																		className='teacher-review'
																		key={
																			index
																		}>
																		"
																		{review.slice(
																			0,
																			50
																		)}
																		{review.length >
																		50
																			? '...'
																			: ''}
																		"
																	</span>
																);
															}
														)}
												</div>
											</>
										)}
										<div className='teacher-controls'>
											<Link
												to={
													loggedIn
														? `/rate-teacher/${teacherName}`
														: '/login'
												}>
												<Button
													icon={faStar}
													label='Rate'
												/>
											</Link>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				)}
			</div>
		);
	}
}

export default Home;
