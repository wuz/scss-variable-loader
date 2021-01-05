import sass from "sass";
import fs from "fs";
import path from "path";
import camelCase from "lodash.camelcase";

const VARIABLE_MATCHER = /\.parsedValue\{value:(.*)\}/;

const parseValue = (value, content, basePath, includePaths = []) => {
  const parsed = sass
    .renderSync({
      data: `
  ${content}
  .parsedValue {
value: ${value};
  }
  `,
      includePaths,
      importer: [
        (url, prev) => {
          // handle imported files from basePath
          if (!basePath) return null;
          let filePath = `${path.resolve(basePath, url)}.scss`;
          const stats = fs.lstatSync(filePath);
          if (stats.isFile()) {
            const contents = fs.readFileSync(filePath, "utf-8");
            return {
              contents,
            };
          }
          return null;
        },
      ],
      outputStyle: "compressed",
    })
    .css.toString();
  const [, parsedValue] = VARIABLE_MATCHER.exec(parsed);
  return parsedValue;
};

const parseVariables = ({ variables, tree, content }, opts = {}) => {
  const { includePaths, preserveVariableNames, basePath } = opts;
  return variables
    .map((variable) => {
      const { name, value } = variable;
      if (typeof value === "object") {
        return {
          [preserveVariableNames ? name : camelCase(name)]: Object.entries(
            value
          ).reduce((acc, [valueName, valueValue]) => {
            return {
              ...acc,
              [preserveVariableNames
                ? valueName
                : camelCase(valueName)]: parseValue(
                valueValue,
                content,
                basePath,
                includePaths
              ),
            };
          }, {}),
        };
      }
      return {
        [preserveVariableNames ? name : camelCase(name)]: parseValue(
          value,
          content,
          basePath,
          includePaths
        ),
      };
    })
    .reduce((obj, value) => ({ ...obj, ...value }), {});
};

export default parseVariables;
