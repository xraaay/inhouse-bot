const ytdl = require("ytdl-core")
const { urls } = require("../helpers/urls")
const { getRandomInt } = require("../helpers/reuseableFunctions")

module.exports = {
    name: 'spongebob',
    description: 'Plays a random spongebob quote',
    args: false,
    async execute(message, args, client) {
        if(message.member.voice.channel){
            const connection = await message.member.voice.channel.join()
            // let urlNumber = urls.length-1
            console.log(urls.length)
            let videoNumber = getRandomInt(0, urls.length)
            console.log(videoNumber)
            console.log(urls[videoNumber])
            const dispatcher = connection.play(ytdl(urls[videoNumber], { filter: "audioonly" }))
            dispatcher.setVolume(0.5)
            dispatcher.on("finish", () => {
                connection.disconnect()
            })
        } else {
            message.reply("You need to be in a voice channel")
        }
    }
}
