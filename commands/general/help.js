const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lists all commands and describes how to use them'),
	async execute(interaction) {

		const helpEmbed1 = createEmbed({
			title: 'Main Help Page',
			description: 'General Discord bot created by LcSmith.',
			color: 0x9900ff,
			fields: [
				{ name: 'General', value: '*/help* Displays this menu. \n*/ping* Replies with Pong!. \n*/userinfo* Shows info about a server member. \n*/serverinfo* Shows details about this server.' },
				{ name: 'Dice Rolling', value: '*/roll* Roll dice that everyone can see. \n*/dmroll* Roll dice that only you can see. \n*/abilityroll* Rolls a set of 4d6, re-rolls any 1s, and removes the lowest die.' },
				{ name: 'Moderation', value: '[Server Admins Only] \n*/ban* Bans a mentioned user. \n*/kick* Kicks a mentioned user. \n*/mute* Timeout a member for a limited duration. \n*/unmute* Remove a timeout from a member. \n*/warn* Issue a warning to a member. \n*/warnings* View warnings for a member.' },
				{ name: 'Animal Sim Maths', value: '*/asCalc* Calculates grind time to reach a target level. \n*/asCoins* Calculates level gain from coins. \n*/asDamage* Outputs damage for your level. \n*/asHealth* Outputs health for your level and title. \n*/asHits* Calculates hits between two experience totals. \n*/asLevel* Converts damage dealt into level.' },
				{ name: 'Confessions', value: '*/confess* Send an anonymous message. \n*/setconfessions* [Server Admin Only] Set the output channel for confessions.' }
			],
			footer: {
				text: 'LcSmith',
				iconURL: 'https://i.imgur.com/ANiuaqS.png',
			},
		});

		await interaction.reply({ embeds: [helpEmbed1] });
  },
};
