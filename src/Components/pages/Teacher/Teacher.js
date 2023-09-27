import { faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'Components/shared/Button';
import contentFilterText from 'modules/filtering';
import { getTeacher } from 'modules/web';
import { Link, useParams } from 'react-router-dom';
import './Teacher.scss';
import { Component } from 'react';
import cookies from 'modules/cookies';
import { defaultTeacherRatings, formatFirebaseEmail } from 'modules/utils';

class Teacher extends Component {
	constructor() {
		super();

		this.state = {
			showAllReviews: false,
		};
	}

	async componentDidMount() {
		const { teacherName } = this.props;
		const teacher = await getTeacher(teacherName);

		this.setState({ teacher });
	}

	render() {
		const loggedIn = cookies.get('loggedIn');
		const email = cookies.get('email');

		const teacher = this.state.teacher;
		const { teacherName } = this.props;

		if (!teacher) return;

		let teacherRatings = teacher.ratings || defaultTeacherRatings;

		const alreadyRated =
			email && teacherRatings.difficulty[formatFirebaseEmail(email)];

		const reviews = teacherRatings.reviews
			? Object.values(teacherRatings.reviews)
			: [];

		let overallRating = 0;
		let numRatings = 0;

		let noRatings = false;

		const ratingSpans = Object.values(teacherRatings).map(
			(ratings, index) => {
				let averageRating = 0;
				let ratingName = Object.keys(teacherRatings)[index];

				if (ratingName === 'reviews') return;

				ratingName =
					ratingName.charAt(0).toUpperCase() + ratingName.slice(1);

				for (const rating of Object.values(ratings)) {
					averageRating += rating;
				}

				const numPeople = Object.values(ratings).length;

				if (numPeople === 0) {
					noRatings = true;

					return <span key={index}>{ratingName}: No ratings</span>;
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
								averageRating === 5 ? 'star-gold' : 'star-solid'
							}
							icon={faStar}
						/>
					);
				}

				if (averageRating < 5) {
					for (let i = 0; i < 5 - averageRating; i++) {
						ratingStars.push(
							<FontAwesomeIcon key={i + 5} icon={faStarRegular} />
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
			<div className='teacher-container'>
				<h2>{teacherName}</h2>
				<div className='teacher'>
					<div className='teacher-header'>
						<span>
							{teacher.title} {teacher.lastName}
						</span>
						<div className='header-title'>
							<span className='teacher-subject'>
								{teacher.subject}
							</span>
							<span className='teacher-school'>
								{teacher.school}
							</span>{' '}
						</div>
					</div>
					<div className='teacher-ratings'>{ratingSpans}</div>
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
					<div className='teacher-controls'>
						<Link
							to={
								loggedIn
									? `/rate-teacher/${teacherName}`
									: '/login'
							}>
							<Button
								icon={alreadyRated ? faEdit : faStar}
								label={alreadyRated ? 'Edit Rating' : 'Rate'}
							/>
						</Link>
					</div>
				</div>
				<div className='teacher-reviews'>
					<h2>Reviews</h2>
					{reviews?.length > 0 ? (
						<>
							{(this.state.showAllReviews
								? reviews
								: reviews.slice(0, 2)
							).map((review, index) => {
								return (
									<div key={index}>
										<span>
											"{contentFilterText(review)}"
										</span>
									</div>
								);
							})}
							{reviews.length > 2 && (
								<span
									className='see-more-button'
									onClick={() => {
										this.setState({
											showAllReviews:
												!this.state.showAllReviews,
										});
									}}>
									{this.state.showAllReviews
										? 'See Less'
										: 'See More'}
								</span>
							)}
						</>
					) : (
						<span className='no-reviews-label'>
							No reviews yet!
						</span>
					)}
				</div>
			</div>
		);
	}
}

function TeacherWrapper() {
	const { teacherName } = useParams();

	return <Teacher teacherName={teacherName} />;
}

export default TeacherWrapper;
