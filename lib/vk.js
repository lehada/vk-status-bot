const config = require('../config');
const { VK } = require('vk-io');

const vk = {
    group: new VK({
        token: config.vkBotGroupToken,
        pollingGroupId: config.vkBotGroupId
    }),
    user: (token) => new VK({
        token: token
    })
};

module.exports = vk;