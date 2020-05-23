const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config()

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
client.login(token);


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    //check arguments
    if (command.args && !args.length) {
        return message.channel.send(`No arguments`)
    }

    //check cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const timestamps = cooldowns.get(command.name);
    const now = Date.now();
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //try execute
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error)
        message.reply("There was an error executing that command")
    }
})

client.on("guildCreate", guild => {
    let channel = guild.channels.cache.find(channel => {
        return channel.type === 'text' && channel.permissionsFor(guild.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES']);
    });
    console.log(channel)
    return channel.send(`Thanks for inviting me into this server! You can get a list of my commands with #help or you can start an inhouse with #inhouse [player number]`)
});

client.once('ready', () => {
    let guilds = client.guilds.cache.map(item => item.name)
    console.log(guilds)
    console.log('Ready!');
});