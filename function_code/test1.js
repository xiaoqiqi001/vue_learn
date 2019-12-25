let curry = require('lodash').curry

let match = curry(function(what, str) {
  return str.match(what)
})

console.log(match(/\s+/g)('123  456'))

let replace = curry(function(what, replace, str) {
  return str.replace(what, replace)
})

let noHell = replace(/[hel]/ig)

let toRe = noHell('*')

console.log(toRe('hello world'))

let cSplit = curry(function (splitStr, str) {
  str.split(splitStr)
})

let words = function(str) {
  return cSplit(' ', str)
}

let cMap = curry(function(f, arr) {
  arr.map(f)
})

let sMap = curry(function(f, str) {
  let result = []
  Array.prototype.forEach.call(str, function (item) { f(item) && result.push(item) })
  return result.join('')
})

let ssMap = sMap(x => x > 2)

console.log(ssMap('123456'))


