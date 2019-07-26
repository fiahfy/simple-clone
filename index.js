const clone = require('./dist/index')

const obj = { foo: 'bar' }
const newObj = clone(obj)
console.log(newObj) // {foo: "bar"}
console.log(newObj === obj) // false
