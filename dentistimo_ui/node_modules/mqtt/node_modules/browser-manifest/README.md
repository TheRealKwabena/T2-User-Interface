# browser-manifest

**An informal specification to describe the basic properties of a browser (in the broadest sense) as well as the features it wants and supports.** Includes some code for validating and normalizing a manifest.

[![npm status](http://img.shields.io/npm/v/browser-manifest.svg)](https://www.npmjs.org/package/browser-manifest)
[![node](https://img.shields.io/node/v/browser-manifest.svg)](https://www.npmjs.org/package/browser-manifest)
[![Travis](https://img.shields.io/travis/com/airtap/browser-manifest.svg)](https://travis-ci.com/airtap/browser-manifest)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Specification

### Example

```js
manifest = {
  name: 'chrome',
  version: '26',
  platform: 'windows 2012',
  title: 'Sauce Labs Google Chrome 26 on Windows 2012',
  wants: {
    tunnel: true
  },
  supports: {
    headless: false
  }
}
```

### Properties

#### `name`

Required, one of [`browser-names`](https://github.com/airtap/browser-names). Must be a non-empty, lowercase string.

#### `version`

Optional but recommended. If defined, it must be a non-empty string. Does not have to be fully qualified, as long as the version is unique among a set of browsers with the same properties. May also be a non-numeric prerelease version like "beta" or "dev". Examples:

- `6`
- `13.2`
- `11.00.18362.1` (IE)
- `80.0a1` (Firefox Nightly)
- `beta`

#### `title`

Optional but recommended. A string for display purposes, for humans to identify this browser among others. Examples:

- `Sauce Labs Google Chrome 27 on Mac 10.12`
- `Playwright Firefox`
- `System ie 11.00.18362.1`

#### `wants`

An optional object describing (airtap) features that a browser wants, by the following optional properties:

- `tunnel` (boolean): browser needs a tunnel to connect to local test server
- `loopback` (boolean): browser needs a hostname other than `localhost` in order to route 127.0.0.1 traffic through a tunnel.

#### `supports`

An optional object describing features supported by a browser, by the following optional properties:

- `headless` (boolean): browser can be configured to be headless (TBD: is this distinct from a root `headless` property that would indicate that the browser is always or never headless?)

#### `options`

An optional object with arbitrary properties that exists to customize the browser behavior. Define defaults here, to communicate available options. The `options` property is ignored in [`airtap-match-browsers`](https://github.com/airtap/match-browsers).

#### `provider`

Name of the [`browser-provider`](https://github.com/airtap/browser-provider) that provided this manifest. Not necessary to set, handled internally by Airtap 4.

### Additional properties

The manifest may contain additional properties not described here, including nested objects. Such properties can be used by whatever tool launches a browser and by [`airtap-match-browsers`](https://github.com/airtap/match-browsers) for more specific matching.

## API

### Usage

```js
const bm = require('browser-manifest')

// Validates and normalizes
const manifest = bm({
  name: 'chrome',
  version: '27'
})

// Adds a few defaults
console.log(manifest.wants) // {}
console.log(manifest.supports) // {}
console.log(manifest.options) // {}
```

### Install

With [npm](https://npmjs.org) do:

```
npm install browser-manifest
```

## License

[MIT](LICENSE.md) © 2020-present Airtap contributors.
