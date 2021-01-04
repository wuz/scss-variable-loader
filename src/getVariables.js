import stripComments from "strip-json-comments";

const VARIABLE_REGEX = /\$(.+):\s+(.+);?/;

const getVariables = (content) => {
  const variables = [];

  stripComments(content)
    .split("\n")
    .forEach((line) => {
      const variable = VARIABLE_REGEX.exec(line);
      if (!variable) return;

      const name = variable[1].trim();
      const value = variable[2].replace(/!default|!important/g, "").trim();

      variables.push({ name, value });
      return;
    });

  return variables;
};

export default getVariables;
