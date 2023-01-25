const fs = require('node:fs');
const path = require('node:path');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('Making LcSmith look smart');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

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

	// Help Page 2
	const helpEmbed2 = new EmbedBuilder()
		.setColor('#9900ff')
		.setTitle('Help Page 2')
		.setDescription('This is a cool Discord bot created by LcSmith.')
		.addFields(
			{ name: 'Word Game', value: '*This game was described to me by Lele* \n** /wordgame** Input amount of categories, outputs a set of categories and a letter \n__Point System__ \n- If you do not get the word of the category, 0 points. \n- If you get the word but another player has the same word in English translation, 5 points. \n- If you are the only person with the word from the category, 10 points. \n- The player with the most points is the winner\n__ Game Rules__ \n1. You have to make a list of words that begin with the letter chosen and each word should relate to a category \n2. When the quickest player has sent their words, they must say STOP, and each player must send their possibly incompleted list in the chat, do not finish your list if STOP has been said. \n3. You can use your own language in this game, even if the translated English word does not begin with the same letter'}
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

	client.on('interactionCreate', interaction => {
		if (!interaction.isButton()) return;
		//-- FIX: When two people press the same button at the same time, the bot crashes and gives an interaction error

		// Help command buttons
		if (interaction.customId === 'lastPage') {
			interaction.update({ embeds: [helpEmbed1], components: [helpRow] });
		}
		else if (interaction.customId === 'nextPage') {
			interaction.update({ embeds: [helpEmbed2], components: [helpRow] });
		}
	});

});

client.login(token);
