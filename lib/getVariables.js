"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stripJsonComments = _interopRequireDefault(require("strip-json-comments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var VARIABLE_REGEX = /\$(.+):\s+(.+);?/;

var getVariables = function getVariables(content) {
  var variables = [];
  (0, _stripJsonComments["default"])(content).split("\n").forEach(function (line) {
    var variable = VARIABLE_REGEX.exec(line);
    if (!variable) return;
    var name = variable[1].trim();
    var value = variable[2].replace(/!default|!important/g, "").trim();
    variables.push({
      name: name,
      value: value
    });
    return;
  });
  return variables;
};

var _default = getVariables;
exports["default"] = _default;