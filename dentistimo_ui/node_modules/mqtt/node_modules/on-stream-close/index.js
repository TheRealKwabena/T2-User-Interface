'use strict'

const { fromCallback } = require('catering')

function osc (stream, callback) {
  let error

  stream.on('error', onerror)
  stream.on('close', onclose)

  return detach

  function onerror (err) {
    error = err
  }

  function onclose () {
    detach()
    callback(error)
  }

  function detach () {
    stream.removeListener('error', onerror)
    stream.removeListener('close', onclose)
  }
}

osc.promises = function (stream) {
  const callback = fromCallback()
  callback.promise.detach = osc(stream, callback)
  return callback.promise
}

module.exports = osc
