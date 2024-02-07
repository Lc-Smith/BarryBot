const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Banning command for administrators')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The member to ban')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason for banning')
            .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
        await interaction.reply(`Banning ${user.username} for reason: ${reason}`);
        await interaction.guild.members.ban(user, reason);
	},
};
