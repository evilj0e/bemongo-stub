# Bemongo-stub

## Why?

When I began to study [methodology BEM](https://EN.bem.info/) and its tools it was difficult to find any example of making the real project.

To solve this problem, I wrote a small project that shows how to bring the data source (in this case [mongodb](http://www.mongodb.org/)) to the BEM-stack.

## What is Bemongo-stub?

It's a template repository to create your own [BEM](https://EN.bem.info/)-project with [mongodb](http://www.mongodb.org/).
It includes the examples to obtain & store data in [mongodb](http://www.mongodb.org/), also I made user authorization using [OAuth 2.0 API Yandex](https://oauth.yandex.EN/).

Used BEM-libraries for a project:

* [bem-core](https://github.com/bem/bem-core)
* [bem-components](https://github.com/bem/bem-components)

## Features of the implementation

* [Express](http://expressjs.com/) -- used for the routing of the project;
* [MongoDB](http://www.mongodb.org/) -- data storage (here we'll take :) ). I used mongodb in conjunction with the promises [bluebird](https://github.com/petkaantonov/bluebird);
* [ENB](http://enb-make.info/) -- tool that make builds of the bundles;
* [Passport Yandex](https://github.com/gurugray/passport yandex) -- authentication in the project through the [OAuth 2.0 API Yandex](https://oauth.yandex.com/).

Essentially the project is divided into 2 parts:
* `server` -- the server part;
* `static` -- the blocks and the bundles of the pages.
For implementation of the blocks I used `priv.js`, because the data will be taken dynamically.

## Installation requirements

* [Node.js 0.10+](http://nodejs.org) is a software platform based on JavaScript that allows you to create fast, scalable network applications;
* [Git Bash](http://msysgit.github.io/) – for users of the Windows operating system.

## Set

Clone the repository and install all the required dependencies:

```
git clone git@github.com:evilj0e/bemongo-stub.git my-bem-project
cd my-bem-project
npm run init # do Not use root (`root`) when you install npm and bower dependencies.
```

bower dependencies are installed when you run `npm run init` folder to `/static/vendors`.

For using the OAuth 2.0 API from Yandex you need to get the Client ID & Client secret keys for your own app. You can made that [here](https://oauth.yandex.com/).
After that you need change the config file for passport `server/lib/passport.js`:
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

## Build and run the project

Build project using [ENB](https://bem.info/tools/bem/enb-bem-techs/).
Calling all teams `enb` possible hand from the folder `node_modules/.bin/enb` or you can use prepared by me shortcuts.

### Available shortcuts

```init``` -- initialization of the project and install all dependencies.

```jscs``` -- check codestyle with [jscs](http://jscs.info/);

```jshint``` -- check codestyle with [jshint](http://jshint.com/);

```csslint``` -- check codestyle with [csslint](http://csslint.net/);

```codestyle``` -- executes checks with jscs, jshint, csslint. Used as ```pre-commit hook```;

```test``` -- while doing nothing, because I don't wrote tests yet (lol);

```server``` -- build project and run a development server.;

```serverOnly``` -- just run a development server.

After running a development server project will be available at the address `http://localhost:3000`.
Press the key combination `Ctrl` + `C` or `⌘` + `C` (for MAC) in the active terminal window to stop the server.

Shortcuts are invoked in the project folder as follows:
```bash
npm run %command_name%
```
`%command_name%` -- the name of the shortcut

## TODO
* Overwrite `controllers/db`;
* Remake redirects on authorization from / to requested url & don't use forced authorization on some pages;
* Write tests;
* Make CI integration;
* Make the logging;
* Add the [Helmet](https://github.com/helmetjs/helmet);
* Add the [Recluster](https://github.com/doxout/recluster);
* Add an example of the block templating on the client.

## Useful links

* [Create your own BEM project](https://EN.bem.info/articles/start-with-project-stub/)
* [Collect static page on BEM](https://EN.bem.info/tutorials/quick-start-static/)
* [Reference BEMJSON](https://EN.bem.info/technology/bemjson/current/commands/)
* [Step by step guide to i-bem.js](https://EN.bem.info/tutorials/bem-js-tutorial/)

## Useful tools
* [borschik](https://EN.bem.info/tools/optimizers/borschik/) — a simple but powerful Builder for text-based file formats