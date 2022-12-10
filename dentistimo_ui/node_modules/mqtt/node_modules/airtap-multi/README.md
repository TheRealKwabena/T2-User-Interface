# airtap-multi

**Use multiple [browser providers](https://github.com/airtap/browser-provider) as one.**

[![npm status](http://img.shields.io/npm/v/airtap-multi.svg)](https://www.npmjs.org/package/airtap-multi)
[![node](https://img.shields.io/node/v/airtap-multi.svg)](https://www.npmjs.org/package/airtap-multi)
[![Travis build status](https://img.shields.io/travis/com/airtap/multi.svg?label=travis)](http://travis-ci.com/airtap/multi)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

```js
const Multi = require('airtap-multi')
const multi = new Multi()

multi.add('airtap-playwright')
multi.add('airtap-sauce')

// Get manifests with name 'firefox'
const manifests = await multi.manifests([{
  name: 'firefox'
}])

// Only from the airtap-sauce provider
const manifests = await multi.manifests([{
  name: 'firefox',
  provider: 'airtap-sauce'
}])

// Instantiate a browser (see browser-provider for details)
const browser = multi.browser(manifest, target)
```

## API

### `multi = new Multi()`

Implements the [`browser-provider`](https://github.com/airtap/browser-provider) interface with a few additional methods.

### `multi.add(id[, options])`

Add a provider that's been installed in a nearby `node_modules`. The optional `options` object will be passed to the provider's constructor.

### `multi.add(object[, options])`

Add multiple providers in the form of `{ [id]: options }`:

```js
multi.add({
  'airtap-sauce': {
    username: 'example',
    key: 'secret'
  }
})
```

If the second `options` argument is provided, those options will be deeply merged into the options of each provider.

### `multi.add(fn[, options])`

Add a provider as a constructor function.

### `multi.add(array[, options])`

Add multiple providers using an array, where each array element is of the above types (string, object or function).

### `provider = multi.get(id)`

Get an added provider by its id.

### `iterator = multi[Symbol.iterator]()`

```js
for (const [id, provider] of multi) {
  // ..
}
```

### `iterator = multi.keys()`

```js
for (const id of multi.keys()) {
  // ..
}
```

### `iterator = multi.values()`

```js
for (const provider of multi.values()) {
  // ..
}
```

## Install

With [npm](https://npmjs.org) do:

```
npm install airtap-multi
```

## License

[MIT](LICENSE.md) © 2020-present Airtap contributors
