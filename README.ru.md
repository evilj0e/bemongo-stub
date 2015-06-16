# Bemongo-stub

## Зачем?

Когда я начал изучать [методологию БЭМ](https://ru.bem.info/) и инструменты для создания проектов на ней, мне показалось, что это не только как писать, но и какая-то неповоротливая и неделимая комбинация инструментов, которая чисто 'про фронтенд'.
Первое впечатление было: "Это всё, конечно, классно, но как это можно использовать в жизни?"

Никаких примеров по тому как подружить full stack [БЭМ](https://ru.bem.info/) c чем-то, к сожалению, на момент моего знакомства небыло.
Особенно непросто разобраться с этой проблемой тем, кто только-только знакомится с технологиями БЭМ.

Именно для решения этой проблемы, я написал небольшой проект, который показывает как можно подружить источник данных (в данном случае [mongodb](http://www.mongodb.org/)) и стек технологий БЭМ.

## Что такое Bemongo-stub?

Шаблонный репозиторий для создания своего собственного [БЭМ](https://ru.bem.info/)-проекта в связке с [mongodb](http://www.mongodb.org/).
Содержит самый необходимый, на мой взгляд, функционал, включает пример простейшего скелета приложения
с получением, сохранением данных в [mongodb](http://www.mongodb.org/) и авторизацией пользователей через [OAuth 2.0 API Яндекса](https://oauth.yandex.ru/).

Проект реализован по БЭМ-методологии на `priv.js`, собирается [ENB](https://bem.info/tools/bem/enb-bem-techs/)-сборщиком.
В Bemongo-stub по умолчанию подключены основные БЭМ-библиотеки:

* [bem-core](https://github.com/bem/bem-core)
* [bem-components](https://github.com/bem/bem-components)

## Особенности реализации

Здесь я постарался всё написать довольно просто с несколькими роутами, которые показывают принципы работы по получению данных из базы, сохранению в неё, авторизации пользователя, сессией и всем остальным. 

Используются:

* [Express](http://expressjs.com/) -- используется для нормального роутинга проекта;
* [MongoDB](http://www.mongodb.org/) -- хранение данных ресурса (отсюда мы будем всё брать :) ). Использую mongodb в связке с промисами [bluebird](https://github.com/petkaantonov/bluebird);
* [ENB](http://enb-make.info/) -- сборщик проекта;
* [Passport Yandex](https://github.com/gurugray/passport-yandex) -- аутентификация в проекте через [OAuth 2.0 API от Яндекс](https://oauth.yandex.ru/).

По своей сути проект разделён на 2 части:
* `server` -- вся серверная часть;
* `static` -- блоки и бандлы страниц.
Так как, данные будут у нас браться динамически, то для реализации блоков используется priv.js

## Требования к установке

* [Node.js 0.10+](http://nodejs.org) – это программная платформа, основанная на языке JavaScript и позволяющая легко создавать быстрые и масштабируемые сетевые приложения. Или [io.js](https://iojs.org/en/index.html), как альтернатива Node.js.
* [Git Bash](http://msysgit.github.io/) – для пользователей операционной системы Windows.

## Установка

Клонируем репозиторий и устанавливаем все необходимые зависимости:

```
git clone git@github.com:evilj0e/bemongo-stub.git my-bem-project
cd my-bem-project
npm run init  # Не используйте права суперпользователя (`root`) при установке npm- и bower-зависимостей.
```

bower-зависимости устанавливаются при выполнении `npm run init` в папку `/static/vendors`.

Для работы с OAuth 2.0 API от Яндекс нужно получить токены для вашего экземпляра приложения [здесь](https://oauth.yandex.ru/).
И вставить эти данные в `server/lib/passport.js` в строки:
```
passport.use(new PassportYandex({
        clientID: '--- Client ID ---',
        clientSecret: '--- Client secret ---',
        callbackURL: 'http://localhost:3000/login/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            db.upsertUser(profile.id, profile, done);
        });
    }
));
```

## Сборка и запуск проекта

Собрать проект можно с помощью [ENB](https://bem.info/tools/bem/enb-bem-techs/).
Вызов всех команд `enb` возможен собственноручно из папки `node_modules/.bin/enb` или можно использовать подготовленные мной шорткаты.

### Доступные шорткаты

```init``` -- инициализация проекта и установка всех необходимых зависимостей;

```jscs``` -- проверяем кодстайл через [jscs](http://jscs.info/);

```jshint``` -- проверяем кодстайл через [jshint](http://jshint.com/);

```csslint``` -- проверяем кодстайл через [csslint](http://csslint.net/);

```codestyle``` -- выполяет проверки jscs, jshint, csslint. Используется в качестве ```pre-commit hook```;

```test``` -- пока ничего не делает, потому что нет тестов, но в ближайшем времени они будут;

```server``` -- сборка проекта и запуск разработческого сервера. Проект будет доступен по адресу `http://localhost:3000`;

```serverOnly``` -- просто запуск разработческого сервера. 

После запуска разработческого сервера проект будет доступен по адресу `http://localhost:3000`.
Комбинация клавиш `Ctrl` + `C` или `⌘` + `C` (для MAC) в активном окне терминала остановит сервер.

Шорткаты вызываются в директории проекта следующим образом:
```bash
npm run %command_name%
``` 
`%command_name%` -- название шортката

## TODO
* Переписать `controllers/db`;
* Написать тесты;
* Интегрировать с CI;
* Сделать нормально логгирование;
* Добавить [Helmet](https://github.com/helmetjs/helmet);
* Добавить [Recluster](https://github.com/doxout/recluster);
* Добавить пример шаблонизации на клиенте.

## Полезные ссылки

* [Создаем свой проект на БЭМ](https://ru.bem.info/articles/start-with-project-stub/)
* [Собираем статическую страницу на БЭМ](https://ru.bem.info/tutorials/quick-start-static/)
* [Справочное руководство по BEMJSON](https://ru.bem.info/technology/bemjson/current/bemjson/)
* [Пошаговое руководство по i-bem.js](https://ru.bem.info/tutorials/bem-js-tutorial/)

## Полезные инструменты
* [borschik](https://ru.bem.info/tools/optimizers/borschik/) — простой, но мощный сборщик файлов текстовых форматов