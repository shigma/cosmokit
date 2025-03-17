import { capitalize, camelCase, formatProperty, paramCase, snakeCase, uncapitalize, sanitize } from '../src'
import { expect } from 'chai'

describe('String Manipulations', () => {
  it('capitalize', () => {
    expect(capitalize('aa-aa_aA')).to.equal('Aa-aa_aA')
  })

  it('uncapitalize', () => {
    expect(uncapitalize('Aa-aa_aA')).to.equal('aa-aa_aA')
  })

  it('camelCase', () => {
    expect(camelCase('aa-aa_aA')).to.equal('aaAaAA')
  })

  it('paramCase', () => {
    expect(paramCase('aa-aa_aAA')).to.equal('aa-aa-a-aa')
  })

  it('snakeCase', () => {
    expect(snakeCase('aa-aa_aAA')).to.equal('aa_aa_a_aa')
  })

  it('formatProperty', () => {
    expect(formatProperty(100)).to.equal('[100]')
    expect(formatProperty(Symbol('foo'))).to.equal('[Symbol(foo)]')
    expect(formatProperty('foo')).to.equal('.foo')
    expect(formatProperty('foo-bar')).to.equal('["foo-bar"]')
  })

  it('sanitize', () => {
    expect(sanitize('aa/bb/cc/')).to.equal('/aa/bb/cc')
  })
})
