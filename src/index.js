const cloneObject = (obj) => {
  if (obj === null) {
    return null
  }
  if (
    obj instanceof Boolean ||
    obj instanceof Number ||
    obj instanceof String
  ) {
    return obj.valueOf()
  }
  if (typeof obj.toJSON === 'function') {
    return obj.toJSON()
  }
  if (obj instanceof Array) {
    return obj.map((i) => {
      return clone(i, true)
    })
  }

  return Object.keys(obj).reduce((carry, key) => {
    const value = clone(obj[key], true)
    if (value === null) {
      return carry
    }
    return {
      ...carry,
      [key]: value
    }
  }, {})
}

const clone = (value, child = false) => {
  switch (typeof value) {
    case 'boolean':
    case 'number':
    case 'string':
      return value
    case 'symbol':
    case 'function':
    case 'undefined':
      if (child) {
        return null
      }
      throw new TypeError(`${value} is not cloned`)
    case 'object':
      return cloneObject(value)
    default:
      return null
  }
}

export default clone
