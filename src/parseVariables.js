import sass from "sass";
import camelCase from "lodash.camelcase";

const constructSassString = (variables) => {
  const asVariables = variables
    .map((variable) => `$${variable.name}: ${variable.value};`)
    .join("\n");
  const asClasses = variables
    .map((variable) => `.${variable.name} { value: ${variable.value} }`)
    .join("\n");

  return `${asVariables}\n${asClasses}`;
};

const parseVariables = (variables, opts = {}) => {
  const result = sass
    .renderSync({
      data: constructSassString(variables),
      outputStyle: "compressed",
    })
    .css.toString()
    .replace(/}/g, " }\n")
    .replace(/{/g, " { ");

  const { preserveVariableNames } = opts;

  const parsedVariables = result.split(/\n/).reduce((obj, line) => {
    if (!line || line.length === 0) return obj;
    const [, name, value] = /\.(.+) { value:(.+) }/.exec(line);
    if (preserveVariableNames) {
      return { ...obj, [name]: value };
    }
    return { ...obj, [camelCase(name)]: value };
  }, {});

  return parsedVariables;
};

export default parseVariables;
