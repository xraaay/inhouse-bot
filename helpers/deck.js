const shapes = ['♥','♠','♦','♣'];
const cardNum = [];

for (let i = 1; i <= 13; i++) {
  let cardName;
  switch(i) {
    case(1):
      cardName = 'A';
      break;
    case(11):
      cardName = 'J';
      break;
    case(12):
      cardName = 'Q';
      break;
    case(13):
      cardName = 'K';
      break;
    default:
      cardName = i.toString();
  }

  cardNum.push({
    cardValue: i,
    cardFace: cardName,
  })
};

const organizedDeckArr = shapes.map((shape) => {
  return cardNum.map((num) => {
    return {...num, shape: shape}
  })
})

const organizedDeck = (
  organizedDeckArr[0]
    .concat(
      organizedDeckArr[1],
      organizedDeckArr[2],
      organizedDeckArr[3]
    )
);

class Deck {
  constructor() {
    this.deck = organizedDeck;
    this.cardPosition = 0;
  }
  
  shuffle() {
    const shuffleCards = [];
    const randomNumGen = () => {
      return Math.floor(Math.random() * this.deck.length)
    }
   while (this.deck.length > 0) {
     const cardHolder = this.deck.splice(randomNumGen(), 1)[0]
     shuffleCards.push(cardHolder)
   }
   this.deck = shuffleCards
  }
};

module.exports = Deck;
