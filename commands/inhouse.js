const { SlashCommandBuilder, ChannelType, Embed } = require('discord.js');
const { shuffleArray, splitArray } = require('../helpers/shuffle');
const { EmbedBuilder } = require('discord.js');
const { gamesArr } = require('../helpers/gameArray');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inhouse')
		.setDescription('Sends message for players to react to')
		.addIntegerOption(option => option.setName('number')
			.setDescription('Number of players total')),
	async execute(interaction) {
		if (!interaction.member.voice.channel) {
			return interaction.reply({ content: 'You must be connected to a voice channel.', ephemeral: true });
		}

		const playerNumber = interaction.options.get('number')?.value || 10;
		const host = interaction.user;
		const message = await interaction.reply({ content: `${host.username} is hosting an inhouse for ${playerNumber} people, react with a thumbs up to opt in`, fetchReply: true });
		message.react('👍');

		const filter = (reaction, user) => reaction.emoji.name === '👍' && !user.bot;
		const collector = message.createReactionCollector({ filter, time: 240000, max: playerNumber });

		const memberArr = [];

		collector.on('collect', (r, user) => {
			console.log(`Collected ${r.emoji.name} from ${user.tag}`);
			if (!memberArr.includes(user)) {
				memberArr.push(user);
			}
		});

		collector.on('end', collected => {
			if (playerNumber > memberArr.length) {
				message.reply('Not enough players');
			}
			else if (memberArr.length % 2 === 0 && memberArr.length !== 0) {
				handleTeamShuffle(interaction, host, memberArr, playerNumber);
				// const shuffledTeams = shuffleArray(memberArr);
				// const teams = splitArray(shuffledTeams);

				// const response = handleInhouseMessageEmbed(host, teams, playerNumber);

				// message.reply({ embeds: [response] });
			}
			else {
				message.reply('Error');
			}
		});
	},
};

const handleTeamShuffle = (message, host, memberArr, playerNumber) => {
	const shuffledArr = shuffleArray(memberArr);
	const teams = splitArray(shuffledArr);
	const response = handleInhouseMessageEmbed(host, teams, playerNumber);

	return message.channel.send({ embeds: [response] })
		.then(res => message.channel.send('react with 👍 to confirm or 👎 to reshuffle'))
		.then(msg => {
			msg.react('👍');
			msg.react('👎');
			const filter = (reaction, user) => {
				return ['👍', '👎'].includes(reaction.emoji.name) && user.id === host.id;
			};
			const collection = msg.createReactionCollector({ filter, time: 600000, max: 1 });

			collection.on('collect', (reaction) => {
				if (reaction.emoji.name === '👍') {
					// TODO: handleMapBan
					const captains = [teams.one[0], teams.two[0]];
					handleMapBan(message, host, captains, teams, playerNumber);
				}
				else if (reaction.emoji.name === '👎') {
					handleTeamShuffle(message, host, memberArr, playerNumber);
				}
			});
		})
		.catch(err => {
			console.log('handleTeamShuffle');
			handleError(err, message);
		});
};
const handleMapBan = (message, host, captains, teams, playerNumber) => {
	return message.channel.send('would you like to ban maps? \n 🍆:CSGO, 🍑:Valorant, 🍌:Heroes of the Storm, ❌:Continue')
		.then(msg => {
			Promise.all([
				msg.react('🍆'),
				msg.react('🍑'),
				msg.react('🍌'),
				msg.react('❌'),
			]);
			const reactions = ['🍆', '🍑', '🍌', '❌'];

			const gameFilter = (reaction, user) => {
				return reactions.includes(reaction.emoji.name) && user.id === host.id;
			};

			const collection = msg.createReactionCollector({
				filter: gameFilter,
				time: 60000,
				max: 1,
			});

			collection.on('collect', async reaction => {
				if (!message.member.voice.channel) {
					return message.channel.send(`${message.member.user.username}, you must be connected to a voice channel.`);
				}
				const choice = reactions.findIndex(item => item === reaction.emoji.name);
				if (choice === reactions.length - 1) {
					const gameEmbed = gameStartEmbed(host, teams, playerNumber);
					message.channel.send({ content: 'Enjoy your game!', embeds: [gameEmbed] });
					createTeamChannels(message, teams.one, 'Team One');
					createTeamChannels(message, teams.two, 'Team Two');
				}
				else {
					const game = gamesArr[choice];
					await banMaps(message, game, captains, teams);
				}
			});
		})
		.catch(err => {
			console.log('handleMapBan');
			handleError(err, message);
		});
};

const handleError = (err, message) => {
	console.log(err.name + ' - ' + err.message);
	let errorMessage;
	if (err.name === 'Error [VOICE_JOIN_CHANNEL]' || err.message.includes('Permissions') || err.message.includes('Missing Access')) {
		errorMessage = 'Missing Permissions, check channel or bot permissions';
	}
	else if (err.message.includes('setChannel')) {
		errorMessage = 'Error setting channel of user, make sure all users are connected to a voice channel';
	}
	else if (err.message.includes('Unknown')) {
		errorMessage = 'Unknown Channel, make sure all users are connected to a voice channel';
	}
	else if (err.message.includes('not connected to voice')) {
		errorMessage = 'Error finding user. Make sure all players are connected to a voice channel';
	}
	else {
		errorMessage = 'Something went wrong - ' + err.message;
	}
	console.log(errorMessage);
	return message.channel.send(errorMessage);
};

