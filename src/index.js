import loaderUtils from "loader-utils";
import getVariables from "./getVariables";
import parseVariables from "./parseVariables";

const sassVariableLoader = function (content) {
  this.cacheable();
  const opts = {
    ...loaderUtils.getOptions(this),
  };
  const variables = parseVariables(getVariables(content), opts);
  return `module.exports = ${JSON.stringify(variables)}`;
};

module.exports = sassVariableLoader;
