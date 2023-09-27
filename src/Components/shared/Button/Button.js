import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.scss';

function Button({ label, className, icon, cta, ...rest }) {
	return (
		<button
			className={`button ${
				cta ? 'button-cta' : 'button-default'
			} ${className}`}
			{...rest}>
			{icon && <FontAwesomeIcon icon={icon} size='xs' />}
			{label}
		</button>
	);
}

export default Button;
