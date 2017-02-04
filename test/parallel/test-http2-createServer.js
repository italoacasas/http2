'use strict';

const common = require('../common');
const assert = require('assert');
const http2 = require('http2');

const object = {
  domain: null,
  _events: {},
  _eventsCount: 2,
  _maxListeners: undefined,
  _connections: 0,
  _handle: null,
  _usingSlaves: false,
  _slaves: [],
  _unref: false,
  allowHalfOpen: false,
  pauseOnConnect: false,
  timeout: 120000
}

// Handler (callback) is required.
assert.throws( () => {
    http2.createServer()
  }, /TypeError: handler must be a function/
);

const server = http2.createServer(() => {});
const server1 = http2.createServer({}, () => {});

console.log(server)
console.log(object)

