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

const splitArray = (arr) => {
    let mid = Math.ceil(arr.length / 2)
    return {
        one: arr.slice(0, mid),
        two: arr.slice(mid)
    }
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const arrToObjWithEquals = (arr) => {
    const settingArgObj = {};
    arr.forEach((val) => {
      let splitAtEqual = val.split('=');
      return settingArgObj[splitAtEqual[0]] = Number(splitAtEqual[1]);
    });
    return settingArgObj
}

module.exports = {
    shuffleArray,
    splitArray,
    getRandomInt,
    arrToObjWithEquals,
}