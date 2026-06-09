const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Timeout a server member for a limited time')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The member to mute')
				.setRequired(true))
		.addIntegerOption(option =>
			option
				.setName('duration')
				.setDescription('Mute duration in minutes (default 10)')
				.setMinValue(1)
				.setRequired(false))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('Reason for the timeout')
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false),

	async execute(interaction) {
		const targetUser = interaction.options.getUser('user');
		const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);
		const duration = interaction.options.getInteger('duration') ?? 10;
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		if (!member) {
			return interaction.reply({ content: 'Could not find that member in this server.', ephemeral: true });
		}

		if (!member.moderatable) {
			return interaction.reply({ content: 'I cannot timeout that member. Check my permissions and role hierarchy.', ephemeral: true });
		}

		try {
			await member.timeout(duration * 60 * 1000, reason);
			const embed = createEmbed({
				title: 'Member Timed Out',
				description: `Successfully muted **${targetUser.tag}** for ${duration} minute(s).`,
				color: 0xffaa00,
				fields: [
					{ name: 'Duration', value: `${duration} minute(s)`, inline: true },
					{ name: 'Reason', value: reason, inline: false },
				],
				interaction,
			});

			await interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.error('Mute command failed:', error);
			const errorEmbed = createEmbed({
				title: 'Mute Failed',
				description: `Could not mute **${targetUser.tag}**.`,
				color: 0xff0000,
				fields: [
					{ name: 'Error', value: error.message, inline: false },
				],
				interaction,
			});
			await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}
	},
};
