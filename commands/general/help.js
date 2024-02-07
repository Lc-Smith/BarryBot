const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lists all commands and describes how to use them'),
	async execute(interaction) {

		const helpEmbed1 = new EmbedBuilder()
			.setColor('#9900ff')
			.setTitle('Main Help Page')
			.setDescription('General Discord bot created by LcSmith.')
			.addFields(
				{ name: 'Commands', value: '*/help* Displays this menu. \n*/ping* Test the response time of the bot.' },
				{ name: 'Dice Rolling', value: '*/roll* Roll dice that everyone can see. \n*/dmroll* Roll dice that only you can see. \n*/abilityroll* Rolls a full set of ability scores for you.'},
				{ name: 'Moderation', value: '*/kick* Kicks mentioned user. \n*/ban* Bans mentioned user.' },
				{ name: 'Animal Sim Maths', value: '*/asCalc* Outputs estimated length of time to grind to a chosen level. See input descriptions for info. \n*/asDamage* Outputs damage. Input level. \n*/asHealth* Outputs health. Input level. \n*/asLevel* Outputs level. Input damage.'}
			)
			.setTimestamp()
			.setFooter({
				text: 'LcSmith', 
				iconURL: 'https://i.imgur.com/ANiuaqS.png',
			});
		
		const response = await interaction.reply({
			embeds: [helpEmbed1],
		});
  },
};
