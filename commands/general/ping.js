const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const start = Date.now();
		await interaction.reply({ content: 'Pinging...', fetchReply: true });
		const latency = Date.now() - start;
		await interaction.editReply(`Pong! \`${latency}ms\``);
	},
};
