const { playerStats } = require('./playerData');
const Deck = require('../../helpers/Deck');
const { shuffleArray } = require('../../helpers/reuseableFunctions');





let inSession = [];
let currentlySeated;
let seatTurn = 0;
let shoe = [];
const loadUpShoe = loadUpSetting => {
  if (!loadUpSetting.amount) {
    throw ('missing object {amount:num, cardSplit:num [OPTIONAL]}')
  }

  for (x = 0; x < loadUpSetting.amount; x++) {
    let newDeckGen = new Deck();
    shoe = shoe.concat(newDeckGen.deck);
  };
  shoe = shuffleArray(shoe);

  if (loadUpSetting.cardSplit) {
    let firstHalf = shoe.slice(0, loadUpSetting.cardSplit);
    let secondHalf = shoe.slice(loadUpSetting.cardSplit);
    shoe = secondHalf.concat(firstHalf);
  }
  shoe.shift();
}
const dispense = minBet => {
  let playerKeyArr = Object.keys(table)
  const dealCardsOrder = playerKeyArr.filter(val => !!table[val].player && table[val].bets > minBet);
  dealCardsOrder.push('dealer');
  currentlySeated = dealCardsOrder.slice(0);
  dealCardsOrder.forEach(val => dealCardsOrder.push(val))

  dealCardsOrder.forEach(val => table[val].hand.card.push(shoe.shift()))


}


class Hand {
  card = [];
  handVal = 0;
  secondVal = 0;
  calculateHandVal() {
    let mainVal = this.handVal;
    let anyAce = this.secondVal;

    this.card.forEach((val, index) => {
      switch (val.cardValue) {
        case (1):
          mainVal > 0 && anyAce === 0 ? anyAce += mainVal : null;
          mainVal + 11 <= 21 ? mainVal += 11 : mainVal += 1;
          anyAce + 1 <= 21 ? anyAce += 1 : anyAce += 11;
          break;
        case (11):
        case (12):
        case (13):
          mainVal += 10;
          anyAce > 0 ? anyAce += 10 : null;
          break;
        default:
          mainVal += val.cardValue;
          anyAce > 0 ? anyAce += val.cardValue : null;
      }
    })

    this.handVal = mainVal;
    this.secondVal = anyAce;
  }
};

const table = {
  'seat0': {
    player: undefined,
    cash: 0,
    bets: 0,
    hand: new Hand()
  },
  'seat1': {
    player: undefined,
    cash: 0,
    bets: 0,
    hand: new Hand()
  },
  'seat2': {
    player: undefined,
    cash: 0,
    bets: 0,
    hand: new Hand()
  },
  'seat3': {
    player: undefined,
    cash: 0,
    bets: 0,
    hand: new Hand()
  },
  'seat4': {
    player: undefined,
    cash: 0,
    bets: 0,
    hand: new Hand()
  },
  'seat5': {
    player: undefined,
    cash: 0,
    bets: 0,
    hand: new Hand()
  },
  'seat6': {
    player: undefined,
    cash: 0,
    bets: 0,
    hand: new Hand()
  },
  dealer: {
    player: 'bot',
    hand: new Hand(),
  },
};

const hit = () => {

}




module.exports = {
  dispense,
  loadUpShoe,
}

// need to load shoe
// occupy the table
// dispense card
// and so on.


