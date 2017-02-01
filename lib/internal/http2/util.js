'use strict';

const linkedList = require('internal/linkedlist');

function isIllegalConnectionSpecificHeader(name, value) {
  switch (name) {
    case 'connection':
    case 'upgrade':
    case 'http2-settings':
      return true;
    case 'te':
      return value === 'trailers';
    default:
      return false;
  }
}

function assertIllegalConnectionSpecificHeader(name, value, ctor) {
  if (isIllegalConnectionSpecificHeader(name, value)) {
    var err = new Error('HTTP/1 Connection specific headers are forbidden');
    Error.captureStackTrace(err, ctor);
    throw err;
  }
}

function assertEmptyHeaderName(name) {
  if (name.length === 0) {
    var err = new Error('HTTP header names must not be empty strings');
    Error.captureStackTrace(err, assertEmptyHeaderName);
    throw err;
  }
}

function mapToHeaders(map) {
  var keys = Object.keys(map);
  var size = keys.length;
  for (var i = 0; i < keys.length; i++) {
    if (Array.isArray(keys[i])) {
      size += keys[i].length - 1;
    }
  }
  var ret = Array(size);
  var c = 0;
  var val;

  for (i = 0; i < keys.length; i++) {
    var key = String(keys[i]);
    var value = map[key];
    assertEmptyHeaderName(key);
    if (key[0] === ':') {
      if (Array.isArray(value)) {
        if (value.length > 1)
          throw new TypeError('HTTP/2 pseudo-headers must have a single value');
        value = value[0];
      }
      val = String(value);
      assertIllegalConnectionSpecificHeader(key, val, mapToHeaders);
      ret.unshift([key, val]);
      ret.pop();
      c++;
    } else {
      if (Array.isArray(value) && value.length > 0) {
        for (var k = 0; k < value.length; k++) {
          val = String(value[k]);
          assertIllegalConnectionSpecificHeader(key, val, mapToHeaders);
          ret[c++] = [key, val];
        }
      } else {
        val = String(value);
        assertIllegalConnectionSpecificHeader(key, val, mapToHeaders);
        ret[c++] = [key, val];
      }
    }
  }
  return ret;
}

function llistToHeaders(list, count) {
  var ret = [];
  while (!linkedList.isEmpty(list)) {
    var item = linkedList.shift(list);
    ret.push([item[0], item[1], item[2]]);
  }
  return ret;
}

module.exports = {
  mapToHeaders,
  isIllegalConnectionSpecificHeader,
  llistToHeaders
};

