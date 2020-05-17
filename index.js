const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config()

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();
client.login(token);


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
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
