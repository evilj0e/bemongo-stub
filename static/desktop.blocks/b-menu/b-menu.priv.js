module.exports = function (blocks) {
    blocks.declare('b-menu', function (data, page) {
        return [
            {
                block: 'b-menu',
                content: (function(){
                    return data.menu.map(function (item) {
                        return item && {
                            elem: 'item',
                            content: {
                                block: 'b-link',
                                mods: data.route.path === item.url ? { 'active': 'true' } : {},
                                content: item.title,
                                url: item.url
                            }
                        }
                    });
                })()
            }
        ];
    });
};