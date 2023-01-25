const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lists all commands and describes how to use them'),
	async execute(interaction) {
		// Help Page 1
		const helpEmbed1 = new EmbedBuilder()
			.setColor('#9900ff')
			.setTitle('Help Page 1')
			.setDescription('This is a cool Discord bot created by LcSmith.')
			.addFields(
				{ name: 'General Help', value: ' **/help** \nDisplays this menu. \n**/ping** \nTest the response time of the bot.' },
				{ name: 'Dice Rolling', value: '**/roll** \nRoll dice that everyone can see. \n**/dmroll** \nRoll dice that only you can see. \n**/abilityroll** \nRolls a full set of ability scores for you.'},
				{ name: 'Animal Simulator Maths', value: '*This section was programmed by LcSmith with assistance from GermanScot.* \n**/ascalc** \nWith multiple inputs, calculates the amount of time it would take for you to level to a set level. \n**/asdamage** \nCalculates damage from level. \n**/ashealth** \nCalculates health from damage. \n**/aslevel** \nCalculates level from damage.' },
			)
			.setTimestamp()
			.setFooter({ text: 'LcSmith', iconURL: 'https://i.imgur.com/Q6umWA3.png'});

		// Help Buttons
		const helpRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('lastPage')
					.setLabel('Last Page')
					.setStyle(ButtonStyle.Secondary)
					.setEmoji('⬅️'),
				new ButtonBuilder()
					.setCustomId('nextPage')
					.setLabel('Next Page')
					.setStyle(ButtonStyle.Secondary)
					.setEmoji('➡️'),
			);

		//First help output
		interaction.reply({ embeds: [helpEmbed1], components: [helpRow] });
  },
};
