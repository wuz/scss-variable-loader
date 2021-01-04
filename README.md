# SCSS variable loader from webpack

[![npm version](https://img.shields.io/npm/v/scss-variable-loader)](https://npmjs.org/package/scss-variable-loader)

> Parses your SCSS variables and returns them as an object. Supports SCSS functions like lighten, darken, mix, etc.

**Input:**

```scss
$gray-base: #000 !default;
$gray-darker: lighten($gray-base, 13.5%) !default; // #222
$gray-dark: lighten($gray-base, 20%) !default; // #333
$gray: lighten($gray-base, 33.5%) !default; // #555
$gray-light: lighten($gray-base, 46.7%) !default; // #777
$gray-lighter: lighten($gray-base, 93.5%) !default; // #eee
```

**Result:**

```json
{
  "grayBase": "#000",
  "grayDarker": "#222222",
  "grayDark": "#333333",
  "gray": "#555555",
  "grayLight": "#777777",
  "grayLighter": "#eeeeee"
}
```

## Installation

`npm install --save-dev scss-variable-loader`
or
`yarn add -D scss-variable-loader`

## Usage

```js
import variables from "scss-variable-loader!./_variables.scss";
// => returns all the variables in _variables.scss as an object with each variable name camelCased
```

**Note:** If you've already defined loaders for Sass files in the configuration, you can override the loader order by writing !!scss-variable-loader!./\_variables.scss to disable all loaders specified in the configuration for that module request.

## Options

You can pass options to the loader via [query parameters](http://webpack.github.io/docs/using-loaders.html#query-parameters).

```js
import variables from "sass-variable-loader?preserveVariableNames!./_variables.scss";
// => returns all the variables in _variables.scss as an object with each variable name left intact
```

## Credit

Built by [wuz](https://wuz.sh)
Based on [SASS Variable Loader](https://github.com/nordnet/sass-variable-loader)
