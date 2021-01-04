"use strict";

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _getVariables = _interopRequireDefault(require("./getVariables"));

var _parseVariables = _interopRequireDefault(require("./parseVariables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sassVariableLoader = function sassVariableLoader(content) {
  this.cacheable();

  var opts = _objectSpread({}, _loaderUtils["default"].getOptions(this));

  var variables = (0, _parseVariables["default"])((0, _getVariables["default"])(content), opts);
  return "module.exports = ".concat(JSON.stringify(variables));
};

module.exports = sassVariableLoader;