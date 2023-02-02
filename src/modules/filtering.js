import wordlist from './profanity.js';

// Replace profanity with asterisks
function contentFilterText(input) {
	const words = input.split(' ');

	const filteredWords = words.map((word) => {
		if (wordlist.includes(word.toLowerCase())) {
			return '*'.repeat(word.length);
		}
		return word;
	});

	return filteredWords.join(' ');
}

export default contentFilterText;
