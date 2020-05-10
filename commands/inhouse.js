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
    execute(message, args) {
        let playerNumber = args[0] || 10;
        if (!message.guild) return;

        // if (message.member.voice.channel) {
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
                    if (!memberArr.includes(user.tag)) {
                        console.log(user)
                        // console.log(message.guild.members)
                        const player = message.guild.members.cache.find(
                            (user) =>
                            // console.log(user.user.username)
                            // user.user.username.toLowerCase() === username.toLowerCase() ||
                            // (user.nickname && user.nickname.toLowerCase() === username.toLowerCase())
                          {})
                        memberArr.push(player);
                        console.log(player)
                    }
                })
                collection.on('end', collected => {
                    let voiceChannels;

                    message.channel.send(`Count: ${memberArr.length}\nMembers: ${memberArr.join(" ")}`)
                    // if (memberArr.length % 2 === 0) {
                        let shuffledArr = shuffle(memberArr)
                        let mid = Math.ceil(shuffledArr.length / 2)
                        let teams = {
                            one: shuffledArr.slice(0, mid),
                            two: shuffledArr.slice(mid)
                        }

                        message.channel.send("Team One: " + teams.one.join(", "))
                        message.channel.send("Team Two: " + teams.two.join(", "))

                        message.guild.channels.create("Team One", { type: "voice" })

                        // voiceChannels = message.guild.channels.filter(item => item.type === "voice")
                        // console.log(voiceChannels)


                    // } else if (memberArr.length < playerNumber){
                    //     message.channel.send("Not enough players")
                    // } else {
                    //     message.channel.send("Error: Teams are uneven")
                    // }
                })
            }
            )
    },
};