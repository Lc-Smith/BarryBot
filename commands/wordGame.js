const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wordgame')
		.setDescription('Starts the game City Country River')
		.addIntegerOption(option =>
			option.setName('categories')
				.setDescription('How many categories do you want?')
				.setRequired(true)),
	async execute(interaction) {
		const catNumber = interaction.options.getInteger('categories')
		const category = ['Country', 'Mountain', 'Animal', 'Clothing', 'Color', 'Name', 'Hobby', 'Fruit', 'Vegetable', 'Food', 'Meal'];
		const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		letter.sort(function(){return 0.5 - Math.random()});
		var catList = '';

		for (i = 0; i < catNumber; i++) {
			category.sort(function(){return 0.5 - Math.random()});
			catList = (catList + ' `' + category[0] + '`');
		}
		await interaction.reply('Your categories are:' + catList + '. Your letter is `' + letter[0] + '`. Start typing!')
  },
};
