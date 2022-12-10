# airtap-default

**Default [browser provider](https://github.com/airtap/browser-provider). Opens the default browser on your machine.**

[![npm status](http://img.shields.io/npm/v/airtap-default.svg)](https://www.npmjs.org/package/airtap-default)
[![node](https://img.shields.io/node/v/airtap-default.svg)](https://www.npmjs.org/package/airtap-default)
[![Travis build status](https://img.shields.io/travis/com/airtap/default.svg?label=travis)](http://travis-ci.com/airtap/default)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

## Usage

### Programmatic

```js
const Default = require('airtap-default')
const provider = new Default()

// Get a list of desired browsers (there's just 1 here)
const wanted = [{ name: 'default' }]
const manifests = await provider.manifests(wanted)

// Instantiate a browser
const target = { url: 'http://localhost:3000' }
const browser = provider.browser(manifests[0], target)

await browser.open()
```

### With [Airtap](https://github.com/airtap/airtap)

```yaml
providers:
  - airtap-default

browsers:
  - name: default
```

## API

### `Default()`

Constructor. Returns an instance of [`browser-provider`](https://github.com/airtap/browser-provider).

## Install

With [npm](https://npmjs.org) do:

```
npm install airtap-default
```

## License

[MIT](LICENSE) © 2020-present Airtap contributors
