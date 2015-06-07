var path = require('path'),
    root = path.join(__dirname, '../..');

module.exports = {
    view: {
        templateRoot: path.join(root, 'static'),
        bundleName: 'desktop',
        availableBundles: ['desktop'],
        languageId: 'ru'
    },

    defaults: function(req ){
        return {
            user: req.user,
                language: 'ru',
            menu: [
                {
                    title: 'Главная',
                    url: '/'
                },
                {
                    title: 'Все пользователи',
                    url: '/users'
                },
                {
                    title: req.user ? 'Мои товары' : 'Все товары',
                    url: '/goods'
                },
                !req.user ?
                {
                    title: 'Авторизоваться',
                    url: '/auth'
                } :
                {
                    title: req.user.username,
                    url: '/account'
                }
            ],
            route: req.route
        }
    }
};