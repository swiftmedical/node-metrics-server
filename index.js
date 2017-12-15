
var http = require('http');
var metrics = require('prom-client')
var log = require('@swiftmedical/log');

metrics.collectDefaultMetrics({ timeout: process.env.METRIC_INTERVAL || 5000 });

let server = http.createServer(function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; version=0.0.4');
  res.end(metrics.register.metrics());
});

module.exports.start = function (port) {
  server.listen(port, '0.0.0.0', function () {
    log.info("Metrics Server running at http://0.0.0.0:" + port);
  });
}
