import { expect } from 'chai'
import { deepEqual, defineProperty, pick, omit, clone, mapValues, filterKeys } from '../src'
import assert from 'node:assert'

describe('Object Manipulations', () => {
  it('defineProperty', () => {
    const object = {}
    defineProperty(object, 'foo', 'bar')
    expect(object).to.have.property('foo', 'bar')
  })

  it('pick', () => {
    expect(pick({ a: 1, b: [2] }, ['b'])).to.deep.equal({ b: [2] })
  })

  it('omit', () => {
    expect(omit({ a: 1, b: [2] }, ['b'])).to.deep.equal({ a: 1 })
  })

  it('clone', () => {
    assert.deepStrictEqual(clone(1), 1)
    assert.deepStrictEqual(clone('foo'), 'foo')
    assert.deepStrictEqual(clone(/test/gi), /test/gi)
    assert.deepStrictEqual(clone([true, false]), [true, false])
    assert.deepStrictEqual(clone({ a: 1, b: [2] }), { a: 1, b: [2] })
    class A { b = 2 }
    assert.deepStrictEqual(clone(new A()), new A())
  })

  it('mapValues', () => {
    expect(mapValues({ a: 1, b: 2 }, v => v * 2)).to.deep.equal({ a: 2, b: 4 })
  })

  it('filterKeys', () => {
    expect(filterKeys({ a: 1, b: 2 }, k => k === 'a')).to.deep.equal({ a: 1 })
  })

  it('deepEqual', () => {
    expect(deepEqual({ a: 1, b: [2] }, { a: 1, b: [2] })).to.be.true
    expect(deepEqual({ a: 1, b: [2] }, { a: 1, b: [3] })).to.be.false

    // date
    expect(deepEqual(new Date(0), new Date(0))).to.be.true
    expect(deepEqual(new Date(0), new Date(1))).to.be.false

    // regexp
    expect(deepEqual(/a/, /a/)).to.be.true
    expect(deepEqual(/a/, /a/i)).to.be.false
    expect(deepEqual(/a/, /b/)).to.be.false
  })
})
