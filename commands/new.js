
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { file_check, file_write } = require('../handlers/functions');

module.exports = {
    data: {
        name: 'new',
        type: 1,
        description: 'Create a new ticket!'
    },
    async execute(i) {
        await i.deferReply({ ephemeral: true });
        const stp = await file_check(`${i.client.sts.dir}/Setup/${i.guild.id}.json`);

        if (!stp) {
            await i.editReply('*Configuration not found.*');
            return;
        }

        const category = await i.guild.channels.fetch(stp.category);
        if (category.children.size >= 50) {
            await i.editReply({ content: '*The staff is overloaded with tickets, try again later.*' });
        } else {
            const name = `ticket-${stp.ticket + 1}-${String(i.user.username).substring(0, 10)}`;
            const perms = [
                { id: i.client.sts.app, type: 'member', allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS'], deny: [] },
                { id: i.guild.id, type: 'role', allow: ['USE_EXTERNAL_EMOJIS'], deny: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']},
                { id: i.user.id, type: 'member', allow: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS'], deny: ['CREATE_INSTANT_INVITE', 'CREATE_PUBLIC_THREADS']},
                { id: stp.role, type: 'role', allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'], deny: ['SEND_MESSAGES'] }
            ];

            const ticket = await category.createChannel(name, { reason: 'Opened a Ticket', topic: `**USER:** ${i.user.tag} | **ID:** ${i.user.id}`, permissionOverwrites: perms });
            const uptade = { role: stp.role, category: stp.category, ticket: (stp.ticket + 1) };
            file_write(`${i.client.sts.dir}/Setup/${i.guild.id}.json`, uptade);
            
            const buttons = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('Button-claim').setEmoji('✋').setLabel('Claim').setStyle('SUCCESS'),
                new MessageButton().setCustomId('Button-cancel').setEmoji('❌').setLabel('Cancel').setStyle('DANGER')
            );
            const emb = new MessageEmbed().setColor('#FB8C00').setFooter({ text: `Ticket created by ${i.user.tag}`, iconURL: i.user.displayAvatarURL({ dynamic: true }) }).setDescription('A staff member will get back to you soon!').setTitle(`:ticket: Ticket #${stp.ticket + 1}`);

            const msg = await ticket.send({ embeds: [emb], components: [buttons] });
            await i.editReply({ content: `Your ticket has been created at [${ticket.name}](${msg.url})` });
        }
    }
};
