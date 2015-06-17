# BEMongo-stub

## Why?

When I began to study methodology BEM and its tools, it was difficult to find any actual examples of project making.
To solve this problem, I wrote a small project that shows how to bring the data source (in this case [mongodb](http://www.mongodb.org/)) to the BEM-stack.

## What is BEMongo-stub?

It's a template repository to create your own [BEM](https://EN.bem.info/)-project with [mongodb](http://www.mongodb.org/).
It has the essential functionality, including the application framework to obtain & store data in [mongodb](http://www.mongodb.org/). Also I made user authorization using [OAuth 2.0 API Yandex](https://oauth.yandex.com/).

Used BEM-libraries for a project:

* [bem-core](https://github.com/bem/bem-core)
* [bem-components](https://github.com/bem/bem-components)

## Implementation features

* [Express](http://expressjs.com/) -- used for the proper project routing;
* [MongoDB](http://www.mongodb.org/) -- data storage (we'll take from here :) ). I used mongodb in conjunction with the [bluebird](https://github.com/petkaantonov/bluebird) promises;
* [ENB](http://enb-make.info/) -- a tool that builds the bundles;
* [Passport Yandex](https://github.com/gurugray/passport yandex) -- authentication in the project can be accomplished through [the OAuth 2.0 API Yandex](https://oauth.yandex.com/).

Essentially the project is divided into 2 parts:
* `server` -- the server part;
* `static` -- the blocks and the bundles of the pages. For the blocks implementation I used `priv.js`, because the data will be taken dynamically.

## Installation requirements

* [Node.js 0.10+](http://nodejs.org) is a software platform based on JavaScript that allows you to create fast, scalable network applications;
* [Git Bash](http://msysgit.github.io/) – for the Windows OS users.

## Setup

Clone the repository and install all the required dependencies:

```
git clone git@github.com:evilj0e/bemongo-stub.git my-bem-project
cd my-bem-project
npm run init # do Not use root (`root`) when you install npm and bower dependencies.
```

Bower dependencies are installed when you run `npm run init` to `/static/vendors`.

In order to use the OAuth 2.0 API by Yandex you need to get the Client ID & Client secret keys for your own app. You can do it [here](https://oauth.yandex.com/).
After that you need to change the config file for passport `server/lib/passport.js`:
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

You can build a project using [ENB](https://bem.info/tools/bem/enb-bem-techs/).
You can run commands enb from the folder `node_modules/.bin/enb` or you can use my shortcuts.

### Available shortcuts

```init``` -- initialization of the project and installation of all dependencies;

```jscs``` -- checks codestyle with [jscs](http://jscs.info/);

```jshint``` -- checks codestyle with [jshint](http://jshint.com/);

```csslint``` -- checks codestyle with [csslint](http://csslint.net/);

```codestyle``` -- executes checks with jscs, jshint, csslint. Used as ```pre-commit hook```;

```test``` -- it doesn’t make anything so far, because I haven’t written tests yet (lol);

```server``` -- builds project and runs a development server;

```serverOnly``` -- just runs a development server.

After running a development server, project will be available at `http://localhost:3000`.
Press the key combination `Ctrl` + `C` or `⌘` + `C` (for MAC) in the active terminal window to stop the server.

Shortcuts are invoked in the project folder as follows:
```bash
npm run %command_name%
```
`%command_name%` -- the name of the shortcut

## TODO
* To rewrite `controllers/db`;
* To remake authorization redirects from / to requested url & don't use forced authorization on some pages;
* To write tests;
* To make CI integration;
* To make the logging;
* To add the [Helmet](https://github.com/helmetjs/helmet);
* To add the [Recluster](https://github.com/doxout/recluster);
* To add an example of the block templating on the client.

## Useful links

* [Create your own BEM project](https://EN.bem.info/articles/start-with-project-stub/)
* [Collect static page on BEM](https://EN.bem.info/tutorials/quick-start-static/)
* [Reference BEMJSON](https://EN.bem.info/technology/bemjson/current/commands/)
* [Step by step guide to i-bem.js](https://EN.bem.info/tutorials/bem-js-tutorial/)

## Useful tools
* [borschik](https://EN.bem.info/tools/optimizers/borschik/) — a simple but powerful Builder for text-based file formats