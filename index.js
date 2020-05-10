const fs = require('fs');
const { prefix, token } = require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.login(token);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if(command.args && !args.length){
        return message.channel.send(`No arguments`)
    }

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error)
        message.reply("There was an error executing that command")
    }
})

client.once('ready', () => {
	console.log('Ready!');
});
