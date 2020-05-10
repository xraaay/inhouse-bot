const { VoiceChannel } = require('discord.js')

module.exports = {
    name: 'readchannel',
    description: 'Shows members of a voice channel',
    args: false,
	execute(message, args, client) {
        // const voiceChannel = new VoiceChannel();
        // console.log(message.guild.channels.find(item => item.name === args[0]))
        console.log(message.guild.channels)
    },
};