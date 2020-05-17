const {
    shuffleArray,
    splitArray
} = require("../helpers/reuseableFunctions")

const createTeamChannels = (message, team) => {
    message.guild.channels.create("Team One", {
            type: "voice",
            parent: message.member.voice.channel.parentID
        })
        .then(res => {
            console.log("Created Voice ID: " + res.id)
            console.log("Guild ID: " + res.guild.id)

            team.forEach(item => {
                let member = message.member.guild.voiceStates.cache.find(user => item.id == user.id)
                member.setChannel(res.id)
            })
            let teamChannel = message.client.setInterval(function () {
                if (res.members.size === 0) {
                    res.delete();
                    clearInterval(teamChannel)
                }
            }, 10000)
        })
        .catch(err => {
            console.log(err)
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
                max: args[0] || 10
            })

            collection.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (!memberArr.includes(user)) {
                    memberArr.push(user);
                }
            })

            collection.on('end', collected => {
                handleTeamShuffle(message, hostId, memberArr, playerNumber)
            })
        })
}

const handleTeamShuffle = (message, hostId, memberArr, playerNumber) => {
    if (memberArr.length % 2 === 0) {
        message.channel.send(`Count: ${memberArr.length}\nMembers: ${memberArr.join(" ")}`)
        let shuffledArr = shuffleArray(memberArr)
        let teams = splitArray(shuffledArr);
        message.channel.send(`Team One: ${teams.one.join(", ")}\nTeam Two: ${teams.two.join(", ")}\nReact to confirm or reshuffle`)
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

                collection.on('collect', (reaction, user) => {
                    if (reaction.emoji.name === '👍') {
                        createTeamChannels(message, teams.one);
                        createTeamChannels(message, teams.two);
                    } else if (reaction.emoji.name === '👎') {
                        handleTeamShuffle(message, hostId, memberArr, playerNumber)
                    }
                })
            })
        } else if (memberArr.length < playerNumber) {
            message.channel.send(`Not enough players. Needed ${playerNumber}, got ${memberArr.length}`)
        } else {
            message.channel.send("Unable to start... Teams are uneven")
        }
}

module.exports = {
    createTeamChannels,
    handleCollectPlayers,
    handleTeamShuffle
}