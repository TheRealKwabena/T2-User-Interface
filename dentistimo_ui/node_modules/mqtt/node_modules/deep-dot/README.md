# deep-dot

Get a nested property of an object or primitive.

## examples

```js
var deep = require('deep-dot')

var obj = {
  a: {
    b: {
      'c.d': [6, '78']
    }
  }
}

// basic usage
console.log(deep(obj, 'a.b.c.d.0') === 6)
console.log(deep(obj, 'a.b.c.d.1.1') === 8)

// attach
obj.deep = deep

// non existent
console.log(obj.deep('x.y') == null)

// array path
console.log(obj.deep(['a', 'b']))

// cute side-effects
console.log(deep('window.location'))
console.log(deep(['a','b','c'], [2]) === 'c')
```

## install

With [npm](https://npmjs.org) do:

```
npm install deep-dot
```

## license

MIT
