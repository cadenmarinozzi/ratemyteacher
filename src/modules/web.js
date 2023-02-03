import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, child, get } from 'firebase/database';
import { formatFirebaseEmail, sha256, defaultTeacherRatings } from './utils.js';

const firebaseConfig = {
	apiKey: 'AIzaSyAt0wTXwkTKT9KOQoxZjTRhmw-zRnGIT5o',
	authDomain: 'ratemyteacher-web.firebaseapp.com',
	projectId: 'ratemyteacher-web',
	storageBucket: 'ratemyteacher-web.appspot.com',
	messagingSenderId: '333807494307',
	appId: '1:333807494307:web:b92c727fe422a155ff8b16',
	measurementId: 'G-BDYXN8784G',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const teachersRef = ref(database, 'teachers');
const usersRef = ref(database, 'users');

async function addTeacher({ firstName, lastName, subject, school, title }) {
	const teacherRef = child(teachersRef, `${firstName} ${lastName}`);
	const teacherData = {
		firstName,
		lastName,
		subject,
		school,
		title,
		ratings: defaultTeacherRatings,
	};

	await set(teacherRef, teacherData);
}

async function getTeachers() {
	const teachersSnapshot = await get(teachersRef);

	if (!teachersSnapshot.exists()) {
		return {};
	}

	const teachers = teachersSnapshot.val();

	return teachers;
}

async function getTeacher(teacher) {
	const teacherRef = child(teachersRef, teacher);
	const teacherSnapshot = await get(teacherRef);

	if (!teacherSnapshot.exists()) {
		return {};
	}

	const teacherData = teacherSnapshot.val();

	return teacherData;
}

async function addRatings({ email, teacher, ratings }) {
	const formattedEmail = formatFirebaseEmail(email);
	const teacherRef = child(teachersRef, teacher);
	const teacherSnapshot = await get(teacherRef);

	const teacherData = teacherSnapshot.val();
	const teacherRatings = teacherData.ratings || {};

	let newRatings = {
		difficulty: teacherRatings.difficulty || {},
		learning: teacherRatings.learning || {},
		personality: teacherRatings.personality || {},
	};

	newRatings.difficulty[formattedEmail] = ratings.difficulty;
	newRatings.learning[formattedEmail] = ratings.learning;
	newRatings.personality[formattedEmail] = ratings.personality;

	if (ratings.review) {
		if (teacherRatings.reviews) {
			newRatings.reviews = {
				...teacherData.ratings.reviews,
				[formattedEmail]: ratings.review,
			};
		} else {
			newRatings.reviews = { [formattedEmail]: ratings.review };
		}
	} else {
		newRatings.reviews = teacherRatings.reviews
			? teacherRatings.reviews
			: {};
	}

	await update(teacherRef, {
		ratings: newRatings,
	});
}

async function login({ email, password }) {
	email = formatFirebaseEmail(email);
	const hash = sha256(password);

	const userRef = child(usersRef, email);
	const userSnapshot = await get(userRef);

	if (!userSnapshot.exists()) {
		return;
	}

	const userData = userSnapshot.val();

	if (sha256(userData.password) === hash) {
		return true;
	}
}

async function signUp({ email, password }) {
	const formattedEmail = formatFirebaseEmail(email);
	const hash = sha256(password);

	const userRef = child(usersRef, formattedEmail);
	const userSnapshot = await get(userRef);

	if (userSnapshot.exists()) {
		return;
	}

	await set(userRef, {
		email,
		password: hash,
	});

	return true;
}

export { addTeacher, getTeachers, addRatings, login, signUp, getTeacher };
