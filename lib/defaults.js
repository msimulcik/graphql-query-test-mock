'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.defaultChangeServerResponseFn = exports.DEFAULT_CONFIG = void 0;
const DEFAULT_CONFIG = {
  matchOnVariables: true,
  persist: true
};
exports.DEFAULT_CONFIG = DEFAULT_CONFIG;

const defaultChangeServerResponseFn = (_, response) => response;

exports.defaultChangeServerResponseFn = defaultChangeServerResponseFn;
