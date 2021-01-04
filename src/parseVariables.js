import sass from "sass";
import camelCase from "lodash.camelcase";

const VARIABLE_MATCHER = /\.parsedValue\{value:(.*)\}/;

const parseValue = (value, content) => {
  const parsed = sass
    .renderSync({
      data: `
  ${content}
  .parsedValue {
value: ${value};
  }
  `,
      outputStyle: "compressed",
    })
    .css.toString();
  const [, parsedValue] = VARIABLE_MATCHER.exec(parsed);
  return parsedValue;
};

const parseVariables = ({ variables, tree, content }, opts = {}) => {
  return variables
    .map((variable) => {
      const { name, value } = variable;
      if (typeof value === "object") {
        return {
          [opts.preserveVariableNames ? name : camelCase(name)]: Object.entries(
            value
          ).reduce((acc, [valueName, valueValue]) => {
            return {
              ...acc,
              [opts.preserveVariableNames
                ? valueName
                : camelCase(valueName)]: parseValue(valueValue, content),
            };
          }, {}),
        };
      }
      return {
        [opts.preserveVariableNames ? name : camelCase(name)]: parseValue(
          value,
          content
        ),
      };
    })
    .reduce((obj, value) => ({ ...obj, ...value }), {});
};

export default parseVariables;
