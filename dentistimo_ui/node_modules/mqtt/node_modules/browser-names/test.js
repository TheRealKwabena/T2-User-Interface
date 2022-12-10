'use strict'

const test = require('tape')
const names = require('.')

test('names', function (t) {
  const expected = [
    'firefox',
    'mozilla firefox',
    'mozilla_firefox',
    'mozilla-firefox',
    'mozillafirefox',
    'ff'
  ]

  for (const name of expected) {
    t.same(names(name), expected)
    t.same(names(name.toUpperCase()), expected)
  }

  t.same(names('does not exist'), [])
  t.end()
})

test('common', function (t) {
  t.is(names.common('android_chrome'), 'and_chr')
  t.is(names.common('android_chrOme'), 'and_chr')
  t.is(names.common('ipad'), undefined)
  t.isNot(names.common.all(), names.common.all(), 'unique copy')
  t.same(names.common.all().sort(), [
    'and_chr',
    'android',
    'beaker',
    'brave',
    'chrome',
    'edge',
    'electron',
    'firefox',
    'ie',
    'ios_saf',
    'maxthon',
    'node',
    'opera',
    'opera_mini',
    'opera_mobile',
    'safari',
    'yandex'
  ])
  t.is(names.common('does not exist'), undefined)
  t.end()
})

test('title', function (t) {
  t.isNot(names.title.all(), names.title.all(), 'unique copy')
  t.is(names.title.all().length, names.common.all().length)
  t.is(names.title('iphone'), undefined)
  t.is(names.title('IOS SAFARI'), 'iOS Safari')
  t.is(names.title('and_chr'), 'Google Chrome for Android')
  t.is(names.title('does not exist'), undefined)
  t.end()
})

test('all', function (t) {
  t.ok(Array.isArray(names.all()))
  t.isNot(names.all(), names.all(), 'unique copy')
  t.end()
})
