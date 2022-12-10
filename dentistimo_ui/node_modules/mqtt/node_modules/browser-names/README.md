# browser-names

> **Get the alternative names of a browser.**  
> Includes names used in `browserslist`, `airtap`, `testling`, sauce labs, `karma`, `win-detect-browsers` and `@httptoolkit/browser-launcher`.

[![npm status](http://img.shields.io/npm/v/browser-names.svg)](https://www.npmjs.org/package/browser-names)
[![node](https://img.shields.io/node/v/browser-names.svg)](https://www.npmjs.org/package/browser-names)
[![Travis](https://img.shields.io/travis/com/airtap/browser-names.svg)](https://travis-ci.com/airtap/browser-names)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

```js
const names = require('browser-names')
```

Get an array of alternative names:

```js
names('ff') // ['firefox', 'mozilla firefox', ..]
names('firefox') // same
```

Get a common name to use as your main identifier, by any name:

```js
names.common('internet explorer') // 'ie'
names.common('ie') // same
```

Get the title of a browser, by any name:

```js
names.title('and_chr') // 'Google Chrome for Android'
names.title('ios safari') // 'iOS Safari'
```

All functions are case- and casing-insensitive. Their output is lowercase (except for titles). PRs for additional browsers are welcome.

## Install

With [npm](https://npmjs.org) do:

```
npm install browser-names
```

## License

[MIT](LICENSE.md) © 2020-present Vincent Weevers
