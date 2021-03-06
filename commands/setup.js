
const { file_write } = require('../handlers/functions');

module.exports = {
    data: {
        name: 'setup',
        type: 1,
        description: 'Setup category and staff role!',
        options: [
            { name: 'category', description: 'Choose a category for ticket channels!', required: true, type: 7, channel_types: [4] },
            { name: 'role', description: 'Choose a staff role!', required: true, type: 8 }
        ]
    },
    async execute(i) {
        await i.deferReply({ ephemeral: true });
        
        const status = i.member.permissions.has('ADMINISTRATOR');
        if (!status) {
            await i.editReply({ content: '*You must be an administrator to run this command.*' });
            return;
        }

        const ct = i.options.getChannel('category');
        const rl = i.options.getRole('role');
        const uptade = { role: rl.id, category: ct.id, ticket: 0 };

        file_write(`${i.client.sts.dir}/Setup/${i.guild.id}.json`, uptade);
        await i.editReply({ content: `*The configuration file was successfully updated.*\n\n• **Category:** ${ct.toString()}\n• **Role:** ${rl.toString()}` });
    }
};
