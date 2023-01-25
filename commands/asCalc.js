const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ascalc')
		.setDescription('Calculates the amount of time it would take for you to level up if grinding.')
    // Current Level
    .addIntegerOption(option =>
      option.setName('currentlevel')
        .setDescription('What is your current level?')
        .setRequired(true))
    // Goal Level
    .addIntegerOption(option =>
      option.setName('goallevel')
        .setDescription('What level do you want to be?')
        .setRequired(true))
    // Multiplier
    .addIntegerOption(option =>
      option.setName('multiplier')
        .setDescription('What gamepass multiplier do you have?')
        .setRequired(true)
        .addChoices(
          { name: 'No multi', value: 1 },
          { name: '8x multi', value: 8 },
          { name: '13x multi', value: 13 },
        ))
    // Fireball
    .addBooleanOption(option =>
      option.setName('fireball')
        .setDescription('Do you have fireball?')
        .setRequired(false))
    // Bonus Multiplier
    .addIntegerOption(option =>
      option.setName('bonusmulti')
        .setDescription('Is there a bonus multiplier ingame, if so how much?')
        .setRequired(false)),

	async execute(interaction) {
    await interaction.deferReply();

    // Input level, level goal, multi, fireball, bonusmulti Output time until level goal
    const cLevel = interaction.options.getInteger('currentlevel'); // Current level
    const gLevel = interaction.options.getInteger('goallevel'); // Level goal
    const fBall = interaction.options.getBoolean('fireball'); // Fireball bool
	const totalMulti = (interaction.options.getInteger('multiplier') + interaction.options.getInteger('bonusmulti')); // Full Multiplier total
	var level = cLevel // Level used for maths
    var cEXP; // EXP to level
    var EXP = 0; // EXP count
    var cTime = 0; // Current time
    var hits = 0; // Hit count
	var pasEXP = 0; // passive EXP variable
	// variables for hits per second (second/hits per second)
	var fTime = 1/1.75;
	var nFTime = 1/1.4;

	// Function for calculating hits at current level
	function HitCalc(level) {
		var outEXP = level * 1000; // First level EXP needed

		if (level >= 5000) {
			var outHits = (outEXP / (((1000 * totalMulti) + level) + 5000)).toFixed(2);
		} else if (level < 5000) {
			var outHits = (outEXP / ((1000 * totalMulti) + level)).toFixed(2);
		}
		return outHits;
	}
	// Function for calculating passive exp (only called when active ingame)
	function PassiveEXP(level) {
		// Last timed using Non-GP Red Penguin 00/00/00
		// Melee + fBall = 105 / 60 = 1.75
		// Melee = 84 / 60 = 1.4
		if (fBall) cTime += fTime;
		else cTime += nFTime;

		if (cTime >= 4.57) {
			EXP = EXP + ((1000 * totalMulti) + level);
			cTime -= 4.57; // This is to reset the time so that passive experience gain doesn't spam
			pasEXP = pasEXP + 1;
		}
	}
	// Function for calculating the time
	function TimeCalc(hits) {
		// Fireball info for time calculation
		if (fBall === true) var time = hits/1.75;
		else {
			var time = hits/1.4;
			fBall == false;
		}

		// Calculating time
		time = parseInt(time, 10); // Formats time

		var days = Math.floor(time / 86400); // Calculates days
		var hours   = Math.floor((time - (days * 86400)) / 3600); // Calculates hours
		var minutes = Math.floor((time - (days * 86400) - (hours * 3600)) / 60); // Calculates minutes
		var seconds = time - (days * 86400) - (hours * 3600) - (minutes * 60); // Calculates seconds

		// Formatting time
		if (days < 10) days = "0" + days;
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;
		return [days, hours, minutes, seconds];
	}

	while (level < gLevel) {
		cEXP = level * 1000; // Calc current level EXP
		while (EXP <= cEXP) {
			// Hit calculation, if 5k+ then cave dummies
			if (level >= 5000) EXP += ((1000 * totalMulti) + level) + 5000;
			else if (level < 5000) EXP += (1000 * totalMulti) + level;
			hits = hits + 1;
		}
		level += 1;
		EXP -= cEXP; // Since 1 level is added, remove extra xp
	}

	// Replying in the chosen format
	if (interaction.user.id === "301313670850543616") {
		var arrayTime = TimeCalc(hits);
		var totalHit = pasEXP + hits;
		await interaction.editReply("You said from `" + cLevel + "` to `" + gLevel + "`, with a multiplier of `" + totalMulti + "`, and you chose fireball to be `" + fBall + "`. \nThis would take `" + hits + "` melee/fire hits over `" + arrayTime[0] + " Days and " + arrayTime[1] + ":" + arrayTime[2] + ":" + arrayTime[3] + "`. \nWith a total of `" + pasEXP + "` passive incomes, totalling at `" + totalHit + "` hits. \nExpected first level hit count: " + HitCalc(level));
	} else {
		TimeCalc();
		await interaction.editReply("You said from `" + cLevel + "` to `" + gLevel + "`, with a multiplier of `" + totalMulti + "`, and you chose fireball to be `" + fBall + "`. \nThis would take `" + hits + "` melee/fire hits over `" + arrayTime[0] + " Days and " + arrayTime[1] + ":" + arrayTime[2] + ":" + arrayTime[3] + "`.");
	}
  },
};
