const { handleCollectPlayers } = require("../helpers/helper")

module.exports = {
    name: 'inhouse',
    description: 'Creates two temporary team voice channels and moves players into random teams',
    usage: "[optional: player count]",
    cooldown: 30,
    args: false,
    execute(message, args) {
        if (!message.guild) return;

        if (message.member.voice.channel) {
            console.log("Executed Inhouse in " + message.guild.name)
            handleCollectPlayers(message, args)
        } else {
            message.channel.send("You must be in a voice channel to use this feature")
        }
    },
};