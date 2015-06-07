module.exports = function (bh) {
    bh.match('b-link', function (ctx, json) {
        ctx
            .tag('a')
            .attr('href', json.url);
    });
};
