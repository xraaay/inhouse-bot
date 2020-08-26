const {
    shuffleArray,
    splitArray
} = require("../helpers/reuseableFunctions")
const Discord = require("discord.js")
const maps = require("./maps")


const createTeamChannels = (message, team, name) => {
    return message.guild.channels.create(name, {
            type: "voice",
            parent: message.member.voice.channel.parentID
        })
        .then(res => {
            console.log("Created Voice ID: " + res.id)
            console.log("Guild ID: " + res.guild.name)

            handleTempChannel(message, res)
            movePlayers(message, res, team)
        })
        .catch(err => {
            console.log("createTeamChannels")
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
        return member.setChannel(res.id)
            .catch(err => {
                console.log("movePlayers")
                handleError(err, message)
            })
    })
}

const handleCollectPlayers = (message, args) => {
    let playerNumber = args[0] || 10;
    let host = message.author;
    let memberArr = []

    if (typeof (playerNumber) !== "number" && playerNumber % 1) {
        return message.reply("must be a valid player number")
    }

    message.reply(`is looking for an inhouse for ${playerNumber} people`)
    return message.channel.send("React with a thumbs up to opt in")
        .then(msg => {
            msg.react("👍")

            const memberFilter = (reaction, user) => {
                return ['👍'].includes(reaction.emoji.name) && !user.bot;
            };

            let collection = msg.createReactionCollector(memberFilter, {
                time: 180000,
                max: playerNumber
            })

            collection.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (!memberArr.includes(user)) {
                    memberArr.push(user);
                }
            })

            collection.on('end', () => {
                if (memberArr.length < playerNumber) {
                    message.channel.send(`Not enough players. Needed ${playerNumber}, got ${memberArr.length}`)
                        .catch(err => {
                            console.log("not enough players")
                            handleError(err, message)
                        })
                } else if (memberArr.length % 2 === 0 && memberArr.length !== 0) {
                    handleTeamShuffle(message, host, memberArr, playerNumber)
                } else {
                    message.channel.send("Unable to start... Teams are uneven")
                        .catch(err => {
                            console.log("uneven teams")
                            handleError(err, message)
                        })
                }
            })
        })
        .catch(err => {
            console.log("handleCollectPlayers")
            handleError(err, message)
        })
}

const handleTeamShuffle = (message, host, memberArr, playerNumber) => {
    let shuffledArr = shuffleArray(memberArr)
    let teams = splitArray(shuffledArr);
    let response = handleInhouseMessageEmbed(host, teams, playerNumber)
    return message.channel.send(response)
        .then(res => message.reply("react with 👍 to confirm or 👎 to reshuffle"))
        .then(msg => {
            msg.react("👍")
            msg.react("👎")
            const shuffleFilter = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && user.id === host.id;
            };
            let collection = msg.createReactionCollector(shuffleFilter, {
                time: 120000,
                max: 1
            })

            collection.on('collect', (reaction) => {
                if (reaction.emoji.name === '👍') {
                    // TODO: handleMapBan 
                    let captains = [teams.one[0], teams.two[0]]
                    handleMapBan(message, captains, teams)
                } else if (reaction.emoji.name === '👎') {
                    handleTeamShuffle(message, host, memberArr, playerNumber)
                }
            })
        })
        .catch(err => {
            console.log("handleTeamShuffle")
            handleError(err, message)
        })
}

const handleInhouseMessageEmbed = (host, teams, playerNumber) => {
    if (!teams.one[0] || !teams.two[0]) return
    const embed = new Discord.MessageEmbed()
        .setColor("#00ffff")
        .setTitle(`Inhouse for ${playerNumber}`)
        .setAuthor(host.username, `https://cdn.discordapp.com/avatars/${host.id}/${host.avatar}.png`)
        .addFields({
            name: "Team One",
            value: teams.one.join(", ")
        }, {
            name: "Team Two",
            value: teams.two.join(", ")
        })
        .setTimestamp()
    return embed;
}

let gamesArr = [{
        name: 'CSGO',
        emoji: '🍆',
        maps: ['Inferno', 'Train', 'Mirage', 'Nuke', 'Overpass', 'Dust II', 'Vertigo']
    },
    {
        name: 'VALORANT',
        emoji: '🍑',
        maps: ['Ascent', 'Haven', 'Split', 'Bind']
    },
]

