const { MessageEmbed } = require('discord.js');
const { file_check } = require('../handlers/functions');

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
            const stp = await file_check(`${interaction.client.sts.dir}/Setup/${interaction.guild.id}.json`);
            const ticketEmbed = (user) => new MessageEmbed().setTitle('Ticket claim').setDescription(`<@!${user.id}> has claimed this ticket, expect some help from them soon.`);
            const worked = "You cancelled your ticket";
            const no = "You cannot claim this ticket";
            if (interaction.customId.includes('Button')) {
                if (interaction.customId.includes('-claim')) {
                    let allowedRole = await interaction.guild.roles.fetch(stp.role);
                    if (interaction.member.roles.cache.has(allowedRole.id)) {
                        await interaction.reply({embeds: [ticketEmbed(interaction.user)]});
                    } else {
                        await interaction.reply({content: no });
                    }
                } else if (interaction.customId.includes('-cancel')) {
                    await interaction.reply({ content: worked });
                }
            }
        }
    }
}  