/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { clone } from '../src'

const be = (value: any) => {
  expect(clone(value)).toBe(JSON.parse(JSON.stringify(value)))
}

const notBe = (value: any) => {
  expect(clone(value)).not.toBe(JSON.parse(JSON.stringify(value)))
}

const equal = (value: any) => {
  expect(clone(value)).toEqual(JSON.parse(JSON.stringify(value)))
}

describe('clone primitive values', () => {
  test('clone boolean correctly', () => {
    be(true)
    be(false)
    be(new Boolean(true))
    be(new Boolean(false))
  })

  test('clone integer correctly', () => {
    be(0)
    be(1)
    be(new Number(0))
    be(new Number(1))
  })

  test('clone string correctly', () => {
    be('')
    be('foo')
    be(new String(''))
    be(new String('foo'))
  })

  test('throw error if symbol is cloned', () => {
    expect(() => clone(Symbol('foo'))).toThrowError(TypeError)
  })

  test('throw error if function is cloned', () => {
    expect(() => clone(() => undefined)).toThrowError(TypeError)
  })

  test('throw error if undefined is cloned', () => {
    expect(() => clone(undefined)).toThrowError(TypeError)
  })

  test('clone null correctly', () => {
    be(null)
  })
})

describe('clone complex values', () => {
  test('create date string from date object correctly', () => {
    be(new Date(2006, 0, 2, 15, 4, 5))
  })

  test('create url string from url object correctly', () => {
    be(new URL('https://github.com/fiahfy/simple-clone'))
  })

  test('create empty object from promise', () => {
    equal(new Promise(() => undefined))
  })

  test('create object from custom class correctly', () => {
    class MyClass1 {}
    equal(new MyClass1())

    class MyClass2 {
      foo: string
      constructor() {
        this.foo = 'bar'
      }
    }
    equal(new MyClass2())
  })

  test('clone array correctly', () => {
    equal([])
    equal([1, 'false', false])
    equal([new Number(3), new String('false'), new Boolean(false)])
  })

  test('clone object correctly', () => {
    equal({})
    equal({ x: 5 })
    equal({ x: 5, y: 6 })
    equal({ x: [10, undefined, () => undefined, Symbol('')] })
    equal({ x: undefined, y: Object, z: Symbol('') })
    equal({ [Symbol('foo')]: 'foo' })
    equal({ [Symbol.for('foo')]: 'foo' })
    equal(
      Object.create(null, {
        x: { value: 'x', enumerable: false },
        y: { value: 'y', enumerable: true },
      })
    )
    equal({ foo: { bar: { baz: true } } })
  })

  test('cloned object is not reference equal', () => {
    notBe([1, 2, 3])
    notBe({ foo: 'bar' })
  })
})
