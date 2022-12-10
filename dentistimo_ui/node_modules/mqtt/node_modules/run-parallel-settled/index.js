'use strict'

const combine = require('maybe-combine-errors')

module.exports = function parallel (tasks, limit, callback) {
  if (typeof limit === 'function') {
    return parallel(tasks, Infinity, limit)
  }

  if (typeof limit !== 'number' || limit < 1) {
    throw new TypeError('The "limit" argument must be a number >= 1')
  }

  const length = tasks.length
  const results = new Array(length)

  if (length === 0) return process.nextTick(callback, null, results)
  if (limit > length) limit = length

  let pending = length
  let position = limit
  let errors = null
  let sync = true

  for (let i = 0; i < limit; i++) {
    tasks[i](next.bind(null, i))
  }

  sync = false

  function next (i, err, result) {
    if (err) {
      if (errors === null) {
        errors = new Array(length)
        pending -= length - position
      }

      errors[i] = err
    } else if (errors === null) {
      results[i] = result
    }

    if (--pending === 0) {
      done()
    } else if (errors === null && position < length) {
      const i = position++
      tasks[i](next.bind(null, i))
    }
  }

  function done () {
    if (sync) return process.nextTick(done)
    if (errors !== null) return callback(combine(errors))

    callback(null, results)
  }
}
