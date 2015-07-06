var path = require('path'),
    recluster = require('recluster'),
    config   = require('./configs/default');

process.env.NODE_ENV = config.recluster.environment;

module.exports = function() {
    process.on('SIGUSR2', function () {
        console.info('[master] Got SIGUSR2, reloading cluster...');
        cluster.reload();
    });

    var cluster = recluster(path.join(__dirname, 'worker.js'), {
        workers: config.recluster.workers
    });

    cluster.on('exit', function (worker) {
        if (worker.process.exitCode) {
            console.log('[%s] Worker died (exit code: %s)',
                worker.process.pid,
                worker.process.exitCode);
        }
    });

    cluster.on('disconnect', function (worker) {
        console.log('[%s] Worker disconnected',
            worker.process.pid);
    });

    cluster.run();

    console.log('[master] Spawned cluster, kill -s SIGUSR2', process.pid, 'to reload');
};
