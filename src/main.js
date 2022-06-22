const vk = require('../lib/vk');
const keyboard = require('./addons/keyboards');
const utils = require('./addons/utils');
const deferred = require('deferred');

const defferred = [];

vk.group.updates.on('message_new', async (ctx) => {
    defferred.forEach(async (data) => {
        if (data.user_id == ctx.senderId && ctx.peerId == data.peer_id) {
            data.def.resolve(ctx);
            return defferred.splice(defferred.indexOf(data), 1);
        }
    });
    ctx.question = async (text, params = {}) => {
        await ctx.send(text, params);
        var def = deferred();
        defferred.push({
            user_id: ctx.senderId,
            def: def,
            peer_id: ctx.peerId,
            payload: ctx.messagePayload
        });
        return def.promise((data) => {
            return data 
        });
    };

    if(ctx.text === 'Начать') return ctx.send({
        message: 'Главное меню',
        keyboard: keyboard.main(ctx.senderId)
    });

    if(ctx.messagePayload?.command == 'setStatus') {
        const { short_url } = await vk.group.api.utils.getShortLink({ url: 'https://oauth.vk.com/authorize?client_id=6121396&scope=1024&redirect_uri=https://oauth.vk.com/blank.html&display=page&response_type=token&revoke=1' });
        const userToken = await ctx.question(`Для установки авто-статуса, нужно получить токен:

1. Перейдите по ссылке - ${short_url}
2. Нажмите «Разрешить»
3. Скопируйте ссылку из адресной строки
4. Отправьте боту ссылку`);

        if(!utils.checkUrl(userToken.text)) return ctx.send({
            message: `Это не ссылка.`
        });

        const finalToken = userToken.text.split('access_token=')[1].split('&expires_in=')[0];

        const [tokenInfo] = await vk.user(finalToken).api.users.get();

        const newStatus = await ctx.question(`Укажите ваш новый авто-статус: 
        
Доступные переменные:`);

        await vk.user(finalToken).api.status.set({ text: newStatus.text });

        return ctx.send(`Успешно установлен статус «${newStatus.text}» на аккауте [id${tokenInfo.id}|${tokenInfo.first_name} ${tokenInfo.last_name}]`);
    }
});

module.exports = {
    updates: {
        start: async () => {
            vk.group.updates.start()
        }
    }
};