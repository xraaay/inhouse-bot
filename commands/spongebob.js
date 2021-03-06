const ytdl = require("ytdl-core")
const { urls } = require("../helpers/urls")
const { randomInteger } = require("../helpers/reuseableFunctions")
const { handleError } = require("../helpers/helper")

module.exports = {
    name: 'spongebob',
    description: 'Plays a random spongebob quote',
    args: false,
    async execute(message) {
        if(message.member.voice.channel){
            let videoNumber = randomInteger(0, urls.length-1)
            console.log(videoNumber)
            console.log(urls[videoNumber])
            message.member.voice.channel.join()
                .then(connection => {
                    const dispatcher = connection.play(ytdl(urls[videoNumber], { filter: "audioonly"}), { volume: 0.2 })
                    dispatcher.on("finish", () => {
                        connection.disconnect()
                    })
                })
                .catch(err => {
                    console.log("Executed Spongebob in " + message.guild.name)
                    handleError(err, message)
                })
        } else {
            message.reply("You need to be in a voice channel")
        }
    }
}
