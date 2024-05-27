const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const AnonCommands = require('../../schemas/anoncommands');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setconfessions')
		.setDescription('Set the output channel for confessions')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Select output channel')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        var outputChannel = interaction.options.getChannel('channel');
        console.log(outputChannel.id);
        await interaction.reply({ content: "Setting channel...", ephemeral: true});

        const guildId = interaction.guild.id;
        const anonCommand = await AnonCommands.findOne({ guildId: guildId });

        if (anonCommand) {
            await AnonCommands.findOneAndDelete({ guildId: guildId });
        }

        const newAnonCommand = new AnonCommands({
            guildId: guildId,
            channelId: outputChannel.id,
        });

        await newAnonCommand.save();

        await interaction.editReply({ content: "Confession channel set!"});

  },
};
