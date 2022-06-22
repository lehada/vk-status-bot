const { Keyboard } = require('vk-io')

module.exports = {
    main: (uid) => {
        const keyboard = [
            [
                Keyboard.textButton({
                    label: 'Установить авто-статус',
                    color: Keyboard.POSITIVE_COLOR,
                    payload: { command: 'setStatus' }
                })
            ]
        ];
        return Keyboard.keyboard(keyboard); 
    }
};