const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Shows information about a server member')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The member to look up')
				.setRequired(false)),

	async execute(interaction) {
		const targetUser = interaction.options.getUser('user') ?? interaction.user;
		const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

		const roles = member
			? member.roles.cache
				.filter(role => role.id !== interaction.guild.id)
				.map(role => role.name)
				.slice(0, 10)
				.join(', ') || 'None'
			: 'None';

		const embed = createEmbed({
			title: 'User Information',
			description: `Information for **${targetUser.tag}**`,
			color: 0x00ccff,
			fields: [
				{ name: 'User ID', value: targetUser.id, inline: true },
				{ name: 'Bot Account', value: targetUser.bot ? 'Yes' : 'No', inline: true },
				{ name: 'Account Created', value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:F>`, inline: false },
				{ name: 'Joined Server', value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>` : 'Not available', inline: false },
				{ name: 'Roles', value: roles, inline: false },
			],
			interaction,
		});

		await interaction.reply({ embeds: [embed] });
	},
};
