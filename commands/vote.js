module.exports = {
    name: "vote",
    description: "Sends the link to top.gg where the bot is listed",
    cooldown: 60,
    args: false,
    execute(message, args){
        return message.reply("I can be found on top.gg at https://top.gg/bot/708468694816391248")
        .catch(err => {
            console.log("vote")
            handleError(err, message)
        })
    }
}