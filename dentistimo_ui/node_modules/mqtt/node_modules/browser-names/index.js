'use strict'

const data = new Map([
  ['Google Chrome for Android', [
    'and_chr', // browserslist
    'chrome android', // browserslist (no space)
    'chrome for android',
    'google chrome for android',
    'android chrome'
  ]],
  ['Android Browser', [
    'android', // airtap/zuul, browserslist, testling
    'android browser', // airtap >= 4, testling (param-case)
    'aosp'
  ]],
  ['iOS Safari', [
    'ios_saf', // browserslist
    'ios safari'

    // Exclude these because they can be tied to a particular device simulator.
    // 'iphone', // airtap/zuul, testling, sauce labs
    // 'ipad' // airtap/zuul, testling, sauce labs
  ]],
  ['Microsoft Edge', [
    'edge', // browserslist, karma
    'msedge', // win-detect-browsers, @httptoolkit/browser-launcher
    'microsoft edge' // airtap, sauce labs (no space)
  ]],
  ['Internet Explorer', [
    'ie', // browserslist, karma, win-detect-browsers, @httptoolkit/browser-launcher, testling
    'msie',
    'internet explorer', // airtap/zuul, sauce labs
    'iexplore', // airtap/zuul, testling
    'iexplorer', // testling
    'explorer', // testling
    'explore' // testling
  ]],
  ['Google Chrome', [
    'chrome', // *
    'google chrome'
  ]],
  ['Mozilla Firefox', [
    'firefox', // *
    'mozilla firefox',
    'ff' // testling
  ]],
  ['Beaker', [
    'beaker'
  ]],
  ['Opera', [
    'opera'
  ]],
  ['Opera Mini', [
    'opera_mini',
    'opera mini', // browserslist (no space)
    'op_mini' // browserslist
  ]],
  ['Opera Mobile', [
    'opera_mobile',
    'opera mobile', // browserslist (no space)
    'op_mob' // browserslist
  ]],
  ['Brave', [
    'brave'
  ]],
  ['Maxthon', [
    'maxthon'
  ]],
  ['Yandex', [
    'yandex'
  ]],
  ['Safari', [
    'safari'
  ]],
  ['Electron', [
    'electron'
  ]],
  ['Node.js', [
    'node', // browserslist
    'nodejs',
    'node.js'
  ]]
])

const index = new Map()

for (const [title, names] of data) {
  for (let i = 0; i < names.length; i++) {
    const name = names[i]
    const snake = name.replace(/ /g, '_')
    const param = name.replace(/ /g, '-')
    const none = name.replace(/ /g, '')

    for (const alt of [snake, param, none]) {
      if (!names.includes(alt)) names.splice(1 + i++, 0, alt)
    }
  }

  for (const name of names) {
    if (index.has(name)) throw new Error('Names are not distinct')
    index.set(name, title)
  }
}

function names (name) {
  const title = index.get(name.toLowerCase())
  return title ? data.get(title) : []
}

function title (name) {
  return index.get(name.toLowerCase())
}

function common (name) {
  return names(name)[0]
}

module.exports = names

names.all = () => Array.from(index.keys())
names.title = title
names.title.all = () => Array.from(data.keys())
names.common = common
names.common.all = () => names.title.all().map(title => data.get(title)[0])
