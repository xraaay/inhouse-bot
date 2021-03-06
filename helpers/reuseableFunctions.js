const shuffleArray = (array) => {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const splitArray = (arr) => {
    let mid = Math.ceil(arr.length / 2)
    return {
        one: arr.slice(0, mid),
        two: arr.slice(mid)
    }
}

module.exports = {
    shuffleArray,
    splitArray,
    randomInteger
}