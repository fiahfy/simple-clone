# @fiahfy/simple-clone

> Clone(deep copy) object more efficiently like JSON stringify and parse.

## Installation
```
npm install @fiahfy/simple-clone
```

## Usage
```js
import clone from '@fiahfy/simple-clone'

const obj = { foo: 'bar' }
const newObj = clone(obj)
console.log(obj === newObj) // false
```
