import { faQuestionCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import './StarSelector.scss';

class StarSelector extends Component {
	constructor(props) {
		super();

		this.state = {
			stars: props.stars ?? 0,
		};

		if (props.onChange) props.onChange(this.state.stars);
	}

	handleChange(stars) {
		this.setState({ stars });

		if (this.props.onChange) this.props.onChange(stars);
	}

	render() {
		const { label, tooltip } = this.props;
		const stars = [];

		for (let i = 0; i < this.state.stars; i++) {
			const starIndex = i + 1;

			stars.push(
				<FontAwesomeIcon
					key={i}
					className={
						this.state.stars === 5 ? 'star-gold' : 'star-solid'
					}
					onClick={this.handleChange.bind(this, starIndex)}
					icon={faStar}
				/>
			);
		}

		if (this.state.stars < 5) {
			for (let i = 0; i < 5 - this.state.stars; i++) {
				const starIndex = this.state.stars + i + 1;

				stars.push(
					<FontAwesomeIcon
						key={i + 5}
						icon={faStarRegular}
						onClick={this.handleChange.bind(this, starIndex)}
					/>
				);
			}
		}

		return (
			<div className='star-selector'>
				<div className='star-selector-header'>
					{tooltip && (
						<>
							<FontAwesomeIcon
								className='star-selector-tooltip'
								icon={faQuestionCircle}
							/>
							<div className='star-selector-tooltip-container'>
								{tooltip}
							</div>
						</>
					)}
					<span className='star-selector-label'>{label}</span>
				</div>
				<div>{stars}</div>
			</div>
		);
	}
}

export default StarSelector;
