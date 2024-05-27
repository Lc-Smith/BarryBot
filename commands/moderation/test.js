const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('ignore me')
        .addRoleOption(option =>
            option.setName('role')
            .setDescription('Test')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
            const role = ('1218578042801225729');
            await interaction.reply("Response " + role);
	},
};
