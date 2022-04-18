import { expect } from 'chai'
import { defineProperty, pick, omit } from '../src'

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
})
