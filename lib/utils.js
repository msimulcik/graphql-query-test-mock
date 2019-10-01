'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getQueryMockID = getQueryMockID;
exports.getVariables = getVariables;
exports.createMockGraphQLRecord = createMockGraphQLRecord;

var _objectHash = _interopRequireDefault(require('object-hash'));

var _defaults = require('./defaults');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function getQueryMockID(
  queryName,
  variables,
  ignoreThesePropertiesInVariables
) {
  const processedVariables = getVariables(
    variables,
    ignoreThesePropertiesInVariables
  );
  return `${queryName}__${_objectHash.default.sha1(processedVariables)}`;
}

function getVariables(variables, ignoreThesePropertiesInVariables) {
  const vars = _objectSpread({}, variables);

  ignoreThesePropertiesInVariables.forEach(propName => {
    delete vars[propName];
  });
  return vars;
}

function createMockGraphQLRecord(config, resolveQueryPromise) {
  const queryMockConfig = _objectSpread(
    {
      variables: {}
    },
    _defaults.DEFAULT_CONFIG,
    {},
    config
  );

  let ignoreThesePropertiesInVariables =
    queryMockConfig.ignoreThesePropertiesInVariables || [];

  if (!queryMockConfig.matchOnVariables && !queryMockConfig.matchVariables) {
    ignoreThesePropertiesInVariables = Object.keys(
      queryMockConfig.variables || {}
    );
  }

  return {
    id: getQueryMockID(
      queryMockConfig.name,
      queryMockConfig.variables,
      ignoreThesePropertiesInVariables
    ),
    queryMockConfig: _objectSpread({}, queryMockConfig, {
      ignoreThesePropertiesInVariables
    }),
    resolveQueryPromise
  };
}
