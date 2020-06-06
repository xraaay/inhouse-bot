module.exports = {
    name: "disconnect",
    description: "Disconnects the bot from a voice channel",
    execute(message, args){
        console.log(message.guild.me.voiceChannel)
        if(message.guild.me.voiceChannel){
            message.guild.me.voiceChannel.leave();
        } else {
            message.reply("I'm not connected to a voice channel")
        }
    }
}