'use strict';

const common = require('../common');
const assert = require('assert');
const http2 = require('http2');

// Handler (callback) is required.
assert.throws(() => {
    http2.createServer()
  }, /TypeError: handler must be a function/
);

/**
 * createServer() accepts two params
 * but only the callback is required.
 */
assert.doesNotThrow(() => {
  http2.createServer(() => {})
  http2.createServer({}, () => {})
});

const server = http2.createServer((stream, headers) => {
  console.log('stream', stream);
  console.log('header', headers);
});

server.emit('request', () => {
  console.log('request')
});

assert.strictEqual(server.domain, null);
assert.strictEqual(server.allowHalfOpen, false);
assert.strictEqual(server.pauseOnConnect, false);
assert.strictEqual(server.timeout, 120000);

server.listen(8080, common.mustCall(() => {
  console.log('listening')
}));

server.on('close', common.mustCall(() => {}));
