module.exports = function(config) {
    config.setLanguages(["ru"]);

    config.nodes('*.bundles/*');

    config.mode("development", function() {
        config.nodeMask(/desktop.bundles\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                [
                    require("./enb/techs/priv"),
                    {
                        'mode': 'development'
                    }
                ],
                [ require("enb/techs/file-copy"), { sourceTarget: "?.{lang}.js", destTarget: "_?.{lang}.js" } ],
                [ require("enb/techs/file-copy"), { sourceTarget: "?.css", destTarget: "_?.css" } ],
                [ require("enb/techs/file-copy"), { sourceTarget: "?.ie6.css", destTarget: "_?.ie6.css" } ],
                [ require("enb/techs/file-copy"), { sourceTarget: "?.ie7.css", destTarget: "_?.ie7.css" } ],
                [ require("enb/techs/file-copy"), { sourceTarget: "?.ie8.css", destTarget: "_?.ie8.css" } ],
                [ require("enb/techs/file-copy"), { sourceTarget: "?.ie9.css", destTarget: "_?.ie9.css" } ]
            ]);
        });
    });
    config.mode("production", function() {
        config.nodeMask(/desktop.bundles\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                [
                    require("./enb/techs/priv"),
                    {
                        'mode': 'production'
                    }
                ],
                [ require("enb/techs/borschik"), { sourceTarget: "?.{lang}.js", destTarget: "_?.{lang}.js", minify: true, freeze: true } ],
                [ require("enb/techs/borschik"), { sourceTarget: "?.css", destTarget: "_?.css", minify: true, freeze: true } ],
                [ require("enb/techs/borschik"), { sourceTarget: "?.ie6.css", destTarget: "_?.ie6.css", minify: true, freeze: true } ],
                [ require("enb/techs/borschik"), { sourceTarget: "?.ie7.css", destTarget: "_?.ie7.css", minify: true, freeze: true } ],
                [ require("enb/techs/borschik"), { sourceTarget: "?.ie8.css", destTarget: "_?.ie8.css", minify: true, freeze: true } ],
                [ require("enb/techs/borschik"), { sourceTarget: "?.ie9.css", destTarget: "_?.ie9.css", minify: true, freeze: true } ]
            ]);
        });
    });

    config.nodeMask(/desktop.bundles\/.*/, function(nodeConfig) {
        function getLevels() {
            return [
                {"path":"vendors/bem-bl/blocks-common","check":false},
                {"path":"vendors/bem-bl/blocks-desktop","check":false},
                
                {"path":"vendors/bem-components/common.blocks","check":false},
                {"path":"vendors/bem-components/desktop.blocks","check":false},

                {"path":"desktop.blocks","check":true}
            ].map(function(l) { return config.resolvePath(l); });
        }

        nodeConfig.addTechs([
            [ require("enb/techs/levels"), { levels: getLevels() } ],
            [ require("enb/techs/file-provider"), { target: "?.bemdecl.js" } ],
            require("enb/techs/deps-old"),
            require("enb/techs/files"),
            [ require('enb-xjst/techs/bemhtml'), { devMode: false } ],
            [ require("./enb/techs/priv-i18n"), { lang: "{lang}" } ],
            [ require("enb/techs/i18n-merge-keysets"), { lang: "all" }],
            [ require("enb/techs/i18n-merge-keysets"), { lang: "{lang}" }],
            [ require("enb/techs/i18n-lang-js"), { lang: "all" } ],
            [ require("enb/techs/i18n-lang-js"), { lang: "{lang}" } ],
            require('enb/techs/js'),
            [ require("./enb/techs/js-i18n"), { lang: "{lang}" } ],
            require("enb/techs/css"),
            [ require("enb/techs/css-ie6"), { sourceSuffixes: ['css', 'ie.css', 'ie6.css'] }],
            [ require("enb/techs/css-ie7"), { sourceSuffixes: ['css', 'ie.css', 'ie7.css'] }],
            [ require("enb/techs/css-ie8"), { sourceSuffixes: ['css', 'ie.css', 'ie8.css'] }],
            [ require("enb/techs/css-ie9"), { sourceSuffixes: ['css', 'ie9.css'] }]
        ]);
        nodeConfig.addTargets(["_?.{lang}.js", "?.priv.js", "?.priv.{lang}.js", "?.bemhtml.js", "_?.css", "_?.ie6.css", "_?.ie7.css", "_?.ie8.css", "_?.ie9.css"]);
    });
};
