module.exports = {
    name: 'InteractionCreate',
    async execute(interaction, client) {
        console.log('interaction received');
        console.log(interaction);
        if (interaction.isCommand()) {
            const command = client.command.get(interaction.commandName);

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
            console.log('Interaction is a BUTTON');
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

        