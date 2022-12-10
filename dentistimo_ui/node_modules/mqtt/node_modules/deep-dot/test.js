var test = require('tape')
  , deep = require('./')

test('on proto', function(t){
  function Item(bar) {
    this.foo.x.bar = bar
  }

  Item.prototype.deep = deep
  Item.prototype.foo = {x: {}}

  var item = new Item(40)
  t.deepEqual(item.deep('foo'), {x: {bar: 40}})
  t.equal(item.deep('foo.x.bar'), 40)
  t.equal(deep(item, 'foo.x.bar'), 40)
  t.end()
})

test('undefined value', function(t){
  var o = { a: {b: 10} }
  t.notOk(deep(o, 'a.b.c'))
  t.ok(deep(o, 'a.b'))
  t.end()
})

test('invalid prop throws', function(t){
  t.throws(deep)
  t.throws(function(){ deep({})})
  global_hm = 'woa'
  t.throws(function(){ deep('global_hm', undefined)})
  t.end()
})

test('array path', function(t){
  var o = { a: {b: 10} }
  t.notOk(deep(o, ['a', 'b', 'c']))
  t.ok(deep(o, ['a', 'b']))

  var path = ['a', 'b', 'c']
  deep(o, path)
  t.deepEqual(path, ['a', 'b', 'c'], 'does not mutate')
  t.end()
})

test('prop with dots in name', function(t){
  var o = { a: { 'b.c.d': 1, b: { 'd.e': 2} }}
  t.equal(deep(o, 'a.b.c.d'), 1)
  t.equal(deep(o, 'a.b.d.e'), 2)
  t.end()
})

test('weird stuff', function(t){
  var o = {s: 's', a: [20, 30]}
  t.equal(deep(o, ['s', 0]), 's')
  t.equal(deep(o, 's.0'), 's')
  t.equal(deep(o, 'a.1'), 30)
  t.equal(deep([1,2,3], [2]), 3)
  t.end()
})

test('global', function(t){
  window = { location: { hash: '#top' }}
  t.equal(deep('window.location.hash'), '#top')
  t.end()
})
