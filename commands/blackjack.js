const Deck = require('../helpers/deck');

module.exports = {
  name:'blackjack',
  description: 'blackjack for discord',
  args: false,
  execute(message, args, client) {

    const instructions = {
      step1: 'Type out #blackjack',
      step2: 'Identify your arguments',
      step3: 'argument list: [ deckNum=[1-8] cashAmount=[1-500] minBet=[1-10] maxBet=[20-50] soft=[15-20] ]',
      step4: 'Should look something like this: #blackjack deckNum=3 cashAmount=100',
      step5: 'Should look something like this: #blackjack deckNum=7 cashAmount=50 minBet=1.50',
      step6: 'Should look something like this: #blackjack deckNum=6 cashAmount=300 minBet=3 maxBet=[20] soft=17',
      step7: 'If you want to use default settings: #blackjack default',
      step8: 'Default settings: deckNum=6 cashAmount=200 minBet=5 maxBet=20 soft=17',
    }

    const instructionArr = Object.entries(instructions)
    if (!args) return message.channel.send('please type #blackjack help');

    if (args[0] === 'help') {
      return instructionArr.map((val) => {
        message.channel.send(`${val[0]}: ${val[1]}`)
      })
    }

    // const dealerHand = [];
    // const playerHand = [];

  }
}


let hello = '#blackjack deckNum=6 cashAmount=300 minBet=3 maxBet=[20] soft=17';
let arg = hello.slice(1).split(/ +/);
const commandName = arg.shift().toLowerCase();
console.log(hello)
console.log(arg)
console.log(commandName)

// const instructions = {
//   step1: 'Type out #blackjack',
//   step2: 'Identify your arguments',
//   step3: 'argument list: [ deckNum=[1-8] cashAmount=[1-500] minBet=[1-10] maxBet=[20-50] soft=[15-20] ]',
//   step4: 'Should look something like this: #blackjack deckNum=3 cashAmount=100',
//   step5: 'Should look something like this: #blackjack deckNum=7 cashAmount=50 minBet=1.50',
//   step6: 'Should look something like this: #blackjack deckNum=6 cashAmount=300 minBet=3 maxBet=[20] soft=17',
//   step7: 'If you want to use default settings: #blackjack default',
//   step8: 'Default settings: deckNum=6 cashAmount=200 minBet=5 maxBet=20 soft=17',
// }

// const instructionArr = Object.entries(instructions);

// instructionArr.forEach((val) => {
//   console.log(`${val[0]}: ${val[1]}`)
// })