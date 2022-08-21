const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require('dotenv').config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
console.log(token, clientId)

const commands = [
	new SlashCommandBuilder().setName('inhouse').setDescription('Sends message for players to react to').addIntegerOption(option => option.setName('number').setDescription('Number of players total').setRequired(true)),
	new SlashCommandBuilder().setName('help').setDescription('Help'),
	new SlashCommandBuilder().setName('vote').setDescription('Link to vote on top.gg'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
