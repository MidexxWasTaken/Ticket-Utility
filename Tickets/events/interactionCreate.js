const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { file_check } = require('../handlers/functions');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const { client, guild, member } = interaction;
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
            const stp = await file_check(`${client.sts.dir}/Setup/${guild.id}.json`);
            const ticketEmbed = (user) => new MessageEmbed().setTitle('Ticket claim').setDescription(`<@!${user.id}> has claimed this ticket, expect some help from them soon.`);
            const worked = "Are you sure you wanna cancel this ticket?";
            const no = "You cannot claim this ticket. [PERMS ERROR 102]";
            if (interaction.customId.includes('Button')) {
                if (interaction.customId.includes('-claim')) {
                    let allowedRole = await guild.roles.fetch(stp.role);
                    if (member.roles.cache.has(allowedRole.id)) {
                        await interaction.reply({embeds: [ticketEmbed(interaction.user)]});
                    } else {
                        await interaction.reply({
                            content: no ,
                            ephemeral: true
                        });
                    }
                } else if (interaction.customId.includes('-cancel')) {
                    const buttons = new MessageActionRow().addComponents(
                        new MessageButton().setCustomId('Button-Yes').setEmoji('✋').setLabel('Yes').setStyle('SUCCESS'),
                        new MessageButton().setCustomId('Button-No').setEmoji('❌').setLabel('No').setStyle('DANGER')
                    );
                    await interaction.reply({ 
                        content: worked, 
                        components: [buttons]
                 });
                } else if (interaction.customId.includes('-Yes')) {
                    interaction.channel.delete()
                    interaction.user.send('test')
                } else if (interaction.customId.includes('-No')) {
                    const message = await interaction.channel.messages.fetch(interaction.message.id);
                    message.delete();
                }
            }
        }
    }
}  
