const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicking command for administrators')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The member to kick')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason for kicking')
            .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
        await interaction.reply(`Kicking ${user.username} for reason: ${reason}`);
        await interaction.guild.members.kick(user, reason);
	},
};
