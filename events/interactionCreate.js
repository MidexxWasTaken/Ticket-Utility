const { EmbedBuilder, ButtonBuilder, ButtonStyle, CategoryChannel, User } = require('discord.js');
const { file_check } = require('../handlers/functions');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const { client, guild, member } = interaction;
        if (interaction.isCommand()) {
            const command = client.slashCommands.get(interaction.commandName);

            if(!command) return;

            try{
                await command.execute(interaction, client, interaction.args);
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
            const deleteEmbed = (user) => new MessageEmbed().setTitle('Ticket Closed!').setDescription(`has closed this ticket, see you next time!`);
            const stk = await file_check(`${client.sts.dir}/userid/${User.id}.json`);
            const deleteuser = await guild.members.fetch(stk.id);
            const worked = "Are you sure you wanna cancel this ticket?";
            const no = "You cannot claim this ticket.";
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
                    const buttons = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('Button-Yes').setEmoji('✋').setLabel('Yes').setStyle(ButtonStyle.Success),
                        new ButtonBuilder().setCustomId('Button-No').setEmoji('❌').setLabel('No').setStyle(ButtonStyle.Danger)
                    );
                    await interaction.reply({ 
                        content: worked, 
                        components: [buttons]
                 });
                } else if (interaction.customId.includes('-Yes')) {
                    if (interaction.user.id = deleteuser) {
                            interaction.channel.delete()
                            await interaction.user.send({embeds: [deleteEmbed(interaction.user)]});
                    } else {
                        await interaction.reply({
                            content: test,
                            ephemeral: true
                        });
                    }
                } else if (interaction.customId.includes('-No')) {
                    const message = await interaction.channel.messages.fetch(interaction.message.id);
                    message.delete();
        interaction.reply({ embeds: [embed], components: [buttons] });
                }
            }
        }
    }
}  

