# simple-clone

![badge](https://github.com/fiahfy/simple-clone/workflows/Node.js%20Package/badge.svg)

> Clone(deep copy) object more efficiently like JSON stringify and parse.

## Installation

```bash
npm install @fiahfy/simple-clone
```

## Usage

```js
import { clone } from '@fiahfy/simple-clone'

const obj = { foo: 'bar' }
const newObj = clone(obj)
console.log(newObj) // { foo: 'bar' }
console.log(newObj === obj) // false
```
