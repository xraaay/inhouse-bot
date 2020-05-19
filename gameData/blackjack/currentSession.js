const { playerStats } = require('./playerData');
const Deck = require('../../helpers/Deck');
const { shuffleArray } = require('../../helpers/reuseableFunctions');





let inSession = [];
let sessionSettings = {
  deckNum:6,
  maxCashAmount:200,
  minBet:5,
  maxBet:20,
  soft:17,
};
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


const isSession = hostSetting => {
  let {player, settings} = hostSetting;
  if (inSession.length > 0) throw (
    'Someone is in a session already, please join!'
  );

  sessionSettings = { ...settings };
  inSession.push(player);

  loadUpShoe({amount:settings.deckNum})

  return 'Session has been created!'

};

const joinTable = userInfo => {
  const userID = userInfo.userID;
  const seat = userInfo.seat;
  const cash = userInfo.cash;

  if (inSession.length === 0) return 'Please create session with !blackjack default or !blackjack [with your settings]';


  if (inSession.indexOf(userID) === -1) {
    inSession.push(userID);
  }

  if (!seat) {
    return 'you have joined the session! type #blackjack join seat=[0-6] when ever youre ready to play!'
  };

  if (table[`seat${seat}`].player) {
    console.log('sorry been taken')
    return 'Sorry, seat is taken please check another seat!'
  };

  if (!cash) {
    table[`seat${seat}`].player = userID;
    return `you have sat down at seat number ${seat} please place bets!`
  };

  table[`seat${seat}`].player = userID;
  table[`seat${seat}`].cash = cash;
  // console.log(table)
  return `you have sat down at seat number ${seat} with $${cash} please place bets!`
};

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

const betAmount = betInput => {
  let {userID, amount} = betInput;
  let message = 'Please be seated';
  for (let i = 0; i < 7; i++) {
    if (table[`seat${i}`].player === userID) {
      table[`seat${i}`].bets = amount;
      console.log(table[`seat${i}`])
      message = `Seat ${i}: ${table[`seat${i}`].player}  has changed their bets to ${amount}`
    }
  }
  return message;
}

const dispense = () => {
  let playerKeyArr = Object.keys(table)
  const dealCardsOrder = playerKeyArr.filter(val => !!table[val].player && table[val].bets >= sessionSettings.minBet);
  dealCardsOrder.push('dealer');
  currentlySeated = dealCardsOrder.slice(0);
  dealCardsOrder.forEach(val => dealCardsOrder.push(val));
  dealCardsOrder.forEach(val => table[val].hand.card.push(shoe.shift()));
  return table
};

const hit = () => {

}

// joinTable({userID: 'hello andy', seat:'3', cash:100})
// console.log(table)




module.exports = {
  dispense,
  loadUpShoe,
  isSession,
  joinTable,
  betAmount,
}

// need to load shoe
// occupy the table
// dispense card
// and so on.


