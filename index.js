const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
require('dotenv').config();
const DBL = require('dblapi.js');

const token = process.env.TOKEN;
const dblToken = process.env.DBL_TOKEN;

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildMessageReactions,
] });
const dbl = new DBL(dblToken, client);

client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

let logChannel;

client.once('ready', () => {
	logChannel = client.channels.cache.get('1016610685683253288');
	client.user.setPresence({ activities: [{ name: '/inhouse', type: ActivityType.Listening }] });
	let count = 0;
	client.guilds.cache.forEach(() => count++);
	console.log('Ready! ' + count + ' servers');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error('catch error', error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('shardError', err => {
	console.error('shard', err);
	logChannel.send(err.message);
});

process.on('unhandledRejection', err => {
	console.error('unhandled', err);
	logChannel.send(err.message);
});
client.login(token);