const { handleCollectPlayers } = require("../helpers/helper")

module.exports = {
    name: 'inhouse',
    description: 'Creates two temporary team voice channels and moves players into random teams',
    usage: "[optional: player count]",
    cooldown: 45,
    args: false,
    execute(message, args) {
        if (!message.guild) return;

        if (message.member.voice.channel) {
            console.log(`Executed Inhouse in ${message.guild.name} for ${args} players`)
            return handleCollectPlayers(message, args)
        } else {
            return message.channel.send("You must be in a voice channel to use this feature")
            .catch(err => {
                console.log("inhouse")
                handleError(err, message)
            })
        }
    },
};