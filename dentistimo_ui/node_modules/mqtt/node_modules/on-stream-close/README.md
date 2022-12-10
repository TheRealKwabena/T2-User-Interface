# on-stream-close

**Callback when a stream has closed.** Alternative to [`stream.finished`](https://nodejs.org/api/stream.html#stream_stream_finished_stream_options_callback) and its predecessor [`end-of-stream`](https://github.com/mafintosh/end-of-stream) that utilize other events (like `end` and `finish`) which makes them compatible with older streams but they can't guarantee the stream has fully cleaned up its resources.

[![npm status](http://img.shields.io/npm/v/on-stream-close.svg)](https://www.npmjs.org/package/on-stream-close)
[![node](https://img.shields.io/node/v/on-stream-close.svg)](https://www.npmjs.org/package/on-stream-close)
[![Travis build status](https://img.shields.io/travis/com/vweevers/on-stream-close.svg?label=travis)](http://travis-ci.com/vweevers/on-stream-close)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

```js
const osc = require('on-stream-close')

osc(stream, function (err) {
  // Stream has closed
})
```

With promises:

```js
const osc = require('on-stream-close').promises

await osc(stream)
```

## Compatible stream flavors

- [`stream`](https://nodejs.org/api/stream.html): node >= 14.0.0 or >= 10.16.0 if `autoDestroy` is set to `true` by implementation
- [`readable-stream`](https://github.com/nodejs/readable-stream): >= 3.5.0 if `autoDestroy` is set to `true` by implementation
- [`streamx`](https://github.com/mafintosh/streamx): always
- [`minipass`](https://github.com/isaacs/minipass): not out of the box, an implementation can choose to emit close.

## Install

With [npm](https://npmjs.org) do:

```
npm install on-stream-close
```

## License

[MIT](LICENSE.md) © 2020-present Vincent Weevers
