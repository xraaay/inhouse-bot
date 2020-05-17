const Deck = require('../helpers/Deck');
const { arrToObjWithEquals } = require('../helpers/reuseableFunctions');
const {
  dispense,
  loadUpShoe,
  isSession,
  joinTable,
} = require('../gameData/blackjack/currentSession');

const setting = {
  step1: 'Type out "#blackjack create [ARGUMENTS GOES HERE]"',
  step2: 'Identify your arguments',
  step3: 'argument list: [ deckNum=[1-8] maxCashAmount=[1-500] minBet=[1-10] maxBet=[20-50] soft=[15-20] ]',
  step4: 'Should look something like this: #blackjack create deckNum=3 maxCashAmount=100',
  step5: 'Should look something like this: #blackjack create deckNum=7 maxCashAmount=50 minBet=1.50',
  step6: 'Should look something like this: #blackjack create deckNum=6 maxCashAmount=300 minBet=3 maxBet=20 soft=17',
  step7: 'Anything that is left blank will be set to default',
  step8: 'If you want to use default settings: #blackjack default',
  step9: 'Default settings: deckNum=6 maxCashAmount=200 minBet=5 maxBet=20 soft=17',
  step10: 'Type "#blackjack commands" for commands',
}

const playerCommands = {
  hit: {
    arg: 'hit',
    command: '#blackjack hit',
    description: 'When your turn, you can type #blackjack hit',
  },
  stay: {
    arg: 'stay',
    command: '#blackjack stay',
    description: 'When your turn, you can type #blackjack stay',
  },
  split: {
    arg: 'split',
    command: '#blackjack split',
    description: 'When your turn, you can type #blackjack split',
  },
  double: {
    arg: 'double',
    command: '#blackjack double',
    description: 'When your turn, you can type #blackjack double',
  },
  join: {
    arg: 'join',
    command: '#blackjack join seat=[0-6 TO SIT DOWN OR ELSE YOU WILL STAND] cash=[0-500 OPTIONAL]',
    description: 'New to session: join without cash amount with give you max join with cash amount with give you amount specified. Existing in session: join without will load your existing cash join with cash amount will reload amount',
  },
  stand: {
    arg: 'stand',
    command: '#blackjack stand',
    description: 'will let you stand from table but not leave session'
  },
  quit: {
    arg: 'quit',
    command: '#blackjack quit',
    description: 'Remove you from current game. If no more players, session will end',
  },
  stats: {
    arg: 'stats',
    command: '#blackjack stats [OPTIONAL USERNAME]',
    description: 'Sends all won, lost, won amount, lost amount, total earning, win percentage',
  },
  statsReset: {
    arg: 'statsReset',
    command: '#blackjack statsReset',
    description: 'Deletes your stats',
  }
}

module.exports = something = {
  name: 'blackjack',
  description: 'blackjack for discord',
  args: false,
  execute(message, args, client) {
    if (!args) return message.channel.send('please type #blackjack help');

    if (args[0] === 'help' || args[0] === 'commands') {
      let helpArg = args[0];
      const instructionArr = Object.entries(setting);
      const commandArr = Object.keys(playerCommands);
      const helpInstructions = instructionArr.map((val) => {
        return (`\n${val[0]}: ${val[1]}\n `)
      });
      const commandInstructions = commandArr.map((val) => {
        return (`\n${val}: ${playerCommands[val].description}\n`)
      })

      let sendMessageHelp = helpArg === 'help'
        ? (` \`\`\`${helpInstructions.join('')}\`\`\` `)
        : (` \`\`\`${commandInstructions.join('')}\`\`\` `);

      return message.channel.send(sendMessageHelp)
    }

    if (args[0] === 'default' ||  args[0] === 'create') {
      let initialArg = args[0];
      let defaultSetting = {
        deckNum: 6,
        maxCashAmount: 200,
        minBet: 5,
        maxBet: 20,
        soft: 17,
      };

      if (initialArg === 'default') {
        try {
          let createNewSessMessage = isSession({ player: 'someUser', settings: defaultSetting });
          return message.reply(createNewSessMessage)
        }
        catch (err) {
          return message.reply(err)
        }
      }
      if (initialArg === 'create') {
        let settingArgObj = arrToObjWithEquals(args.slice(1))
        // const settingArgArr = (args.slice(1));
        // const settingArgObj = {};
        // settingArgArr.forEach((val) => {
        //   let splitAtEqual = val.split('=');
        //   return settingArgObj[splitAtEqual[0]] = Number(splitAtEqual[1]);
        // });
        let newSetting = { ...defaultSetting, ...settingArgObj }
        try {
          let createNewSessMessage = isSession({ player: 'someUser1', settings: newSetting });
          // return console.log(createNewSessMessage)
          return message.reply(createNewSessMessage)
        }
        catch (err) {
          // return console.log(err)
          return message.reply(err)
        }
      }
    }

    if (args[0] === 'join') {
      let seatWithCash = arrToObjWithEquals(args.slice(1));
      let afterReply = joinTable({ ...seatWithCash, userID: 'andyAdasd'})
      return message.reply(afterReply)
    }

    if (args[0] === 'deal') {
      
    }

















    return message.channel.send('please type #blackjack help')
  }
}

// something.execute(
//   1,
//   [
//     'join',
//     'seat=2',
//     'cash=50'
//   ])


// let hello = '#blackjack deckNum=6 cashAmount=300 minBet=3 maxBet=[20] soft=17';
// let arg = hello.slice(1).split(/ +/);
// const commandName = arg.shift().toLowerCase();
// console.log(hello)
// console.log(arg)
// console.log(commandName)

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