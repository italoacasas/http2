'use strict';

require('../common.js');
const assert = require('assert');
const http2 = require('http2');

assert.strictEqual(typeof http2.getDefaultSettings, 'function');
assert.strictEqual(typeof http2.getPackedSettings, 'function');
assert.strictEqual(typeof http2.createServer, 'function');
assert.strictEqual(typeof http2.createSecureServer, 'function');
assert.strictEqual(typeof http2.createServerSession, 'function');
assert.strictEqual(typeof http2.createClientSession, 'function');
