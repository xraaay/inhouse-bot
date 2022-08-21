const { handleCollectPlayers } = require("../helpers/helper")
// const { execute } = require("./help")
const { SlashCommandBuilder } = require('discord.js')
// module.exports = {
//     name: 'inhouse',
//     description: 'Creates two temporary team voice channels and moves players into random teams',
//     usage: "[optional: player count]",
//     cooldown: 15,
//     args: false,
//     execute(message, args) {
//         if (!message.guild) return;

//         if (message.member.voice.channel) {
//             console.log(`Executed Inhouse in ${message.guild.name} for ${args || 10} players`)
//             handleCollectPlayers(message, args)
//         } else {
//             message.channel.send("You must be in a voice channel to use this feature")
//         }
//     },
// };

module.exports = {
    data: new SlashCommandBuilder().setName('inhouse').setDescription('Yes'),
    async execute(interaction) {
        if (!message.guild) return;

        if (message.member.voice.channel) {
            // console.log(`Executed Inhouse in ${message.guild.name} for ${args || 10} players`)
            handleCollectPlayers(interaction, args)
        } else {
            message.channel.send("You must be in a voice channel to use this feature")
        }
    },
}