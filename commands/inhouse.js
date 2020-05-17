const { handleCollectPlayers } = require("../helpers/helper")

module.exports = {
    name: 'inhouse',
    description: 'Creates two temporary team voice channels and moves players into random teams',
    usage: "[optional: player count]",
    args: false,
    execute(message, args) {
        if (!message.guild) return;

        // if (message.member.voice.channel) {
            handleCollectPlayers(message, args)
        // } else {
        //     message.channel.send("You must be in a voice channel to use this feature")
        // }
    },
};