import { Component } from 'react';
import './Dropdown.scss';

class Dropdown extends Component {
	constructor({ onChange, defaultValue }) {
		super();

		if (onChange) onChange(defaultValue);
	}

	render() {
		return (
			<div className='dropdown-container'>
				<label className='dropdown-label'>{this.props.label}</label>
				<select
					className='dropdown'
					onChange={(event) => {
						if (this.props.onChange) {
							this.props.onChange(event.target.value);
						}
					}}>
					{this.props.options.map((option, index) => {
						return (
							<option key={index} value={option}>
								{option}
							</option>
						);
					})}
				</select>
			</div>
		);
	}
}

export default Dropdown;
