const ytdl = require("ytdl-core")
const { urls } = require("../helpers/urls")
const { getRandomInt } = require("../helpers/reuseableFunctions")

module.exports = {
    name: 'spongebob',
    description: 'Plays a random spongebob quote',
    args: false,
    async execute(message, args, client) {
        if(message.member.voice.channel){
            let videoNumber = getRandomInt(0, urls.length-1)
            // console.log(videoNumber)
            // console.log(urls[videoNumber])
            message.member.voice.channel.join()
                .then(connection => {
                    const dispatcher = connection.play(ytdl(urls[videoNumber], { filter: "audioonly"}), { volume: 0.5 })
                    dispatcher.on("finish", () => {
                        connection.disconnect()
                    })
                })
                .catch(err => {
                    console.log(err)
                    message.channel.send("Something went wrong")
                })
        } else {
            message.reply("You need to be in a voice channel")
        }
    }
}