const createTeamChannels = (message, team, name) => {
	return message.guild.channels.create({
		name: name,
		type: ChannelType.GuildVoice,
		parent: message.member.voice.channel.parentId,
	})
		.then(res => {
			console.log('Created Voice ID: ' + res.id);
			console.log('Guild ID: ' + res.guild.name);

			handleTempChannel(message, res);
			movePlayers(message, res, team);
		})
		.catch(err => {
			console.log('createTeamChannels');
			handleError(err, message);
		});
};

const handleTempChannel = (message, res) => {
	const teamChannelCounter = setInterval(function() {
		if (res.members.size === 0) {
			res.delete();
			clearInterval(teamChannelCounter);
		}
	}, 30000);
};

const movePlayers = (message, res, team) => {
	team.forEach(item => {
		const member = message.member.guild.voiceStates.cache.find(user => item.id == user.id);
		if (member) {
			return member.setChannel(res.id)
				.catch(err => {
					console.log('movePlayers');
					handleError(err, message);
				});
		}
	});
};

const banMaps = (message, game, captains, teams, turn = 0) => {
	const i = turn % 2;
	const currentCap = captains[i];
	const mapEmbed = mapBanEmbed(game.maps, currentCap, message, teams);
	return message.channel.send({ embeds: [mapEmbed] })
		.then(async msg => {
			const num = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'];
			const reactions = [];
			const promises = [];
			for (let j = 0; j < game.maps.length; j++) {
				reactions.push(num[j]);
				promises.push(msg.react(`${num[j]}`));
			}
			Promise.all(promises);

			const banFilter = (reaction, user) => {
				return reactions.includes(reaction.emoji.name)
					// && user.id === message.author.id
					&& user.id === currentCap.id;
			};

			const collection = msg.createReactionCollector({
				filter: banFilter,
				time: 60000,
				max: 1,
			});

			await collection.on('collect', async (reaction) => {
				// console.log(reaction.emoji.name);
				const banned = num.findIndex(item => item === reaction.emoji.name);
				game.maps.splice(banned, 1);
				if (game.maps.length === 1) {
					const newEmbed = gameEmbed(game.name, game.maps[0], teams);
					return message.channel.send({ embeds: [newEmbed] })
						.then(() => {
							createTeamChannels(message, teams.one, 'Team One');
							createTeamChannels(message, teams.two, 'Team Two');
							return message.channel.send('Enjoy your game!');
						})
						.catch(err => {
							console.log('handleMapBan');
							handleError(err, message);
						});
				}
				else {
					await banMaps(message, game, captains, teams, ++turn);
				}
			});
		})
		.catch(err => {
			console.log('handleMapBan');
			handleError(err, message);
		});
};

const handleInhouseMessageEmbed = (host, teams, playerNumber) => {
	if (!teams.one[0] || !teams.two[0]) return;
	return new EmbedBuilder()
		.setColor('#00ffff')
		.setTitle(`Inhouse for ${playerNumber}`)
		.setAuthor({ name: host.username, iconURL: `https://cdn.discordapp.com/avatars/${host.id}/${host.avatar}.png` })
		.addFields({
			name: 'Team One',
			value: teams.one.join(', '),
		}, {
			name: 'Team Two',
			value: teams.two.join(', '),
		})
		.setTimestamp();
};

const gameStartEmbed = (host, teams) => {
	return new EmbedBuilder()
		.setColor('#2bff00')
		.setAuthor({ name: `${host.username}'s ${teams.one.length} vs ${teams.two.length} game`, iconURL: `https://cdn.discordapp.com/avatars/${host.id}/${host.avatar}.png` })
		.addFields({
			name: teams.one[0].username + '\'s team',
			value: teams.one.join(', '),
		}, {
			name: teams.two[0].username + '\'s team',
			value: teams.two.join(', '),
		})
		.setDescription('If you like this bot please support it by voting on [top.gg](https://top.gg/bot/708468694816391248)');
};


const mapBanEmbed = (maps, captain) => new EmbedBuilder()
	.setColor('#0077ff')
	.setAuthor({ name: `${captain.username}'s turn`, iconURL: `https://cdn.discordapp.com/avatars/${captain.id}/${captain.avatar}.png` })
	.addFields({
		name: 'Maps',
		value: maps.map((item, index) => `${index + 1}. ${item}`).join('\n'),
	});

const gameEmbed = (game, map, teams) => new EmbedBuilder()
	.setColor('#2bff00')
	.setTitle(`${game} game on ${map}`)
	.addFields({
		name: teams.one[0].username + '\'s team',
		value: teams.one.join(', '),
	}, {
		name: teams.two[0].username + '\'s team',
		value: teams.two.join(', '),
	})
	.setDescription('If you like this bot please support it by voting on [top.gg](https://top.gg/bot/708468694816391248)')
	.setTimestamp();
