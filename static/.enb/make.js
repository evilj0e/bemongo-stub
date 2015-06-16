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
                [ require("enb/techs/file-copy"), { sourceTarget: "?.css", destTarget: "_?.css" } ]
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
                [ require("enb/techs/borschik"), { sourceTarget: "?.css", destTarget: "_?.css", minify: true, freeze: true } ]
            ]);
        });
    });

    config.nodeMask(/desktop.bundles\/.*/, function(nodeConfig) {
        function getLevels() {
            return [
                {"path":"libs/bem-core/common.blocks","check":false},
                {"path":"libs/bem-core/desktop.blocks","check":false},

                {"path":"libs/bem-components/common.blocks","check":false},
                {"path":"libs/bem-components/desktop.blocks","check":false},

                {"path":"desktop.blocks","check":true}
            ].map(function(l) { return config.resolvePath(l); });
        }

        nodeConfig.addTechs([
            [ require("enb/techs/levels"), { levels: getLevels() } ],
            [ require("enb/techs/file-provider"), { target: "?.bemdecl.js" } ],
            require("enb/techs/deps-old"),
            require("enb/techs/files"),
            [ require("./enb/techs/priv-i18n"), { lang: "{lang}" } ],
            [ require("enb/techs/i18n-merge-keysets"), { lang: "all" }],
            [ require("enb/techs/i18n-merge-keysets"), { lang: "{lang}" }],
            [ require("enb/techs/i18n-lang-js"), { lang: "all" } ],
            [ require("enb/techs/i18n-lang-js"), { lang: "{lang}" } ],
            require('enb/techs/js'),
            [ require("./enb/techs/js-i18n"), { lang: "{lang}" } ],
            require("enb/techs/css")
        ]);
        nodeConfig.addTargets(["_?.{lang}.js", "?.priv.js", "?.priv.{lang}.js", "_?.css"]);
    });
};
