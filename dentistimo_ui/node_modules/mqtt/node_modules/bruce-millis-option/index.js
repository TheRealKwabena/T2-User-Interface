'use strict'

const ms = require('bruce-millis')

module.exports = function (value, hint) {
  const n = ms(value)

  if (Number.isNaN(n)) {
    hint = hint || 'Argument'

    throw new TypeError(
      `${hint} must be a number in milliseconds or a string with unit (e.g. '5m')`
    )
  }

  return n
}
