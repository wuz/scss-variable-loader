import getVariables from "../src/getVariables";
import parseVariables from "../src/parseVariables";

describe("without comments", function () {
  const sass =
    "$gray-base: #000 !default;\n$gray-darker: lighten($gray-base, 13.5%) !default; // #222\n$gray-dark: lighten($gray-base, 20%) !default;  // #333\n$gray:  lighten($gray-base, 33.5%) !default; // #555\n$gray-light:  lighten($gray-base, 46.7%) !default; // #777\n$gray-lighter:  lighten($gray-base, 93.5%) !default; // #eee";
  const variables = getVariables(sass);

  describe("getVariables()", function () {
    it("should return an array with 6 items", function () {
      expect(Array.isArray(variables)).toBe(true);
      expect(variables).toHaveLength(6);
    });
  });

  describe("parseVariables()", function () {
    it("should return an object with the key grayBase", function () {
      const result = parseVariables(variables);
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty("grayBase");
    });
  });

  describe("parseVariables({ preserveVariableNames: true })", function () {
    it("should return an object with the key gray-base", function () {
      const result = parseVariables(variables, { preserveVariableNames: true });
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty("gray-base");
    });
  });
});

describe("with comments", function () {
  const sass = `$one: 123;
$x: $one;
// $y: $two; // ERROR - $two not existed, but it's commented`;
  const variables = getVariables(sass);

  describe("getVariables()", function () {
    it("should return an array with 2 items", function () {
      expect(Array.isArray(variables)).toBe(true);
      expect(variables).toHaveLength(2);
    });
  });

  describe("parseVariables()", function () {
    it("should return an object with the key one", function () {
      const result = parseVariables(variables);
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty("one");
    });
    it("should not return an object with the key y", function () {
      const result = parseVariables(variables);
      expect(typeof result).toBe("object");
      expect(result).not.toHaveProperty("y");
    });
  });
});

describe("empty file", function () {
  describe("getVariables()", function () {
    function testFn() {
      const sass = "";
      return parseVariables(getVariables(sass));
    }

    it("should not throw", function () {
      expect(testFn).not.toThrow(TypeError);
    });

    it("should be an empty object", function () {
      const variables = testFn();
      expect(typeof variables).toBe("object");
      expect(Object.keys(variables)).toHaveLength(0);
    });
  });
});
