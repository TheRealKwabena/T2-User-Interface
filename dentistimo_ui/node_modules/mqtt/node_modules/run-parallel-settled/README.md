# run-parallel-settled

**Run an array of functions in parallel, wait to finish when one errors.** Similar to [`run-parallel`](https://github.com/feross/run-parallel) and [`run-parallel-limit`](https://github.com/feross/run-parallel-limit) which return as soon as the first function errors, while this waits for functions that already started. Useful to ensure that once the final callback is called, any resources created by the functions have been cleaned up.

[![npm status](http://img.shields.io/npm/v/run-parallel-settled.svg)](https://www.npmjs.org/package/run-parallel-settled)
[![node](https://img.shields.io/node/v/run-parallel-settled.svg)](https://www.npmjs.org/package/run-parallel-settled)
[![Travis build status](https://img.shields.io/travis/com/vweevers/run-parallel-settled.svg?label=travis)](http://travis-ci.com/vweevers/run-parallel-settled)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

```js
const parallel = require('run-parallel-settled')

const tasks = [
  function one (next) {
    next(new Error('failed'))
  },
  function two (next) {
    setTimeout(function () {
      console.log('wait for me')
      next(null, 123)
    }, 1e3)
  },
  function three (next) {
    next(new Error('also failed'))
  }
]

parallel(tasks, 3, function (err, results) {
  if (err) throw err
})
```

This will wait for function two, then throw a [combined error](https://github.com/vweevers/maybe-combine-errors) from one and three:

```
$ node example.js
wait for me
/examples/example.js:19
  if (err) throw err
           ^

Error: failed
    at Array.one (/examples/example.js:5:10)
    at parallel (/examples/node_modules/run-parallel-settled/index.js:27:13)
    at ..

Error: also failed
    at Array.three (/examples/example.js:14:10)
    at parallel (/examples/node_modules/run-parallel-settled/index.js:27:13)
    at ..
```

## API

### `parallel(tasks[, limit], callback)`

Run the functions in the `tasks` array, with a maximum of `limit` functions executing in parallel. The `limit` argument defaults to `Infinity` i.e. no limit. The `callback` function with signature `callback(err, results)` will be called once all functions have finished without error, or once one of them errors and all functions that were started have finished.

## Install

With [npm](https://npmjs.org) do:

```
npm install run-parallel-settled
```

## License

[MIT](LICENSE.md) © 2020-present Vincent Weevers
