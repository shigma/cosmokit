import { describe, it, equal } from '../test_deps.ts'
import { defineProperty, pick, omit } from '../mod.ts'

describe('Object Manipulations', () => {
  it('defineProperty', () => {
    const object = {}
    defineProperty(object, 'foo', 'bar')
    equal(object, { foo: 'bar' })
  })

  it('pick', () => {
    equal(pick({ a: 1, b: [2] }, ['b']), { b: [2] })
  })

  it('omit', () => {
    equal(omit({ a: 1, b: [2] }, ['b']), { a: 1 })
  })
})
