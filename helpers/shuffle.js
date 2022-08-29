const shuffleArray = (array) => {
	let currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const splitArray = (arr) => {
	const mid = Math.ceil(arr.length / 2);
	return {
		one: arr.slice(0, mid),
		two: arr.slice(mid),
	};
};

module.exports = {
	shuffleArray,
	splitArray,
	randomInteger,
};