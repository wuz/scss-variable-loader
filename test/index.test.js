import getVariables from "../src/getVariables";
import parseVariables from "../src/parseVariables";

describe("without comments", function () {
  const sass =
    "$gray-base: #000 !default;\n$gray-darker: lighten($gray-base, 13.5%) !default; // #222\n$gray-dark: lighten($gray-base, 20%) !default;  // #333\n$gray:  lighten($gray-base, 33.5%) !default; // #555\n$gray-light:  lighten($gray-base, 46.7%) !default; // #777\n$gray-lighter:  lighten($gray-base, 93.5%) !default; // #eee";
  const extracted = getVariables(sass);

  describe("getVariables()", function () {
    it("should return an array with 6 items", function () {
      expect(Array.isArray(extracted.variables)).toBe(true);
      expect(extracted.variables).toHaveLength(6);
    });
  });

  describe("parseVariables()", function () {
    it("should return an object with the key grayBase", function () {
      const result = parseVariables(extracted);
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty("grayBase");
    });
  });

  describe("parseVariables({ preserveVariableNames: true })", function () {
    it("should return an object with the key gray-base", function () {
      const result = parseVariables(extracted, { preserveVariableNames: true });
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty("gray-base");
    });
  });
});

describe("with array", () => {
  const sass = `
  $red: red;
  $blue: blue;
  $green: green;
  $base-colors: (
    'gray-0': $red,
    'gray-1': $blue,
    'gray-2': $green,
    'gray-3': hsla(187.5, 12.9%, 51.4%, 1)
  );
  $dark-mode-base-colors: (
    'gray-0': $red,
    'gray-1': $blue,
    'gray-2': $green,
    'gray-3': hsla(222, 21.7%, 18%, 1)
  );`;
  const extracted = getVariables(sass);

  describe("getVariables()", function () {
    it("should return an array with 2 items", function () {
      expect(Array.isArray(extracted.variables)).toBe(true);
      expect(extracted.variables).toHaveLength(5);
    });
  });

  describe("parseVariables()", function () {
    it("should return an object with the key one", function () {
      const result = parseVariables(extracted);
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty("baseColors");
    });
    it("should not return an object with the key y", function () {
      const result = parseVariables(extracted);
      expect(typeof result).toBe("object");
      expect(result).not.toHaveProperty("y");
    });
  });
});

describe("with comments", function () {
  const sass = `$one: 123;
$x: $one;
// $y: $two; // ERROR - $two not existed, but it's commented`;
  const extracted = getVariables(sass);

  describe("getVariables()", function () {
    it("should return an array with 2 items", function () {
      expect(Array.isArray(extracted.variables)).toBe(true);
      expect(extracted.variables).toHaveLength(2);
    });
  });

  describe("parseVariables()", function () {
    it("should return an object with the key one", function () {
      const result = parseVariables(extracted);
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty("one");
    });
    it("should not return an object with the key y", function () {
      const result = parseVariables(extracted);
      expect(typeof result).toBe("object");
      expect(result).not.toHaveProperty("y");
    });
  });
});

describe("with import", function () {
  const sass = `@import 'import/imported'; $test: $one;`;
  const extracted = getVariables(sass);

  describe("getVariables()", function () {
    it("should return an array with 1 items", function () {
      expect(Array.isArray(extracted.variables)).toBe(true);
      expect(extracted.variables).toHaveLength(1);
    });
  });

  describe("parseVariables()", function () {
    it("should return an object with the key one", function () {
      const result = parseVariables(extracted, { basePath: "test/" });
      expect(typeof result).toBe("object");
      expect(result).toHaveProperty("test");
    });
    it("should not return an object with the key y", function () {
      const result = parseVariables(extracted, { basePath: "test/" });
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
