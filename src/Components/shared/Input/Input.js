import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import './Input.scss';

class Input extends Component {
	constructor() {
		super();

		this.state = {};
	}

	handleInput(event) {
		const { onChange } = this.props;

		if (onChange) {
			onChange(event.target.value);
		}
	}

	render() {
		const { placeholder, label, className, tooltip, onChange, ...rest } =
			this.props;

		return (
			<div className={`input-container ${className}`}>
				{tooltip && (
					<>
						<FontAwesomeIcon
							className='input-tooltip'
							icon={faQuestionCircle}
						/>
						<div className='input-tooltip-container'>{tooltip}</div>
					</>
				)}
				<label className='input-label'>
					{label}
					<div className='input-label-line-container'>
						<div className='input-label-line'></div>
					</div>
				</label>
				<input
					className='input'
					type='text'
					onInput={this.handleInput.bind(this)}
					placeholder={placeholder}
					{...rest}
				/>
			</div>
		);
	}
}

export default Input;
