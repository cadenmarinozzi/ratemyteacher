import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, child, get } from 'firebase/database';
import { formatFirebaseEmail, sha256 } from './utils.js';

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
		ratings: {
			reviews: [],
			difficulty: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
			},
			learning: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
			},
			personality: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
			},
		},
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

async function addRatings(teacher, ratings) {
	const teacherRef = child(teachersRef, teacher);
	const teacherSnapshot = await get(teacherRef);

	const teacherData = teacherSnapshot.val();

	let newRatings = {
		difficulty: teacherData.ratings.difficulty,
		learning: teacherData.ratings.learning,
		personality: teacherData.ratings.personality,
	};

	newRatings.difficulty[ratings.difficulty] += 1;
	newRatings.learning[ratings.learning] += 1;
	newRatings.personality[ratings.personality] += 1;

	if (teacherData.ratings.reviews) {
		newRatings.reviews = ratings.review
			? (newRatings.reviews = [
					...teacherData.ratings.reviews,
					ratings.review,
			  ])
			: [...teacherData.ratings.reviews];
	} else {
		newRatings.reviews = ratings.review ? [ratings.review] : [];
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

	if (userData.password === hash) {
		return userData;
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
