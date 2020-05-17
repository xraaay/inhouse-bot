# Inhouse Bot
####  A Discord bot for organizing inhouse games in server.
 ## How it works
 Upon receiving the command, the bot will send a message. React with a thumbs up to opt in to the inhouse. Once enough reactions are collected, the bot will send a message with the scrambled teams. The host can either accept (thumbs up) or reshuffle (thumbs down). If the teams are accepted, the bot will create two temporary voice channels and move each player to the correct channel. Once the voice channels are empty, the bot will remove the channels after a short delay.
## Commands
 #### inhouse [optional: player number]
 Creates two temporary team voice channels and moves players into random teams.
 Example: `#inhouse 8`
## How to use
Add the bot to the server with this [link](https://discord.com/oauth2/authorize?client_id=708468694816391248&scope=bot&permissions=8)
