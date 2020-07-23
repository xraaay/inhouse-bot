const { handleError } = require("../helpers/helper")

module.exports = {
    name: "help",
    description: "Gives a list of commands or information about a command",
    aliases: ['commands'],
    usage: '[command name]',
    args: false,
    execute(message, args) {
        let prefix = process.env.PREFIX
        const commands = message.client.commands
        let commandList = commands.map(command => "**" + process.env.PREFIX + command.name + "**").join(", ")
        if (!args.length) {
            return message.reply(`here's a list of my commands: ${commandList}, try ${process.env.PREFIX}help [command name] for more info`)
                .catch(err => {
                    console.log("help")
                    handleError(err, message)
                })
        } else {
            let name = args[0].toLowerCase();
            const data = [];
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if (!command) {
                return message.reply('that\'s not a valid command');
            }

            if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

            return message.channel.send(data, { split: true })
                .catch(err => {
                    console.log("help")
                    handleError(err, message)
                })
        }
    }
}