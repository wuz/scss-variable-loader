const webpack = require("webpack");
const path = require("path");

const pathToLoader = path.resolve(__dirname, "../src/index.js");
const pathToTestBundle = path.resolve(__dirname, "./output/test.bundle.js");

const load = (filename, options) => {
  return new Promise((resolve, reject) => {
    webpack(
      {
        entry: filename,
        context: __dirname,
        mode: "development",
        module: {
          rules: [
            {
              test: /.scss$/,
              loader: pathToLoader,
              options,
            },
          ],
        },
        output: {
          path: path.join(__dirname, "output"),
          filename: "test.bundle.js",
          libraryTarget: "commonjs2",
        },
      },
      (err, stats) => {
        if (err) reject(err);
        resolve(stats);
      }
    );
  }).then((stats) => {
    if (stats.hasErrors()) {
      stats.compilation.errors[0].stats = stats;
      throw stats.compilation.errors[0];
    }
    if (stats.hasWarnings()) {
      stats.compilation.warnings[0].stats = stats;
      throw stats.compilation.warnings[0];
    }

    delete require.cache[pathToTestBundle];
    const compiled = require(pathToTestBundle);

    return { compiled, stats };
  });
};

describe("with relative import", function () {
  describe("getVariables()", function () {
    it("should return an array with 2 items", function () {
      return load("./relative-import.scss").then((results) => {
        const { compiled, stats } = results;
        console.log(compiled);
      });
      // expect(Array.isArray(extracted.variables)).toBe(true);
      // expect(extracted.variables).toHaveLength(3);
    });
  });

  // describe("parseVariables()", function () {
  //   it("should return an object with the key one", function () {
  //     const result = parseVariables(extracted, { basePath: "test/" });
  //     console.log(result);
  //     expect(typeof result).toBe("object");
  //     expect(result).toHaveProperty("test");
  //     expect(result).toHaveProperty("test2");
  //     expect(result).toHaveProperty("test3");
  //   });
  //   it("should not return an object with the key y", function () {
  //     const result = parseVariables(extracted, { basePath: "test/" });
  //     expect(typeof result).toBe("object");
  //     expect(result).not.toHaveProperty("y");
  //   });
  // });
});
