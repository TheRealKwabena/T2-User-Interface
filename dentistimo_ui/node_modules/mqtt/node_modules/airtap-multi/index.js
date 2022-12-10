'use strict'

const Provider = require('browser-provider')
const parallel = require('run-parallel-settled')
const mergeDeep = require('merge-deep')
const debug = require('debug')('airtap-multi')
const runtimeRequire = rr()

const hasOwnProperty = Object.prototype.hasOwnProperty
const kMap = Symbol('kMap')
const kAliases = Symbol('kAliases')

module.exports = class MultiProvider extends Provider {
  constructor (options) {
    super(options)

    this[kMap] = new Map()
    this[kAliases] = this.options.aliases || {}
  }

  add (arg, options) {
    if (typeof arg === 'string') {
      const id = arg
      const Provider = runtimeRequire(this[kAliases][id] || id)

      this[kMap].set(id, new Provider(options || {}))
    } else if (typeof arg === 'function') {
      const Provider = arg
      const provider = new Provider(options || {})
      const id = provider.id

      // TODO: add .id to browser-provider interface?
      if (typeof id !== 'string' || id === '') {
        throw new TypeError('Provider must have a string id')
      }

      this[kMap].set(id, provider)
    } else if (Array.isArray(arg)) {
      for (const el of arg) {
        this.add(el, mergeDeep(options))
      }
    } else if (isObject(arg)) {
      const providers = arg

      for (const id in providers) {
        if (!hasOwnProperty.call(providers, id)) continue

        const opts = isObject(providers[id]) ? providers[id] : null
        const merged = mergeDeep(opts, options || {})

        this.add(id, merged)
      }
    } else {
      throw new TypeError('First argument must be a string, function, array or object')
    }
  }

  _manifests (callback) {
    const acc = []
    const tasks = Array.from(this[kMap]).map(([id, provider]) => next => {
      provider.manifests(function (err, manifests) {
        if (err) return next(err)

        acc.push(...manifests.map(function (manifest) {
          return { ...manifest, provider: id }
        }))

        next()
      })
    })

    parallel(tasks, 4, function (err) {
      if (err) return callback(err)
      debug('%o manifests', acc.length)
      callback(null, acc)
    })
  }

  _browser (manifest, target) {
    return this[kMap].get(manifest.provider).browser(manifest, target)
  }

  get (id) {
    return this[kMap].get(id)
  }

  [Symbol.iterator] () {
    return this[kMap][Symbol.iterator]()
  }

  keys () {
    return this[kMap].keys()
  }

  values () {
    return this[kMap].values()
  }
}

function isObject (o) {
  return typeof o === 'object' && o !== null
}

function rr () {
  // eslint-disable-next-line
  if (typeof __webpack_require__ === 'function') return __non_webpack_require__
  return require
}
