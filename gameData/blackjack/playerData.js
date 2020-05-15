const playerStats = {}

class Player {
  constructor(playerObj) {
    this.userID = playerObj.userID;
    this.userName = playerObj.userName;
    this.gamesPlayed = 0;
    this.win = 0;
    this.loss = 0;
    this.push = 0;
    this.winAmout = 0;
    this.lossAmount = 0;
    this.winPercentage = 0;
  }
  recalculatePercentage () {
    const winLossGames = this.win + this.loss;
    this.winPercentage = this.win / winLossGames;
    console.log('hello')
  }
}

const isNewPlayer = (userInfoObj)=> {
  if (!userInfoObj.userID && !userInfoObj.userName) throw 'Argument Missing {userName, userID}';

  if (playerStats[userInfoObj.userID]) {

    if (playerStats[userInfoObj.userID].userName === userInfoObj.userName) return;

    return playerStats[userInfoObj.userID].userName = userInfoObj.userName
  }
  playerStats[userInfoObj.userID] = new Player({ userID:userInfoObj.userID, userName:userInfoObj.userName })
};

const getPlayerStat = (userInfoObj) => {
  if (!userInfoObj.userID || !userInfoObj.userName) throw 'Argument Missing {userName, userID}';

  if (userInfoObj.userID) return playerStats[userInfoObj.userID];
  
  let userDataFound = Object.keys(playerStats).find(userIDKey => {
    return playerStats[userIDKey].userName === userInfoObj.userName
  })

  if (!userDataFound) throw 'No players found';

  return playerStats[userDataFound]
}

const resetPlayerStats = (userInfoObj) => {
  if (!userInfoObj.userID || !userInfoObj.userName) throw 'Argument Missing {userName, userID}';

  playerStats[userInfoObj.userID] = new Player({ userID:userInfoObj.userID, userName:userInfoObj.userName })
}

// playerStats['baron1212'] = new Player({userID:'baron1212', userName:'baron'})
// isNewPlayer({userID:'baron1212', userName:'baron12'});
// isNewPlayer({userID:'baron12112', userName:'baron1'});
// playerStats['baron1212'].win = 123123;
// playerStats['baron1212'].loss = 2313;
// playerStats['baron1212'].recalculatePercentage()
// // resetPlayerStats({userID:'baron1212', userName:'OhHi'})
// console.log(getPlayerStat({userID:'baron1212'}))

module.exports = {
  playerStats,
  isNewPlayer,
  getPlayerStat,
  resetPlayerStats,
}