module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const { client } = interaction;
        if (interaction.isCommand()) {
            const command = client.slashCommands.get(interaction.commandName);

            if(!command) return;

            try{
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'There was an error executing this command',
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()) {
            const worked2 = "You claimed your ticket";
            const worked = "You cancelled your ticket";
            if (interaction.customId.includes('Button')) {
                if (interaction.customId.includes('-claim')) {
                    await interaction.reply({ content: worked2 });
                } else if (interaction.customId.includes('-cancel')) {
                    await interaction.reply({ content: worked });
                }
            }
        }
    }
}  

        