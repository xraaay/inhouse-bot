function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


module.exports = {
    name: 'inhouse',
    description: 'Joins a voice channel',
    args: false,
    execute(message, args, client) {
        let playerNumber = args[0] || 10;
        if (!message.guild) return;

        if (message.member.voice.channel) {
        let memberArr = []
        const filter = (reaction, user) => {
            return ['👍'] && !user.bot;
        };

        message.reply(`is looking for an inhouse for ${playerNumber} people` )
        message.channel.send("React with a thumbs up to opt in")
            .then(msg => msg.react("👍"))
            .then(() => {
                return message.channel.messages.fetch(message.channel.lastMessageID)
            })
            .then(msg =>{ 
                let collection = msg.createReactionCollector(filter, {
                    time: 15000,
                    max: args[0] || 10
                })

                collection.on('collect', (reaction, user) => {
                    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                    if (!memberArr.includes(user)) {
                        memberArr.push(user);
                    }
                })
                collection.on('end', collected => {
                    message.channel.send(`Count: ${memberArr.length}\nMembers: ${memberArr.join(" ")}`)
                    if (memberArr.length % 2 === 0) {
                        let shuffledArr = shuffle(memberArr)
                        let mid = Math.ceil(shuffledArr.length / 2)
                        let teams = {
                            one: shuffledArr.slice(0, mid),
                            two: shuffledArr.slice(mid)
                        }

                        message.channel.send("Team One: " + teams.one.join(", "))
                        message.channel.send("Team Two: " + teams.two.join(", "))

                        message.guild.channels.create("Team One", { type: "voice" })
                            .then(res => {
                                // console.log(res)
                                console.log("Created Voice ID: " + res.id)
                                console.log("Guild ID: " + res.guild.id)
                                
                                teams.one.forEach(item => {
                                    let member = message.member.guild.voiceStates.cache.find(user => item.id == user.id)
                                    member.setChannel(res.id)
                                })
                                let deleteChannelOne = client.setInterval(function(){
                                    if(res.members.size === 0){
                                        res.delete();
                                        clearInterval(deleteChannelOne)
                                    }
                                }, 5000)
                            })
                        message.guild.channels.create("Team Two", { type: "voice" })
                            .then(res => {
                                console.log("Created Voice ID: " + res.id)
                                console.log("Guild ID: " + res.guild.id)
                                
                                teams.two.forEach(item => {
                                    let member = message.member.guild.voiceStates.cache.find(user => item.id == user.id)
                                    member.setChannel(res.id)
                                })
                                let deleteChannelTwo = client.setInterval(function(){
                                    if(res.members.size === 0){
                                        res.delete();
                                        clearInterval(deleteChannelTwo)
                                    }
                                }, 5000)
                            })
                    } else if (memberArr.length < playerNumber){
                        message.channel.send("Not enough players")
                    } else {
                        message.channel.send("Error: Teams are uneven")
                    }
                })
            }
            )
        } else {
            message.channel.send("You must be in a voice channel to use this feature")
        }
    },
};