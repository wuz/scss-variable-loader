import stripComments from "strip-json-comments";
import { parse, jsonify } from "sast";

const VARIABLE_REGEX = /\$(.+):\s+(.+);/;

const getVariables = (content) => {
  const variables = [];

  const tree = parse(stripComments(content), { syntax: "scss" });

  tree.children.forEach((node) => {
    if (node.type !== "declaration") return;
    const { name, value } = jsonify(node);
    if (!name || !value) return;
    variables.push({ name, value });
  });

  return { variables, tree, content };
};

export default getVariables;
