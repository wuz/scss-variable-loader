import stripComments from "strip-json-comments";
import sass from "sass";
import { parse } from "gonzales-pe";

const VARIABLE_REGEX = /\$(.+):\s+(.+);/;

const getVariables = (content, opts = {}) => {
  const variables = [];

  console.log(content, opts);

  const tree = parse(content, { syntax: "scss" });

  const rendered = sass.renderSync({ data: content });

  console.log(rendered);

  tree.eachFor((child) => {
    if (child.type === "atrule") {
      const atkeyword = child.get(0);
      if (atkeyword.first("ident").content === "import") {
        const file = child.first("string");
        console.log(file);
      }
    }
  });

  // tree.children.forEach((node) => {
  //   if (node.type !== "declaration") return;
  //   const { name, value } = node.toJson();
  //   if (!name || !value) return;
  //   variables.push({ name, value });
  // });

  // return { variables, tree, content };
};

export default getVariables;