const handleMapBan = (message, captains, teams) => {
    return message.reply("would you like to ban maps? \n 🍆:CSGO, 🍑:Valorant, ❌:Continue")
        .then(msg => {
            msg.react("🍆")
            msg.react("🍑")
            msg.react("❌")

            let reactions = ["🍆", "🍑", "❌"];

            const gameFilter = (reaction, user) => {
                return reactions.includes(reaction.emoji.name) &&
                    user.id === message.author.id;
            }

            let collection = msg.createReactionCollector(gameFilter, {
                time: 60000,
                max: 1
            })

            collection.on('collect', async reaction => {
                let choice = reactions.findIndex(item => item === reaction.emoji.name)
                if(choice === reactions.length - 1){
                    message.channel.send("Enjoy your game!")
                    createTeamChannels(message, teams.one, "Team One");
                    createTeamChannels(message, teams.two, "Team Two");
                } else {
                    const game = gamesArr[choice];
                    await banMaps(message, game, captains, teams )
                }
            })
        })
        .catch(err => {
            console.log("handleMapBan")
            handleError(err, message)
        })
}


const banMaps = (message, game, captains, teams, turn = 0) => {
    let i = turn % 2
    let currentCap = captains[i];
    let embed = mapBanEmbed(game.maps, currentCap, message, teams)
    return message.channel.send(embed)
        .then(async msg => {
            let num = ["1⃣", '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟']
            let reactions = [];
            for (let i = 0; i < game.maps.length; i++) {
                reactions.push(num[i])
                msg.react(`${num[i]}`)
            }

            const banFilter = (reaction, user) => {
                return reactions.includes(reaction.emoji.name) 
                    // && user.id === message.author.id
                    && user.id === currentCap.id;
            }

            let collection = msg.createReactionCollector(banFilter, {
                time: 60000,
                max: 1
            })

            await collection.on('collect', async (reaction) => {
                // console.log(reaction.emoji.name);
                let banned = num.findIndex(item => item === reaction.emoji.name);
                game.maps.splice(banned, 1);
                if(game.maps.length === 1){
                    let embed = gameEmbed(game.name, game.maps[0], teams)
                    return message.channel.send(embed)
                        .then(msg => {
                            msg.react('👍')

                            const readyFilter = (reaction, user) => {
                                return ['👍'].includes(reaction.emoji.name)
                                    && message.author.id === user.id
                            }

                            let collection = msg.createReactionCollector(readyFilter, {
                                time: 240000,
                                max: 1
                            })

                            collection.on('collect', () => {
                                message.channel.send("Enjoy your game!")
                                createTeamChannels(message, teams.one, "Team One");
                                createTeamChannels(message, teams.two, "Team Two");
                            })
                        })
                        .catch(err => {
                            console.log("handleMapBan")
                            handleError(err, message)
                        })
                } else {
                    await banMaps(message, game, captains, teams, ++turn)
                }
            })
        })
        .catch(err => {
            console.log("handleMapBan")
            handleError(err, message)
        })
}

const gameEmbed = (game, map, teams) => {
    return new Discord.MessageEmbed()
        .setColor('#2bff00')
        .setTitle(`${game} game on ${map}`)
        .addFields({
            name: teams.one[0].username + "'s team",
            value: teams.one.join(", ")
        }, {
            name: teams.two[0].username + "'s team",
            value: teams.two.join(", ")
        })
        .setFooter('Thumbs up to start game')
        .setTimestamp()
}

const mapBanEmbed = (maps, captain) => {
    return new Discord.MessageEmbed()
        .setColor('#0077ff')
        .setTitle(`${captain.username}'s turn`)
        .setAuthor(captain.username, `https://cdn.discordapp.com/avatars/${captain.id}/${captain.avatar}.png`)
        .addFields({
            name: "Maps",
            value: maps.map((item, index) => `${index + 1}. ${item}`)
        })
}

const handleError = (err, message) => {
    console.log(err.name + " - " + err.message);
    let errorMessage;
    if (err.name === "Error [VOICE_JOIN_CHANNEL]" || err.message.includes("Permissions") || err.message.includes('Missing Access')) {
        errorMessage = "Missing Permissions, check channel or bot permissions"
    } else if (err.message.includes("setChannel")) {
        errorMessage = "Error setting channel of user, make sure all users are connected to a voice channel"
    } else if (err.message.includes("Unknown")) {
        errorMessage = "Unknown Channel, make sure all users are connected to a voice channel"
    } else if (err.message.includes("not connected to voice")) {
        errorMessage = "Error finding user. Make sure all players are connected to a voice channel"
    } else {
        errorMessage = "Something went wrong - " + err.message
    }
    console.log(errorMessage)
    return message.channel.send(errorMessage)
}

module.exports = {
    handleMapBanEmbed: mapBanEmbed,
    handleCollectPlayers,
    handleError,
    handleMapBan
}