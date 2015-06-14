var path = require('path'),
    root = path.join(__dirname, '../..');

module.exports = {
    view: {
        templateRoot: path.join(root, 'static'),
        bundleName: 'desktop',
        availableBundles: ['desktop'],
        languageId: 'ru'
    },

    defaults: function(req) {
        req.user = req.user ? req.user : {};

        var defaultMenuItems = [
                { title: 'Главная', url: '/' },
                { title: 'Все пользователи', url: '/users' },
                { title: req.user ? 'Мои товары' : 'Все товары', url: '/goods' }
            ],
            authorizedMenuItems = [
                { title: req.user.username, url: '/account' }
            ],
            notAuthorizedMenuItems = [
                { title: 'Авторизоваться', url: '/login' }
            ],
            additionalItems = {
                userGoods: [{ title: 'Добавить товар', url: '/goods/add' }],
                user:      [{ title: 'Выход', url: '/logout' }]
            };

        return {
            language: 'ru',
            route: req.route,
            menu: {
                main: defaultMenuItems.concat(req.user.username ? authorizedMenuItems : notAuthorizedMenuItems),
                additional: additionalItems
            },
            contentType: 'main',
            main: 'Стаб проект на b_ + mongoDB с авторизацией через OAuth от Я.Паспорта<br/><br/>'
        };
    }
};
