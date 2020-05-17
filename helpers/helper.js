const {
    shuffleArray,
    splitArray
} = require("../helpers/reuseableFunctions")

const createTeamChannels = (message, team, name) => {
    message.guild.channels.create(name, {
            type: "voice",
            parent: message.member.voice.channel.parentID
        })
        .then(res => {
            console.log("Created Voice ID: " + res.id)
            console.log("Guild ID: " + res.guild.id)

            movePlayers(message, res, team)
            handleTempChannel(message, res)
        })
        .catch(console.error)
}

const handleTempChannel = (message, res) => {
    let teamChannel = message.client.setInterval(function () {
        if (res.members.size === 0) {
            res.delete();
            clearInterval(teamChannel)
        }
    }, 5000)
}

const movePlayers = (message, res, team) => {
    team.forEach(item => {
        let member = message.member.guild.voiceStates.cache.find(user => item.id == user.id)
        member.setChannel(res.id)
    })
}

const handleCollectPlayers = (message, args) => {
    let playerNumber = args[0] || 10;
    let hostId = message.author.id;
    let memberArr = []

    message.reply(`is looking for an inhouse for ${playerNumber} people`)
    message.channel.send("React with a thumbs up to opt in")
        .then(msg => {
            msg.react("👍")
            const memberFilter = (reaction, user) => {
                return ['👍'].includes(reaction.emoji.name) && !user.bot;
            };

            let collection = msg.createReactionCollector(memberFilter, {
                time: 30000,
                max: playerNumber
            })

            collection.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (!memberArr.includes(user)) {
                    memberArr.push(user);
                }
            })

            collection.on('end', () => {
                if (memberArr.length % 2 === 0 && memberArr.length !== 0) {
                    handleTeamShuffle(message, hostId, memberArr, playerNumber)
                } else if (memberArr.length < playerNumber) {
                    message.channel.send(`Not enough players. Needed ${playerNumber}, got ${memberArr.length}`)
                } else {
                    message.channel.send("Unable to start... Teams are uneven")
                }
            })
        })
        .catch(console.error)
}

const handleTeamShuffle = (message, hostId, memberArr, playerNumber) => {
    let shuffledArr = shuffleArray(memberArr)
    let teams = splitArray(shuffledArr);
    let response = `==================================\nCount: ${memberArr.length}\nMembers: ${memberArr.join(" ")}\nTeam One: ${teams.one.join(", ")}\nTeam Two: ${teams.two.join(", ")}`
    message.channel.send(response)
    message.reply("react with 👍 to confirm or 👎 to reshuffle")
        .then(msg => {
            msg.react("👍")
            msg.react("👎")
            const shuffleFilter = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && user.id === hostId;
            };
            let collection = msg.createReactionCollector(shuffleFilter, {
                time: 60000,
                max: 1
            })

            collection.on('collect', (reaction) => {
                if (reaction.emoji.name === '👍') {
                    createTeamChannels(message, teams.one, "Team One");
                    createTeamChannels(message, teams.two, "Team Two");
                } else if (reaction.emoji.name === '👎') {
                    handleTeamShuffle(message, hostId, memberArr, playerNumber)
                }
            })
        })
        .catch(console.error)
}

module.exports = {
    handleCollectPlayers
}