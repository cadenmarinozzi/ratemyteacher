import shajs from 'sha.js';

function sha256(input) {
	const hash = shajs('sha256').update(input).digest('hex');

	return hash;
}

function formatFirebaseEmail(email) {
	return email.replace('.', ',');
}

const defaultTeacherRatings = {
	difficulty: {},
	learning: {},
	personality: {},
	reviews: {},
};

export { sha256, formatFirebaseEmail, defaultTeacherRatings };
