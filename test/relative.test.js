import getVariables from "../src/getVariables";
import parseVariables from "../src/parseVariables";

describe("with relative import", function () {
  const sass = `@import './import/imported';`;
  const extracted = getVariables(sass);

  describe("getVariables()", function () {
    it("should return an array with 2 items", function () {
      expect(Array.isArray(extracted.variables)).toBe(true);
      expect(extracted.variables).toHaveLength(3);
    });
  });

  describe("parseVariables()", function () {
    it("should return an object with the key one", function () {
      const result = parseVariables(extracted, { basePath: "test/" });
      console.log(result);
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty("test");
      expect(result).toHaveProperty("test2");
      expect(result).toHaveProperty("test3");
    });
    it("should not return an object with the key y", function () {
      const result = parseVariables(extracted, { basePath: "test/" });
      expect(typeof result).toBe("object");
      expect(result).not.toHaveProperty("y");
    });
  });
});
