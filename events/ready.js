const { Events } = require('discord.js');
const mongoose = require('mongoose');
const { dbUrl, dbName } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		const dbString = `${dbUrl}/${dbName}`;
		mongoose.set('strictQuery', false);
		mongoose.connection.on('error', (err) => {
			console.error('Mongoose connection error:', err);
		});

		try {
			await mongoose.connect(dbString);
			console.log('Connected to database!');
		} catch (err) {
			console.error('Error connecting to database:', err);
		}

		console.log('Ready!');
	    client.user.setActivity("with Lc's feelings");
	},
};