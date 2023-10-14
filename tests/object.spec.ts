import { expect } from 'chai'
import { defineProperty, pick, omit, clone, mapValues, filterKeys } from '../src'

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
    expect(clone({ a: 1, b: [2] })).to.deep.equal({ a: 1, b: [2] })
  })

  it('mapValues', () => {
    expect(mapValues({ a: 1, b: 2 }, v => v * 2)).to.deep.equal({ a: 2, b: 4 })
  })

  it('filterKeys', () => {
    expect(filterKeys({ a: 1, b: 2 }, k => k === 'a')).to.deep.equal({ a: 1 })
  })
})
