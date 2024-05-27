const { Events } = require('discord.js');
const mongoose = require('mongoose');
const { dbUrl, dbName } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		const dbString = `${dbUrl}/${dbName}`;
		mongoose.set('strictQuery', false);
		await mongoose.connect(dbString).then(() => {
			console.log('Connected to database!');
		}).catch((err) => {
			console.log('Error connecting to database: ' + err);
		});

		console.log("Ready!");
	    client.user.setActivity("with Lc's feelings");
	},
};