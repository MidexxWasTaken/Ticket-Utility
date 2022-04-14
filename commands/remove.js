const { file_check, file_write } = require('../handlers/functions');
module.exports = {
    data: {
        name: 'remove',
        type: 1,
        description: 'Remove a user from the ticket!',
        options: [
            { type: 6, name: 'member', description: 'Member ID to remove from the ticket', required: true }
        ]
    },
    async execute(i) {
        const user = i.options.getUser('member');
        if (!i.channel.name.startsWith('ticket-')) return i.reply({ content: '*You can only use this command in a ticket channel.*' });
        if (!i.member.permissions.has('MANAGE_CHANNELS')) return i.reply({ content: '*You must be an administrator to run this command.*' });
        if (i.channel.permissionsFor(user).has('VIEW_CHANNEL')) return i.reply({ content: `<@${user.id}> already has permissions to this channel.*` });
  
        i.channel.permissionOverwrites.edit(user, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            READ_MESSAGE_HISTORY: true
          })
  
        i.reply('Successfully added the member to the channel')
  
    }
}