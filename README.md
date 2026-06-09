# Barry Bot

Barry Bot is an open-source Discord bot created by LcSmith. It provides general utility, dice-rolling tools, moderation commands, and some Roblox Animal Simulator helper commands.

## Features

- Slash commands for general server info and user info
- Dice rolling: `/roll`, `/dmroll`, `/abilityroll`
- Moderation commands: `/ban`, `/kick`, `/mute`, `/unmute`, `/warn`, `/warnings`
- Animal Simulator helper commands: `/ascalc`, `/ascoins`, `/asdamage`, `/ashealth`, `/ashits`, `/aslevel`
- Confession support: `/confess`, `/setconfessions`

## Requirements

- Node.js (recommended v18 or newer)
- A Discord bot application with a token
- A MongoDB connection for warning/confession persistence

## Setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Copy `example.env` to `.env` and fill in your values:

```env
CLIENT_ID=your_client_id_here
TOKEN=your_bot_token_here
GUILD_ID=your_guild_id_here
DB_URL=your_mongodb_connection_string_here
DB_NAME=BarryBot
```

- `CLIENT_ID` is your bot application ID.
- `TOKEN` is your bot token.
- `GUILD_ID` is optional; if provided, commands deploy only to that guild for faster testing.
- `DB_URL` and `DB_NAME` are used by mongoose to connect to MongoDB.

## Running the Bot

1. Deploy the slash commands:

```bash
node deploy-commands.js
```

2. Start the bot:

```bash
node index.js
```

3. Stop the bot with `Ctrl + C` or by closing the terminal.

## Available Commands

### General

- `/help` — Display the help response.
- `/ping` — Check bot latency.
- `/serverinfo` — Show information about the current server.
- `/userinfo` — Show information about a user.

### Dice

- `/roll` — Roll dice with a command input.
- `/dmroll` — Roll dice privately via DM output.
- `/abilityroll` — Roll D&D ability score dice.

### Moderation

- `/ban` — Ban a user.
- `/kick` — Kick a user.
- `/mute` — Mute a user.
- `/unmute` — Unmute a user.
- `/warn` — Issue a warning to a user.
- `/warnings` — View warnings for a user.

### Miscellaneous

- `/ascalc` — Calculate time to reach an Animal Simulator level goal.
- `/ascoins` — Estimate coin earnings.
- `/asdamage` — Calculate damage based on level.
- `/ashealth` — Calculate health based on level.
- `/ashits` — Calculate experience between levels.
- `/aslevel` — Calculate level from damage.
- `/confess` — Submit an anonymous confession.
- `/setconfessions` — Set the confession channel.

## Notes

- The bot loads commands from the `commands` folder and registers them via `deploy-commands.js`.
- MongoDB is used by the bot on startup; if the connection fails, the bot logs the error.

## License

This repository is maintained by LcSmith.

