const {
    shuffleArray,
    splitArray
} = require("../helpers/reuseableFunctions")
const Discord = require("discord.js")


const createTeamChannels = (message, team, name) => {
    message.guild.channels.create(name, {
            type: "voice",
            parent: message.member.voice.channel.parentID
        })
        .then(res => {
            // console.log("Created Voice ID: " + res.id)
            // console.log("Guild ID: " + res.guild.id)

            movePlayers(message, res, team)
            handleTempChannel(message, res)
        })
        .catch(err => {
            console.log(err, "createTeamChannels")
            handleError(err, message)
        })
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
    let host = message.author;
    let memberArr = []

    if(typeof(playerNumber) !== "number" && playerNumber % 1){
        return message.reply("must be a valid player number")
    }

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
                // console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (!memberArr.includes(user)) {
                    memberArr.push(user);
                }
            })

            collection.on('end', () => {
                if (memberArr.length % 2 === 0 && memberArr.length !== 0) {
                    handleTeamShuffle(message, host, memberArr, playerNumber)
                } else if (memberArr.length < playerNumber) {
                    message.channel.send(`Not enough players. Needed ${playerNumber}, got ${memberArr.length}`)
                } else {
                    message.channel.send("Unable to start... Teams are uneven")
                }
            })
        })
        .catch(err => {
            console.log(err, "handleCollectPlayers")
            handleError(err, message)
        })
}

const handleTeamShuffle = (message, host, memberArr, playerNumber) => {
    let shuffledArr = shuffleArray(memberArr)
    let teams = splitArray(shuffledArr);
    let response = handleMessageEmbed(host, teams, playerNumber)
    message.channel.send(response)
    message.reply("react with 👍 to confirm or 👎 to reshuffle")
        .then(msg => {
            msg.react("👍")
            msg.react("👎")
            const shuffleFilter = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && user.id === host.id;
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
                    handleTeamShuffle(message, host, memberArr, playerNumber)
                }
            })
        })
        .catch(err => {
            console.log(err, "handleTeamShuffle")
            handleError(err, message)
        })
}

const handleMessageEmbed = (host, teams, playerNumber) => {
    if(!teams.one[0] || !teams.two[0]) return
    const embed = new Discord.MessageEmbed()
        .setColor("#00ffff")
        .setTitle(`Inhouse for ${playerNumber}`)
        .setAuthor(host.username, `https://cdn.discordapp.com/avatars/${host.id}/${host.avatar}.png`)
        .addFields(
            { name: "Team One", value: teams.one.join(", ")},
            { name: "Team Two", value: teams.two.join(", ")}
        )
        .setTimestamp()
    return embed;
}

const handleError = (err, message) => {
    console.log(err.name + err.message);
    if(err.name === "Error [VOICE_JOIN_CHANNEL]"){
        message.channel.send("Missing Permissions, check channel or bot permissions")
    } else {
        message.channel.send("Something went wrong")
    }
}

module.exports = {
    handleCollectPlayers,
    handleError
}