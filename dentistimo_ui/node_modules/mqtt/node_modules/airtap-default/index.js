'use strict'

const open = require('open')
const Provider = require('browser-provider')
const Browser = require('abstract-browser')

class DefaultProvider extends Provider.promises {
  async _manifests () {
    return [{
      name: 'default',
      title: 'Default browser',
      supports: {
        selfclosing: true
      }
    }]
  }

  _browser (manifest, target) {
    return new DefaultBrowser(manifest, target)
  }
}

class DefaultBrowser extends Browser.promises {
  async _open () {
    return open(this.target.url, { url: true })
  }
}

module.exports = DefaultProvider
